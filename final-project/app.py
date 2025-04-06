from flask import Flask, jsonify, request, render_template, redirect, url_for, session
import json
from datetime import datetime
import random

app = Flask(__name__)
app.secret_key = "secretkey"

def open_file(address):
    with open(address, "r") as infile:
        return json.load(infile)

def save_file(address, update):
    with open(address, "w") as outfile:
        json.dump(update, outfile, indent=4)
        
@app.route('/update-session')
def update_session():
    users = open_file("static/json/users.json")
    session["user"] = { key: value for key, value in users[session["user"]["user_name"]].items()}
    return redirect(url_for("home_page"))

@app.route("/set-theme/<theme>", methods=["GET", "POST"])
def set_theme(theme):
    session["theme"] = theme
    print('color set to', theme)
    return jsonify({"theme": 'color is now set to' + theme})

@app.route("/get-theme")
def get_theme():
    if session.get("theme"):
        return jsonify({"theme": session["theme"]})
    return jsonify({"theme": "dark"})


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("home_page"))

@app.route("/")
@app.route("/home")
def home_page():
    return render_template("Base.html", name="Home")

@app.route("/about")
def about_page():
    return render_template("Base.html", name="About")

@app.route("/contact")
def contact_page():
    return render_template("Base.html", name="Contact")

@app.route("/contact/submit", methods=["POST"])
def contact_submit():
    if not session.get("logged-in"):
        return jsonify({"message": "not-logged"})
    messages = open_file("static/json/messages.json")
    data = request.get_json()
    messages.append({
        "subject": data.get("subject"),
        "message": data.get("message"),
        "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })
    save_file("static/json/messages.json", messages)
    return jsonify({"message": "Message Sent!"})

@app.route("/shop/<topic>")
def shop(topic):
    return render_template("Base.html", name="Shop")

@app.route("/shop/purchase/<chosen_course>", methods=["POST"])
def courses_specific(chosen_course):
    if not session.get("logged-in"):
        return jsonify({"success": False, "message": "Login First"})
    else:
        topics = open_file("static/json/topics.json")
        for topic, topicDetails in topics.items():
            for course in topicDetails['courses']:
                if course['title'] == chosen_course:
                    chosen_course_topic = topic
                    chosen_course_price = int(course['price'])
                    chosen_course_prerequisites = course['prerequisites']
                    break
        users_finished_courses = [course['course'] for course in session['user']['courses'] if course['status'] == 'finished']
        users_in_progress_courses = [course['course'] for course in session['user']['courses'] if course['status'] == 'in-progress']    
        
        if session['user']['status'] != 'Student':
            return jsonify({"success": False, "message": "You are not a student"})
        elif chosen_course in users_finished_courses:
            return jsonify({"success": False, "message": "You've already finished this course"})
        elif chosen_course in users_in_progress_courses:
            return jsonify({"success": False, "message": "You've already started this course"})
        elif not all(prerequisite in users_finished_courses for prerequisite in chosen_course_prerequisites):
            return jsonify({"success": False, "message": "First Complete Prerequisites"})
        elif session['user']['wallet'] < chosen_course_price:
            return jsonify({"success": False, "message": "Not Enough Money"})
        else:
            users = open_file("static/json/users.json")
            username = session['user']['user_name']
            users[username]['courses'].append({
                "topic": chosen_course_topic,
                "course": chosen_course,
                "status": "in-progress",
                "score": 0
            })
            users[username]['wallet'] -= chosen_course_price
            
            save_file("static/json/users.json", users)
            update_session()
            transactions = open_file("static/json/transactions.json")
            transactions.append({
                "username": username,
                "action": "spend",
                "course": chosen_course,
                "amount": chosen_course_price,
                "time": datetime.now().strftime("%Y-%m-%d %H:%M")
            })
            save_file("static/json/transactions.json", transactions)
            return jsonify({"success": True, "message": "Course Purchased"})

@app.route("/authorization", methods=["GET"])
def authorization_page():
    return render_template("Base.html", name="Authorization")

@app.route("/authorization/<status>", methods=["POST"])
def authorization_api(status):
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    users = open_file("static/json/users.json")

    if status == "login":
        if username in users and users[username]["password"] == password:
            session["logged-in"] = True
            session["user"] = users[username].copy()
            success, message, action = True, "Login Successful!", 'Proceed'
        else:
            success, message, action = False, "Wrong Info!", "Retry"

    elif status == "register":
        if username not in users:
            users[username] = {
                "user_name": username,
                "first_name": "",
                "last_name": "",
                "password": password,
                "age": "",
                "city": "",
                "status": "Student",
                "wallet": 0,
                "courses": [],
            }
            session["logged-in"] = True
            session["user"] = users[username].copy()
            success, message, action = True, "Registration Successful!", 'Proceed'
        else:
            success, message, action = False, "Username already taken!", "Retry"

    save_file("static/json/users.json", users)
    return jsonify({"success": success, "message": message, "action": action})

@app.route("/update-user-info", methods=["POST"])
def update_user():
    users = open_file("static/json/users.json")
    username = session["user"]["user_name"]
    users[username]["first_name"] = request.form.get("first-name")
    users[username]["last_name"] = request.form.get("last-name")
    users[username]["password"] = request.form.get("password")
    users[username]["age"] = request.form.get("age")
    users[username]["city"] = request.form.get("city")
    save_file("static/json/users.json", users)
    update_session()
    return jsonify({"success": True})

@app.route("/get/<name>")
def get(name):
    if name == 'session':
        if session.get('logged-in'):
            return jsonify({"detail": session["user"]})
        return jsonify({"detail": 'none'})
    
    file = open_file(f"static/json/{name}.json")
    return jsonify({name: file})

@app.route("/course/<course>")
def course_page(course):
    return render_template("Base.html", name="Course")

@app.route("/get/course/<course_name>")
def get_course_details(course_name):
    if not session.get("logged-in"):
        return jsonify({'success': False, 'message': "You need to first Login!"})
    
    if course_name == 'none':
        return jsonify({'success': False, 'message': 'select a course from the Profile Panel!'})

    topics = open_file("static/json/topics.json")
    url_course = course_name.replace("&", " ")
    
    for topicDetails in topics.values():
        for course in topicDetails['courses']:
            if course["title"] == url_course:
                return jsonify({'success': True, 'message': course})
                
                # success = True
                # message = course
                # break
    # return jsonify({'success': success, 'message': message})
            

@app.route("/exam/<exam>")
def exam_page(exam):
    return render_template("Base.html", name="Exam")

@app.route("/get/exam/<exam_name>")
def get_exam_details(exam_name):
    url_exam = exam_name.replace('&', ' ')
    tests = open_file('static/json/tests.json')
    for i, j in tests.items():

        if i == url_exam:
            random_tests = random.sample(j, 5)
            return jsonify({"tests": random_tests})

@app.route("/profile/<profile_div>")
def load_profile(profile_div):
    if not session.get("logged-in"):
        return redirect(url_for("authorization_page"))
    return render_template("Base.html", name="Profile")


@app.route("/update/<action>/<json_file>", methods=["POST"])
def update_json(action, json_file):
    
    if action == 'add' and json_file == 'topics':
        file = open_file(f"static/json/{json_file}.json")
        topic_name = request.form.get("topicName")
        img_url = request.form.get("urlAddress")
        file[topic_name] = {
            "img": f"/static/img/{img_url}",
            "courses": []
        }
        save_file(f"static/json/{json_file}.json", file)
        return jsonify({"success": True})
    
    elif action == 'remove' and json_file == 'topics':
        file = open_file(f"static/json/{json_file}.json")
        data = request.get_json()
        topic_name = data.get("topicName")
        del file[topic_name]
        save_file(f"static/json/{json_file}.json", file)
        return jsonify({"success": True})
    
    elif action == 'remove' and json_file == 'users':
        file = open_file(f"static/json/{json_file}.json")
        data = request.get_json()
        username = data.get("username")
        del file[username]
        save_file(f"static/json/{json_file}.json", file)
        return jsonify({"success": True})
    
    elif action == 'remove' and json_file == 'course':
        data = request.get_json()
        course_title = data.get("course")
        file2 = open_file("static/json/users.json")
        for i, j in file2.items():
            if i == session['user']['user_name']:
                for i in range(len(j['courses_created'])):
                    if j['courses_created'][i] == course_title:
                        j['courses_created'].pop(i)
                        break
        save_file("static/json/users.json", file2)
        update_session()
        return jsonify({"success": True})
    
    elif action == 'add' and json_file == 'course':
        file = open_file(f"static/json/users.json")
        data = request.get_json()
        course_title = data.get("course")

        for i, j in file.items():
            if i == session['user']['user_name']:
                j['courses_created'].append(course_title)
                update_session()
                break
        save_file(f"static/json/users.json", file)
        update_session()
        return jsonify({"success": True})

    elif action == 'add' and json_file == 'transactions':
        file = open_file(f"static/json/{json_file}.json")
        data = request.get_json()
        amount = data.get("amount")
        transaction = {
            "username": session['user']['user_name'],
            "action": "charge",
            "course": "",
            "amount": int(amount),
            "time": datetime.now().strftime("%m-%d %H:%M")
        }
        file.append(transaction)
        save_file(f"static/json/{json_file}.json", file)
        update_session()
        return jsonify({"success": True})
    
    elif action == 'add' and json_file == 'exam':
        data = request.get_json()
        score = data.get("score")
        exam_name = data.get("exam_name")
        
        file = open_file(f"static/json/users.json")
        
        user_courses = file[session['user']['user_name']]['courses']
        for course in user_courses:
            if course['course'] == exam_name:
                course['status'] = 'finished'
                course['score'] = int(score)
                
        # data = request.get_json()
        # exam_name = data.get("exam_name")
        # questions = data.get("questions")
        # file[exam_name] = questions
        save_file(f"static/json/users.json", file)
        update_session()
        return jsonify({"success": True})
    
# @app.route("/update/exam/<exam_name>/<score>")
# def update_exam(exam_name, score):
#     users = open_file('static/json/users.json')
#     user_courses = users[session['user']['user_name']]['courses']
#     for course in user_courses:
#         if course['course'] == exam_name:
#             course['status'] = 'finished'
#             course['score'] = int(score)
#     save_file('static/json/users.json', users)
#     update_session()
#     return jsonify({'message':'success'})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5075)
