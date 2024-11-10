const admins = {
    "ryan": {
        "userName": "Ryan",
        "passWord": "123",
        "isAdmin": true,
        // "isLogged": false
    },
    "nona": {
        "userName": "Nona",
        "passWord": "456",
        "isAdmin": true,
        // "isLogged": false
    }
}
const users = JSON.parse(localStorage.getItem('users')) || admins

const testProducts = {
    "id1": {
        'productName': 'Atompunk 1',
        'price': 19.99
    },
    "id2": {
        'productName': 'Atompunk 2',
        'price': 24.50
    }
    // ,
    // "id3": {
    //     'productName': 'Atompunk 3',
    //     'price': 29.99
    // },
    // "id4": {
    //     'productName': 'Cyberpunk 1',
    //     'price': 21.00
    // },
    // "id5": {
    //     'productName': 'Cyberpunk 2',
    //     'price': 18.75
    // },
    // "id6": {
    //     'productName': 'Cyberpunk 3',
    //     'price': 22.49
    // },
    // "id7": {
    //     'productName': 'Solarpunk 1',
    //     'price': 17.99
    // },
    // "id8": {
    //     'productName': 'Solarpunk 2',
    //     'price': 23.45
    // },
    // "id9": {
    //     'productName': 'Solarpunk 3',
    //     'price': 19.75
    // },
    // "id10": {
    //     'productName': 'Steampunk 1',
    //     'price': 20.99
    // },
    // "id11": {
    //     'productName': 'Steampunk 2',
    //     'price': 25.50
    // },
    // "id12": {
    //     'productName': 'Steampunk 3',
    //     'price': 30.00
    // }
}
const products = JSON.parse(localStorage.getItem('products')) || testProducts


const authDiv = document.getElementById('auth-div')
const loggDiv = document.getElementById('logger-div')
const moveDiv = document.getElementById('move-div')

const adminDiv = document.getElementById('admin-div')
const userDiv = document.getElementById('user-div')

function showLogger(){
    event.target.classList.toggle('click')
    moveDiv.classList.toggle('show') 
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
    const greetText = document.getElementById('greet-text')
    const greetState = document.getElementById('greet-state')

    if (userId === '' || userPass === '') return

    function setGreet(x, y){
        let status
        if ( y in users) {
            status = users[y].isAdmin
        } else {
            status = 'Unknown'
        }

        if (x =='success'){
            greetBtn.disabled = false
            greetText.textContent = `Hi there! Welcome abroad, ${users[userId].userName}!`
            if (status == true){
                greetState.textContent = 'State: Admin'
                greetBtn.onclick = function () {showPage('admin')}
            } else if (status == false) {
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
            setGreet('success', userId)
            populateUsersTable()
        } else {
            setGreet('incorrect', userId)
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



function populateProducts() {
    const addProductsDiv = document.getElementById('products-table')
    addProductsDiv.innerHTML = ''
    
    for (const productId in products) {
        const product = products[productId]
        const productArticle = document.createElement('article');
        productArticle.classList.add('style');
        productArticle.innerHTML = `
            <img src="${product.imagePath}" alt="${product.productName}">
            <div>
                <p class="product-name">${product.productName}</p>
                <p class="product-price">$${product.price}</p>
            </div>
        `;
        addProductsDiv.appendChild(productArticle);
    }
}


populateUsersTable()
populateProducts()

function addToPrints() {
    const inputProductId = document.getElementById('productName').value;
    const inputProductPrice = parseFloat(document.getElementById('price').value);
    const inputProductImage = document.getElementById('productImage').value;

    products[inputProductId] = {
        'productName': inputProductId,
        'imagePath': `images/${inputProductId}.jpeg`,
        'price': inputProductPrice
    };

    localStorage.setItem('products', JSON.stringify(products));

    document.getElementById('products-table').innerHTML = ''
    populateProducts()
}