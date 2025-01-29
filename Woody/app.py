from flask import Flask, request, jsonify, render_template, redirect, url_for, session
import json

app = Flask(__name__)
app.secret_key = "supersecretkey"

with open("users.json", "r") as infile:
    users = json.load(infile)

with open("products.json", "r") as infile:
    products =json.load(infile)




@app.route("/")
def default_page():
    return redirect("home")

@app.route("/home")
def home():
    if "username" not in session:
        return redirect(url_for("auth_page"))
    return render_template("home.html")

@app.route('/about')
def about():
    if "username" not in session:
        return redirect(url_for("auth_page"))
    return render_template('about.html')

@app.route('/contact')
def contact():
    if "username" not in session:
        return redirect(url_for("auth_page"))
    return render_template('contact.html')

@app.route('/profile')
def profile():
    if "username" not in session:
        return redirect(url_for("auth_page"))
    else:
        if session['role'] == 'admin':  
            return render_template('profile.html', username = session['username'], role = session['role'], users = users, products = products)
        else:
            return render_template('profile.html', username = session['username'], role = session['role'])



@app.route("/update_user", methods=["POST"])
def update_user():
    username = request.form["username"]
    password = request.form["password"]
    age = int(request.form["age"])
    city = request.form["city"]
    role = request.form["role"]

    for user in users:
        if user["username"] == username:
            user["password"] = password
            user["age"] = age
            user["city"] = city
            user["role"] = role
            break
        
    with open("users.json", "w") as file:
        json.dump(users, file, indent=4)

    return redirect(url_for("profile"))

@app.route("/delete_user", methods=["POST"])
def delete_user():
    username = request.form["username"]
    with open("users.json", "r") as infile:
        users = json.load(infile)

    users = [user for user in users if user["username"] != username]
    with open("users.json", "w") as file:
        json.dump(users, file, indent=4)

    return redirect(url_for("profile"))








# Load the JSON data
def load_products():
    with open("products.json", "r") as file:
        return json.load(file)

def save_products(products):
    with open("products.json", "w") as file:
        json.dump(products, file, indent=4)

@app.route("/update_product", methods=["POST"])
def update_product():
    category = request.form["category"]
    product_name = request.form["product_name"]
    product_brand = request.form["product_brand"]
    price = int(request.form["price"])
    year_of_product = int(request.form["year_of_product"])
    processor = request.form["processor"]
    memory = request.form["memory"]
    count = int(request.form["count"])

    products = load_products()
    for product in products[category]:
        if product["product_name"] == product_name:
            product["product_brand"] = product_brand
            product["price"] = price
            product["year_of_product"] = year_of_product
            product["processor"] = processor
            product["memory"] = memory
            product["count"] = count
            break
    save_products(products)
    return redirect("/")

@app.route("/delete_product", methods=["POST"])
def delete_product():
    category = request.form["category"]
    product_name = request.form["product_name"]

    products = load_products()
    products[category] = [product for product in products[category] if product["product_name"] != product_name]
    save_products(products)
    return redirect("/")


























@app.route('/mobile-page')
def mobile_page():
    if "username" not in session:
        return redirect(url_for("auth_page"))
    mobile_products = products['mobile']
    return render_template('mobile-page.html', mobile_products= mobile_products)

@app.route('/laptop-page')
def laptop_page():
    if "username" not in session:
        return redirect(url_for("auth_page"))
    laptop_products = products['laptop']
    return render_template('laptop-page.html', laptop_products = laptop_products)

@app.route('/tablet-page')
def tablet_page():
    if "username" not in session:
        return redirect(url_for("auth_page"))
    tablet_products = products['tablet']
    return render_template('tablet-page.html', tablet_products = tablet_products)

@app.route('/camera-page')
def camera_page():
    if "username" not in session:
        return redirect(url_for("auth_page"))
    camera_products = products['camera']
    return render_template('camera-page.html', camera_products = camera_products)

@app.route('/smartwatch-page')
def smartwatch_page():
    if "username" not in session:
        return redirect(url_for("auth_page"))
    smartwatch_products = products['smartwatch']
    return render_template('smartwatch-page.html', smartwatch_products = smartwatch_products)





@app.route("/auth", methods=["GET"])
def auth_page():
    return render_template("auth.html")

@app.route("/auth/<action>", methods=["POST"])
def auth(action):
    username = request.form["username"]
    password = request.form["password"]

    if action == "login":
        for user in users:
            if user["username"] == username and user["password"] == password:
                session["username"] = username
                session["role"] = user["role"]
                return redirect(url_for("home"))
        return 'Incorrect username/password... Try again.'

    elif action == "register":
        age = request.form["age"]
        city = request.form["city"]

        for user in users:
            if user["username"] == username:
                return "Username already exists. Try again."

        users.append({"username": username, "password": password, "age": age, "city": city, "role": "user"})
        with open("users.json", "w") as outfile:
            json.dump(users, outfile, indent=4)
        return redirect(url_for("home"))
    return "Invalid action."

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("auth_page"))

if __name__ == "__main__":
    app.run(debug=True)