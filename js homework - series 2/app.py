from flask import Flask, request, render_template, redirect, url_for, session
import json
import random

app = Flask(__name__)

def load_file(filename):
    with open(filename) as f:
        return json.load(f)

def save_file(filename, data):
    with open(filename, 'w') as f:
        json.dump(data, f)

words = load_file('static/json/words.json')

@app.route('/')
def welcome():
    return render_template('welcome-page.html')

@app.route('/choose-topic')
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



if __name__ == '__main__':
    app.run(debug=True)