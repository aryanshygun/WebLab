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

users = open_file('static/json/users.json')
topics = open_file('static/json/topics.json')

@app.route("/")
def home():
    if "username" not in session:
        return redirect(url_for("auth_page"))
    return render_template("base.html", name = 'Homepage')

@app.route("/contact")
def contact():
    if "username" not in session:
        return redirect(url_for("auth_page"))
    return render_template("base.html", name = 'Contact')


@app.route("/courses")
def courses():
    if "username" not in session:
        return redirect(url_for("auth_page"))
    return render_template("base.html", name = 'Courses')


@app.route("/courses/<activity>", methods=["GET", "POST"])
def courses_specific(activity):
    if "username" not in session:
        return redirect(url_for("auth_page"))

    if activity == 'purchase':
        data = request.json
        selected_topic = data.get('topic')
        selected_course = data.get('course')
        
        dependencies = topics[selected_topic][selected_course]['prerequisites']
        
        print('test', type(users[session['username']]['wallet']))
        print(type(session['wallet']))
        
        if session['status'] != 'student':
            message = 'You are not a student'
        elif int(session['wallet']) < 100:
            message = 'Not Enough Money'
        elif not all(prerequisite in session['courses'] for prerequisite in dependencies):
            message = 'First Complete Prerequisites'
        else:
            message = 'Course Purchased'
            users[session['username']]['courses'].append(selected_course)
            users[session['username']]['wallet'] -= 100
            save_file('static/json/users.json', users)
            update_session()
        
        return jsonify({'message': message})


def update_session():
    users = open_file('static/json/users.json')
    session['courses'] = users[session['username']]['courses']
    session['wallet'] = users[session['username']]['wallet']

@app.route("/auth", methods=["GET"])
def auth_page():
    return render_template("base.html", name = 'Authorization')

@app.route("/auth/<status>", methods=["GET", "POST"])
def handle_auf(status):
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if status == 'login':
        if username in users and users[username]['password'] == password:
            session['username'] = username
            session['status'] = users[username]['status']
            session['courses'] = users[username]['courses']
            session['wallet'] = users[username]['wallet']
            response = {
                'success': True,
                'status': session['status'],
                'message': 'Login successful!'
            }
        else:            
            response = {
                'success': False,
                'message': 'Try again!'
            }
    elif status == 'register':
        if username in users:            
            response = {
                'success': False,
                'message': 'Name already exits!'
            }
        else:
            users[username] = {
                "first-name": "",
                "last-name": "",
                "password": password,
                "age": "",
                "city": "rasht",
                "status": "student"
            }
            save_file('static/json/users.json', users)
            session['username'] = username
            session['status'] = users[username]['status']
            response = {
                'success': True,
                'status': session['status'],
                'message': 'Registration successful!'
            }
    return jsonify(response)

@app.route("/logout")
def logout():
	session.clear()
	return redirect(url_for("home"))



if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0', port=5075)
 

