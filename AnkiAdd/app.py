from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Store everything in one dictionary
entries = {
    "sentence": [],
    "verb": [],
    "noun": [],
    "adj": [],
    "adv": [],
    "prep": [],
    "conj": [],
    "other": []
}
xlist = [
    # ['apfel', 'noun', 'apple', 'ich esse einen apfel', 'I eat an apple'],
    # ['laufen', 'verb', 'to run', 'ich laufe schnell', 'I run fast'],
    # ['schnell', 'adj', 'fast', 'der schnelle hund', 'the fast dog'],
    # ['sehr', 'adv', 'very', 'ich bin sehr müde', 'I am very tired'],
    # ['mit', 'prep', 'with', 'ich gehe mit dir', 'I go with you'],
    # ['und', 'conj', 'and', 'ich mag pizza und pasta', 'I like pizza and pasta'],
    # ['das ist ein anderer test', 'other', '', '', '']
]

@app.route("/")
def index():
    return render_template("index.html", xlist=xlist)

@app.route("/submit/<category>", methods=["POST"])
def submit(category):
    if category not in entries:
        return "Invalid category", 400
    data = request.form
    print(data)
    xlist.append(data)
    # print(data['sentence_translation'])
    # entries[category].append(data)
    # xlist
    print('here is the xlist')
    print(xlist)

    return redirect(url_for("index"))

if __name__ == '__main__':
    app.run(debug=True, port=5005)