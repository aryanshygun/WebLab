from flask import Flask, render_template

app = Flask(__name__)

# user_list = {
#     'user1': {
#         'username': 'ryan',
#         'password': '111'
#     },
#     'user2': {
#         'username': 'jane',
#         'password': '222'
#     },
#     'user3': {
#         'username': 'alex',
#         'password': '333'
#     },
#     'user4': {
#         'username': 'emma',
#         'password': '444'
#     },
#     'user5': {
#         'username': 'chris',
#         'password': '555'
#     }
# }
# @app.route('/table')
# def index_page(): 
#     return render_template("index.html", user_list = user_list)

products = {
    'asus': [
        {
            'id': 'lap1',
            'name': 'ASUS ROG Zephyrus G14',
            # 'image': 'rog_zephyrus_g14.jpg',
            'ram': '16GB',
            'price': 1499
        },
        {
            'id': 'lap2',
            'name': 'ASUS TUF Gaming A15',
            # 'image': 'tuf_gaming_a15.jpg',
            'ram': '16GB',
            'price': 999
        },
        {
            'id': 'lap3',
            'name': 'ASUS VivoBook 15',
            # 'image': 'vivobook_15.jpg',
            'ram': '8GB',
            'price': 699
        }
    ],
    'apple': [
        {
            'id': 'lap4',
            'name': 'MacBook Air M1',
            # 'image': 'macbook_air_m1.jpg',
            'ram': '8GB',
            'price': 999
        },
        {
            'id': 'lap5',
            'name': 'MacBook Pro 14-inch',
            # 'image': 'macbook_pro_14.jpg',
            'ram': '16GB',
            'price': 1999
        },
        {
            'id': 'lap6',
            'name': 'MacBook Pro 16-inch',
            # 'image': 'macbook_pro_16.jpg',
            'ram': '32GB',
            'price': 2499
        }
    ],
    'lenovo': [
        {
            'id': 'lap7',
            'name': 'Lenovo ThinkPad X1 Carbon',
            # 'image': 'thinkpad_x1_carbon.jpg',
            'ram': '16GB',
            'price': 1399
        },
        {
            'id': 'lap8',
            'name': 'Lenovo Legion 5 Pro',
            # 'image': 'legion_5_pro.jpg',
            'ram': '16GB',
            'price': 1199
        },
        {
            'id': 'lap9',
            'name': 'Lenovo IdeaPad Flex 5',
            # 'image': 'ideapad_flex_5.jpg',
            'ram': '8GB',
            'price': 599
        }
    ]
}



@app.route('/<brand>')
def show_product(brand):
    # if brand == 'asus':
    #     return render_template("products.html", xdict = products['asus'])
    # elif brand == 'apple':
    #     return render_template("products.html", xdict = products['apple'])
    # elif brand == 'lenovo':
    #     return render_template("products.html", xdict = products['lenovo'])
    
    return render_template('products.html', xdict = products[brand])

if __name__ == '__main__':
    app.run(debug=True)
