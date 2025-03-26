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
    if not session.get("logged-in"):
        return redirect(url_for("authorization_page"))

    return render_template("Base.html", name="Home")

@app.route("/contact")
def contact_page():
    if not session.get("logged-in"):
        return redirect(url_for("authorization_page"))
    return render_template("Base.html", name="Contact")

@app.route("/contact/submit", methods=["POST"])
def contact_submit():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    subject = data.get("subject")
    message = data.get("message")
    time = data.get("datatime")
    opinions = open_file("static/json/opinions.json")
    user_opinion = {
        "fullname": name,
        "email": email,
        "subject": subject,
        "message": message,
        "time": time,
    }
    opinions["for-admins"].append(user_opinion)
    save_file("static/json/opinions.json", opinions)
    return jsonify({"message": "Message Sent!"})


# @app.route("/shop/<categories>")
# def courses(categories):

#     selected_categories = categories.split("&")
#     topics_data = open_file('static/json/topics.json')

#     if "all" in selected_categories:
#         filtered_topics = topics_data
#     else:
#         selected_categories = [i.title() for i in selected_categories]

#         filtered_topics = {category: topics_data.get(category, {}) for category in selected_categories if category in topics_data}

#     session['filtered-topics'] = filtered_topics

#     return render_template("Base.html", name='Shop')

# @app.route('/get-filtered-topics')
# def get_filtered_topics():
#     return jsonify({"filtered_topics": session['filtered-topics']})

# @app.route('/get-topics')
# def get_topics():
#     topics = open_file('static/json/topics.json')
#     return jsonify({"topics": topics})

@app.route("/shop")
def shop():
    return render_template("Base.html", name="Shop")


@app.route("/profile/")
def load_profile():
    if not session.get("logged-in"):
        return redirect(url_for("authorization_page"))
    return render_template("Base.html", name="Profile")


@app.route("/purchase", methods=["GET", "POST"])
def courses_specific():
    if not session.get("logged-in"):
        return redirect(url_for("authorization_page"))

    topics = open_file("static/json/topics.json")
    users = open_file("static/json/users.json")

    data = request.get_json()
    selected_topic = data.get("topic")
    selected_course = data.get("course")
    price = int(data.get("price"))

    dependencies = topics[selected_topic][selected_course]["prerequisites"]
    success = False

    user_data = session["user"]
    user_courses = user_data.get("courses", [])

    finished_courses = {
        course["course"] for course in user_courses if course["status"] == "finished"
    }
    in_progress_courses = {
        course["course"] for course in user_courses if course["status"] == "in-progress"
    }

    if user_data["status"] != "Student":
        message = "You are not a student"
    elif selected_course in finished_courses:
        message = "You've already finished this course"
    elif selected_course in in_progress_courses:
        message = "You've already started this course"
        success = True
    elif not all(prerequisite in finished_courses for prerequisite in dependencies):
        message = "First Complete Prerequisites"
    elif user_data["wallet"] < price:
        message = "Not Enough Money"
    else:
        new_balance = user_data["wallet"] - price
        message = "Course Purchased"
        success = True
        users[session["username"]]["courses"].append(
            {
                "topic": selected_topic,
                "course": selected_course,
                "status": "in-progress",
                "score": 0,
            }
        )
        users[session["username"]]["wallet"] = new_balance
        users[session["username"]].setdefault("transaction_history", []).append(
            {
                "action": "spend",
                "topic": selected_course,
                "amount": price,
                "time": datetime.now().strftime("%Y-%m-%d %H:%M"),
            }
        )
        save_file("static/json/users.json", users)
        update_session()

    return jsonify({"message": message, "success": success})


@app.route("/authorization", methods=["GET"])
def authorization_page():
    return render_template("Base.html", name="Authorization")


@app.route("/authorization/<status>", methods=["GET", "POST"])
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


@app.route("/get-session-info", methods=["POST", "GET"])
def get_info():
    return jsonify({"details": session["user"]})


@app.route("/get-topics")
def topics_api():
    topics = open_file("static/json/topics.json")
    return jsonify({"topics": topics})

@app.route("/get-transactions")
def transactions_api():
    transactions = open_file("static/json/transactions.json")
    return jsonify({"transactions": transactions})

@app.route("/delete-user/<user>", methods=['GET','POST'])
def delete_user(user):
    if session['user']['status'] == 'Admin':
        users = open_file("static/json/users.json")
        del users[user]
        save_file('static/json/users.json', users)
        return jsonify({ 'success': True})
        
@app.route("/charge-wallet", methods=["POST"])
def charge_wallet():
    print('hi!')
    amount = request.json.get("amount")
    users = open_file("static/json/users.json")
    users[session['user']['user_name']]["wallet"] += int(amount)
    final_wallet = users[session['user']['user_name']]["wallet"]
    
    transactions = open_file("static/json/transactions.json")
    new_transaction = {
        "username": session['user']['user_name'],
        "action": "charge",
        "course": "",
        "amount": int(amount),
        "time": datetime.now().strftime("%Y-%m-%d %H:%M")
    }
    transactions.append(new_transaction)
    save_file("static/json/users.json", users)
    save_file("static/json/transactions.json", transactions)
    update_session()
    
    return jsonify({"success": True,"final_wallet": final_wallet, "new_transaction": new_transaction})
    
    

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5075)
