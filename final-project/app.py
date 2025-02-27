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

@app.route("/")
def home():
    if "username" not in session:
        return redirect(url_for("auth_page"))
    return render_template("home.html")

@app.route("/auth", methods=["GET"])
def auth_page():
    return render_template("auth.html")

@app.route("/auth/<status>", methods=["GET", "POST"])
def handle_auf(status):
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if status == 'login':
        if username in users and users[username]['password'] == password:
            session['username'] = username
            session['status'] = users[username]['status']
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
    else:
        if username in users:            
            response = {
                'success': False,
                'message': 'Name already exits!'
            }
        else:
            users[username] = {
                'password': password,
                'status': 'student'
            }
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
 

