from flask import Flask, jsonify, request, render_template, redirect, url_for, session
import json
from datetime import datetime

app = Flask(__name__)
app.secret_key = "secretkey"

def open_file(address):
    with open(address, "r") as infile:
        return json.load(infile)

def save_file(address, update):
    with open(address, "w") as outfile:
        json.dump(update, outfile, indent=4)

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("home_page"))

@app.route("/")
@app.route("/home")
def home_page():
    return render_template("Base.html", name="Home")

@app.route("/contact")
def contact_page():
    return render_template("Base.html", name="Contact")

@app.route("/about")
def about_page():
    return render_template("Base.html", name="About")

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

@app.route("/profile")
def load_profile():
    if not session.get("logged-in"):
        return redirect(url_for("authorization_page"))
    return render_template("Base.html", name="Profile")

@app.route("/shop")
def shop():
    return render_template("Base.html", name="Shop")

@app.route("/shop/<chosen_course>", methods=["POST"])
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
            success, message = True, "Login Successful!"
        else:
            success, message = False, "Wrong Info!"

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
            success, message = True, "Registration Successful!"
        else:
            success, message = False, "Username already taken!"

    save_file("static/json/users.json", users)
    return jsonify({"success": success, "message": message})



@app.route("/update")
def update_session():
    users = open_file("static/json/users.json")
    session["user"] = {
        key: value for key, value in users[session["user"]["user_name"]].items()
    }
    return redirect(url_for("home_page"))

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
    else:
        file = open_file(f"static/json/{name}.json")
        return jsonify({name: file})

@app.route("/delete-user/<user>", methods=['GET','POST'])
def delete_user(user):
    if session['user']['status'] == 'Admin':
        users = open_file("static/json/users.json")
        del users[user]
        save_file('static/json/users.json', users)
        return jsonify({ 'success': True})
        
@app.route("/charge-wallet/<amount>", methods=["GET","POST"])
def charge_wallet(amount):
    transactions = open_file("static/json/transactions.json")
    new_transaction = {
        "username": session['user']['user_name'],
        "action": "charge",
        "course": "",
        "amount": int(amount),
        "time": datetime.now().strftime("%Y-%m-%d %H:%M")
    }
    transactions.append(new_transaction)
    save_file("static/json/transactions.json", transactions)
    
    users = open_file("static/json/users.json")
    users[session['user']['user_name']]["wallet"] += int(amount)
    save_file("static/json/users.json", users)
    
    update_session()    
    return jsonify({"success": True,"final_wallet": session['user']['wallet'], "new_transaction": new_transaction})
    
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5075)
