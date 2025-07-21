const productList = document.querySelectorAll('product')
const showCaseDiv = document.getElementById('showcase')


productList.forEach(product => {
    product.addEventListener('click', () => {
        const productName = document.querySelector('product-name').textContent
        showCaseDiv.innerHTML = "<img>"
    })

    
    
});