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

@app.route("/logout")
def logout():
	session.clear()
	return redirect(url_for("home"))

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

@app.route("/contact/submit", methods=["POST"])
def contact_submit():
    data = request.get_json()
    
    name = data.get('name')
    email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')
    time = data.get('datatime')
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

    selected_categories = categories.split("&")
    # Load the topics data from the JSON file
    topics_data = open_file('static/json/topics.json')
    
    # If 'all' is selected, we don't filter anything, otherwise we filter based on selected categories
    if "all" in selected_categories:
        filtered_topics = topics_data  # Include all topics if "all" is selected
    else:
        selected_categories = [i.title() for i in selected_categories]

        # Filter the topics based on selected categories
        filtered_topics = {category: topics_data.get(category, {}) for category in selected_categories if category in topics_data}


    session['filtered-topics'] = filtered_topics

    # Render the base.html template and pass the 'Courses' name to dynamically load the page
    return render_template("base.html", name='Courses')

@app.route('/get-filtered-topics')
def get_filtered_topics():
    return jsonify({"filtered_topics": session['filtered-topics']})

@app.route("/study/<course>")
def study_topic(course):
    session['current_course'] = course
    return render_template("base.html", name='Study')

@app.route("/get-current-course")
def get_course():
    return jsonify({'current_course': session['current_course']})

# @app.route("/profile/test")
# def study_course():
#     if not session.get("logged-in"):
#         return redirect(url_for("auth_page"))

#     return render_template("base.html", name="profile")

# @app.route("/profile/test/yu")
# def study_coursed():
#     if not session.get("logged-in"):
#         return redirect(url_for("auth_page"))

#     return render_template("base.html", name="profile")


# @app.route('/<word1>/<word2>')
# def render_sentencef(word1, word2):
#     # Join the words into a sentence
#     sentence = f'{word1} {word2}'
    
#     # Render the HTML page with the sentence
#     return sentence

# @app.route('/<word1>/<word2>/<word3>')
# def render_sentencey(word1, word2, word3):
#     # Join the words into a sentence
#     sentence = f'{word1} {word2} {word3}'
    
#     # Render the HTML page with the sentence
#     return sentence

# @app.route('/<word1>/<word2>/<word3>/<word4>')
# def render_sentenceg(word1, word2, word3, word4):
#     # Join the words into a sentence
#     sentence = f'{word1} {word2} {word3} {word4}'
    
#     # Render the HTML page with the sentence
#     return sentence


@app.route("/profile/")
@app.route("/profile/<section>")
def show_profile(section='personal-data'):
    if not session.get("logged-in"):
        return redirect(url_for("auth_page"))
    
    return render_template("base.html", name="Profile")

@app.route("/profile/study/<course>")
def study_course(course):
    if not session.get("logged-in"):
        return redirect(url_for("auth_page"))
    return render_template("base.html", name= "Course")
 

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
    
    user_data = session['user']
    user_courses_finished = [course[0] for course in user_data['courses_finished']]
    
    if user_data['status'] != 'student':
        message = 'You are not a student'
    elif selected_course in user_courses_finished:
        message = "You've already finished this course"
    elif selected_course in [course[0] for course in user_data['courses_in_progress']]:
        message = "You've already started this course"
        success = True
    elif user_data['wallet'] < price:
        message = 'Not Enough Money'
    elif not all(prerequisite in user_courses_finished for prerequisite in dependencies):
        message = 'First Complete Prerequisites'
    else:
        # Make sure the wallet update doesn't allow a negative balance
        new_balance = user_data['wallet'] - price
        if new_balance < 0:
            message = "Not Enough Money"
        else:
            message = 'Course Purchased'
            success = True
            users[session['username']]['courses_in_progress'].append([selected_course, 0])
            users[session['username']]['wallet'] = new_balance  # Ensuring non-negative balance
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
            session['user']['username'] = username
            
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
                "first_name": "",
                "last_name": "",
                "password": password,
                "age": "",
                "city": "",
                "status": "student",
                "courses_finished": [],
                "courses_in_progress": []
            }
            session['logged-in'] = True
            session['username'] = username
            session['user'] = { key: value for key, value in users[username].items()}
            session['user']['username'] = username
            success = True
            message = 'Registration Successful!'
    save_file('static/json/users.json', users)
    return jsonify({'success': success, 'message': message})

def update_session():
    users = open_file('static/json/users.json')
    session['user'] = { key: value for key, value in users[session['username']].items()}

@app.route('/update-user', methods=["POST"])
def update_user():
    users = open_file('static/json/users.json')
    
    # Retrieve the updated user information from the form data
    updated_first_name = request.form.get('first-name')
    updated_last_name = request.form.get('last-name')
    updated_password = request.form.get('password')
    updated_city = request.form.get('city')
    updated_age = request.form.get('age')
    
    # Retrieve the current user information from session
    username = session['username']
    current_user_data = users.get(username, {})

    # Only update the fields that are being modified, and preserve the courses fields
    users[username] = {
        'first_name': updated_first_name,
        'last_name': updated_last_name,
        'password': updated_password,
        'age': updated_age,
        'city': updated_city,
        'status': current_user_data.get('status', ''),
        'wallet': current_user_data.get('wallet', 0),
        'courses_finished': current_user_data.get('courses_finished', []),
        'courses_in_progress': current_user_data.get('courses_in_progress', [])
    }

    # Update the session data as well
    session['user']['first_name'] = updated_first_name
    session['user']['last_name'] = updated_last_name
    session['user']['password'] = updated_password
    session['user']['city'] = updated_city
    session['user']['age'] = updated_age

    # Save the updated data back to the JSON file
    save_file('static/json/users.json', users)
    
    return jsonify({'success': True})


@app.route('/get-info', methods=["POST", "GET"])
def get_info():
    return jsonify({'details': session['user']})

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0', port=5075)
 

