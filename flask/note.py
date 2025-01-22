from flask import Flask, render_template

app = Flask(__name__)

weeklist = {
    'saturday': ['do homework', 'clean the room', 'watch a movie', 'read a book'],
    'sunday': ['go to gym', 'meal prep for the week', 'visit the park', 'call family'],
    'monday': ['visit friends', 'attend a meeting', 'write a journal', 'study German'],
    'tuesday': ['do the project', 'finish coding assignment', 'review lecture notes', 'practice programming'],
    'wednesday': ['do the exam', 'prepare notes for study', 'exercise at home', 'play video games'],
    'thursday': ['attend class', 'work on personal project', 'listen to a podcast', 'go for a walk'],
    'friday': ['finish weekly tasks', 'relax with music', 'plan next week', 'go out with friends']
}

week_target = {
    'week1': 'Focus on fitness - daily workouts and healthy eating',
    'week2': 'Improve coding skills - complete a small coding project',
    'week3': 'Learn German - practice vocabulary and grammar daily',
    'week4': 'Organize and declutter - clean and sort your living space',
    'week5': 'Social connections - spend quality time with family and friends'
}

@app.route('/calendar/<string:date>')
def weeklist_calendar(date:str):
    return render_template('calendar.html',name = date, xdate = weeklist[date])

@app.route('/calendar/<int:date>')
def week_target_calendar(date:int):
    return render_template('calendar.html',name = date, xdate = week_target[f'week{date}'])


if __name__ == '__main__':
    app.run(debug=True)


# @app.route('/<brand>')
# def show_product(brand):
    # if brand == 'asus':
    #     return render_template("products.html", xdict = products['asus'])
    # elif brand == 'apple':
    #     return render_template("products.html", xdict = products['apple'])
    # elif brand == 'lenovo':
    #     return render_template("products.html", xdict = products['lenovo'])
    # return render_template('products.html', xdict = products[brand])
