from flask import Flask, request, render_template, redirect, url_for, session
import json
import random

app = Flask(__name__)
app.secret_key = "supersecretkey"

def load_file(filename):
    with open(filename) as f:
        return json.load(f)

def save_file(filename, data):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)

words = load_file('static/json/words.json')
users = load_file('static/json/users.json')

@app.route('/auth', methods=['GET', 'POST'])
@app.route('/auth/<state>', methods=['GET', 'POST'])
def auth(state=None):
    result = request.args.get('result', '')
    if request.method == 'POST':
        username = request.form["username"]
        password = request.form["password"]
        if state == 'login':
            if username in users and users[username]['password'] == password:
                session['logged_in'] = True
                session['username'] = username
                print(session['username'])
                return redirect(url_for('auth', result='success'))
            return redirect(url_for('auth', result='wrong-info'))
        if username not in users: #state is registrered
            session['logged_in'] = True
            session['username'] = username
            users[username] = {'password': password, 'score': 0}
            save_file('static/json/users.json', users)
            return redirect(url_for('auth', result='success'))
        return redirect(url_for('auth', result='used-username')) # username taken
    return render_template('auth-page.html', result=result) # it is a get request

@app.route('/')
@app.route('/home', methods=['GET', 'POST'])
def home():
    if session.get('logged_in'):
        context = {
            'username': session['username'],

            'score':users[session['username']]['score'],
            'topics' : list(words.keys())
        }
        return render_template('home-page.html', **context)
    return redirect(url_for('auth'))

@app.route('/leaderboard', methods=['GET', 'POST'])
def leaderboard():
    if session.get('logged_in'):
        sorted_scores = dict(sorted(users.items(), key=lambda item: item[1]['score'], reverse=True))



        return render_template('leaderboard-page.html', scores = sorted_scores)
    return redirect(url_for('auth'))



@app.route('/choose-topic', methods=['GET', 'POST'])
def choose_topic():
    topics = list(words.keys())
    return render_template('topics.html', topics=topics)

@app.route("/choose-topic/<selected_topic>")
def play_game(selected_topic):
    selected_word = random.choice(words[selected_topic])
    letters = [i for i in selected_word]
    amount_of_added_letters = int(len(selected_word)*1.5) - len(selected_word)
    alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    letters.extend(random.sample(alphabet, amount_of_added_letters))
    random.shuffle(letters)

    context = {
        'selected_word': selected_word,
        'selected_topic': selected_topic,
        'letters': letters,
    }
    return render_template('game.html', **context)

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("auth"))


if __name__ == '__main__':
    app.run(debug=True)