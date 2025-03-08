from flask import Flask, jsonify, request, render_template, redirect, url_for, session
import json

app = Flask(__name__)
app.secret_key = 'secretkey'

def open_file(address):
    with open(address, 'r') as infile:
        return json.load(infile)

def save_file(address, update):
    with open(address, 'w') as outfile:
        json.dump(update, outfile, indent=4)

@app.route("/")
def home():
    if not session.get("logged-in"):
        return redirect(url_for("auth_page"))
    return render_template("base.html", name = 'Homepage')

@app.route("/contact")
def contact():
    if not session.get("logged-in"):
        return redirect(url_for("auth_page"))
    return render_template("base.html", name = 'Contact')

def update_session():
    users = open_file('static/json/users.json')
    session['user'] = { key: value for key, value in users[session['username']].items()}


@app.route("/contact/submit", methods=["POST"])
def contact_submit():
    data = request.get_json()
    
    name = data.get('name')
    email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')
    time = data.get('datatime')
    print(time)
    opinions = open_file('static/json/opinions.json')
    user_opinion = {
        "fullname": name,
        "email": email,
        "subject": subject,
        "message": message,
        "time": time
    }
    
    opinions['for-admins'].append(user_opinion)
    save_file('static/json/opinions.json', opinions)
    return jsonify({'message': 'Message Sent!'})

@app.route("/courses/<categories>")
def courses(categories):
    if not session.get("logged-in"):
        return redirect(url_for("auth_page"))
    return render_template("base.html", name = 'Courses')

@app.route("/api/courses")
def get_courses():
    data = open_file('static/json/topics.json')
    return jsonify(data)

@app.route("/purchase", methods=["GET", "POST"])
def courses_specific():
    if not session.get("logged-in"):
        return redirect(url_for("auth_page"))
    
    topics = open_file('static/json/topics.json')
    users = open_file('static/json/users.json')

    data = request.get_json()
    selected_topic = data.get('topic')
    selected_course = data.get('course')
    price = int(data.get('price'))
    
    dependencies = topics[selected_topic][selected_course]['prerequisites']
    success = False
    if session['user']['status'] != 'student':
        message = 'You are not a student'
    elif session['user']['wallet'] < price:
        message = 'Not Enough Money'
    elif selected_course in [course[0] for course in session['user']['courses-finished']]:
        message = "You've already finished this course"
    elif selected_course in [course[0] for course in session['user']['courses-in-progress']]:
        message = "You've already started this course"
        success = True
    elif not all(prerequisite in session['user']['courses-finished'] for prerequisite in dependencies):
        message = 'First Complete Prerequisites'
    else:
        message = 'Course Purchased'
        success = True
        
        users[session['username']]['courses-in-progress'].append([selected_course, 0])
        users[session['username']]['wallet'] -= price
        update_session()
        save_file('static/json/users.json', users)        
    return jsonify({'message': message, 'success': success})












@app.route("/authorization", methods=["GET"])
def auth_page():
    return render_template("base.html", name = 'Authorization')

@app.route("/authorization/<status>", methods=["GET", "POST"])
def handle_auth(status):
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    users = open_file('static/json/users.json')

    if status == 'login':
        if username in users and users[username]['password'] == password:
            session['logged-in'] = True
            session['username'] = username
            session['user'] = { key: value for key, value in users[username].items()}
            success = True
            message = 'Login Successful!'
        else:
            success = False
            message = 'Wrong Info!'
    else:
        if username in users:
            message = "Username already taken!"
        else:
            users[username] = {
                "first-name": "",
                "last-name": "",
                "password": password,
                "age": "",
                "city": "",
                "status": "student",
                "courses-finished": [],
                "courses-in-progress": []
            }
            session['logged-in'] = True
            session['username'] = username
            session['user'] = { key: value for key, value in users[username].items()}
            success = True
            message = 'Registration Successful!'
    save_file('static/json/users.json', users)
    return jsonify({'success': success, 'message': message})

@app.route("/logout")
def logout():
	session.clear()
	return redirect(url_for("home"))



if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0', port=5075)
 

