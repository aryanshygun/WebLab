const authDiv = document.getElementById('auth-div')
const loggDiv = document.getElementById('logger-div')
const moveDiv = document.getElementById('move-div')

const adminDiv = document.getElementById('admin-div')
const userDiv = document.getElementById('user-div')

// this is the base admins that are pre-added. they have a different front page
// from normal users. they can see the lists of all users and can add products
// feel free to change ur passkey lol
const admins = {
    "ryan": {
        "userName": "Ryan",
        "passWord": "123",
        "isAdmin": true,
        "isLogged": false
    },
    "nona": {
        "userName": "Nona",
        "passWord": "456",
        "isAdmin": true,
        "isLogged": false
    }
}
// here it works with local storage of your own web browser so i wont be able to see
// your added users. havent learnt how to properly export to json file so this is the
// best we can do
const users = JSON.parse(localStorage.getItem('users')) || admins


const testProducts = {
    "id1": {
        'productName': 'Atompunk 1',
        'imagePath': './images/atompunk 1.jpeg',
        'price': 19.99
    },
    "id2": {
        'productName': 'Atompunk 2',
        'imagePath': 'images/atompunk 2.jpeg',
        'price': 24.50
    },
    "id3": {
        'productName': 'Atompunk 3',
        'imagePath': 'images/atompunk 3.jpeg',
        'price': 29.99
    },
    "id4": {
        'productName': 'Cyberpunk 1',
        'imagePath': 'images/cyberpunk 1.jpeg',
        'price': 21.00
    },
    "id5": {
        'productName': 'Cyberpunk 2',
        'imagePath': 'images/cyberpunk 2.jpeg',
        'price': 18.75
    },
    "id6": {
        'productName': 'Cyberpunk 3',
        'imagePath': 'images/cyberpunk 3.jpeg',
        'price': 22.49
    },
    "id7": {
        'productName': 'Solarpunk 1',
        'imagePath': 'images/solarpunk 1.jpeg',
        'price': 17.99
    },
    "id8": {
        'productName': 'Solarpunk 2',
        'imagePath': 'images/solarpunk 2.jpeg',
        'price': 23.45
    },
    "id9": {
        'productName': 'Solarpunk 3',
        'imagePath': 'images/solarpunk 3.jpeg',
        'price': 19.75
    },
    "id10": {
        'productName': 'Steampunk 1',
        'imagePath': 'images/steampunk 1.jpeg',
        'price': 20.99
    },
    "id11": {
        'productName': 'Steampunk 2',
        'imagePath': 'images/steampunk 2.jpeg',
        'price': 25.50
    },
    "id12": {
        'productName': 'Steampunk 3',
        'imagePath': 'images/steampunk 3.jpeg',
        'price': 30.00
    }
};


function showLogger(){
    if (moveDiv.classList.contains('show')){
        moveDiv.classList.remove('show')
    }
    const btn = event.target
    btn.classList.toggle('click')
    loggDiv.classList.toggle('show') 
    authDiv.classList.toggle('gap')
}

const userId = document.getElementById('username').value
const userPass = document.getElementById('password').value

const greetText = document.getElementById('greet-text')
const greetBtn = document.getElementById('greet-btn')


function showPage(state){
    authDiv.style.display = 'none'
    adminDiv.style.display = 'none'
    userDiv.style.display = 'none'
    if (state == 'login'){
        location.reload()
    } else if (state == 'admin') {
        adminDiv.style.display = 'flex'
    } else if (state == 'user') {
        userDiv.style.display = 'flex'
    }
}

function handleAuth(action) {
    const userId = document.getElementById('username').value
    const userPass = document.getElementById('password').value
    const greetBtn = document.getElementById('greet-btn')
    const moveDiv = document.getElementById('move-div')
    const greetText = document.getElementById('greet-text')
    const greetState = document.getElementById('greet-state')

    if (userId === '' || userPass === '') return

    if (!moveDiv.classList.contains('show')) {
        moveDiv.classList.toggle('show')
    }

    function setGreet(x, y){

        if (x =='success'){
            greetBtn.disabled = false
            greetText.textContent = `Hi there! Welcome abroad, ${users[userId].userName}!`
            if (y == true){
                greetState.textContent = 'State: Admin'
                greetBtn.onclick = function () {showPage('admin')}
            } else {
                greetState.textContent = 'State: User'
                greetBtn.onclick = function () {showPage('user')}
            }
        } else {
            greetBtn.disabled = true
            greetState.textContent = `State: Unknown`
            if (x == 'incorrect'){
                greetText.textContent = 'Incorrect user/pass, try again!'
            } else if (x == 'taken'){
                greetText.textContent = "Name's already taken! Try again"
            }
        }
    }

    if (action === 'sign-in') {
        if (userId in users && users[userId].passWord === userPass) {
            for (let i in users){
                users[i].isLogged = false
            }
            users[userId].isLogged = true
            greetBtn.disabled = false
            setGreet('success', users[userId].isAdmin)
            populateUsersTable()
        } else {
            setGreet('incorrect', users[userId].isAdmin)
        }
    } else if (action === 'sign-up') {
        if (userId in users) {
            setGreet('taken', users[userId].isAdmin)
        } else {
            users[userId] = {
                'userName': userId,
                'passWord': userPass,
                'isAdmin': false,
                'isLogged': true
            }
            localStorage.setItem('users', JSON.stringify(users));
            setGreet('success', users[userId].isAdmin)
            populateUsersTable()

        }
    }
}

function populateUsersTable() {
    const usersTableBody = document.querySelector('table tbody');
    usersTableBody.innerHTML = ''
    for (const userId in users) {
        const row = document.createElement('tr')
        row.classList.add('style')
        row.innerHTML = `
            <td>${users[userId].userName}</td>
            <td>${users[userId].isAdmin ? 'Yes' : 'No'}</td>
            <td>${users[userId].isLogged ? 'Yes' : 'No'}</td>
        `
        usersTableBody.appendChild(row)
    }
}

// // Call this function after the users are initialized
populateUsersTable();

// Get the container where products will be displayed
const addProductsDiv = document.getElementById('products-table');

// Loop through the products and create the HTML structure for each one
for (const productId in testProducts) {
    if (testProducts.hasOwnProperty(productId)) {
        const product = testProducts[productId];

        // Create an article element for each product
        const productArticle = document.createElement('article');
        productArticle.classList.add('style'); // Optional: Add any class if needed

        // Set up the product's image, name, and price inside the article
        productArticle.innerHTML = `
            <img src="${product.imagePath}">
            <div>
                <p class="product-name">${product.productName}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
            </div>
        `;

        // Append the product to the "add-products" div
        addProductsDiv.appendChild(productArticle);
    }
}
