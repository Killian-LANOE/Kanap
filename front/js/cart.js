// Get localStorage data
function getCart() {
    let cart = localStorage.getItem('cart')
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

//Save added or deleted data in localstorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

//delete element from it's id and color
function removeFromCart({ id, color }) {
    const cart = getCart()
    let foundProduct = cart.findIndex(p => p.id === id && p.color === color)
    cart.splice(foundProduct, 1)
    document.querySelector(`[data-id='${id}'][data-color='${color}']`).remove()
    saveCart(cart)
}




//look at parent element on click then get data(id & color), then remmove element from cart and delete HTML, then verify if cart empty
function deleteProductFromCart() {
    document.querySelectorAll('.deleteItem').forEach(product => {
        product.addEventListener('click', function (e) {
            let parentArticle = product.closest('article')
            let id = parentArticle.getAttribute('data-id')
            let color = parentArticle.getAttribute('data-color')
            removeFromCart({ id, color })
            isCartEmpty()

        })
    })
}

//Look at the cart, if cart empty use function "cartEmpty"
function isCartEmpty() {
    let cart = localStorage.cart
    if (cart == undefined || cart == null || cart == '[]') {
        cartEmpty()
    }
}
isCartEmpty()

//Write a message if cart is empty
function cartEmpty() {
    let cartVide = document.createElement('h2')
    cartVide.innerHTML = 'Votre panier est vide.'
    cartVide.style = 'text-align: center'

    let cartContainer = document.getElementById('cart__items')
    cartContainer.append(cartVide)
}

//Get product information then return them
async function getProductInfos(id) {
    let fetchInfo = await fetch(`http://localhost:3000/api/products/${id}`)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
    return fetchInfo
}


////////////////////////////////////////////////////////////////////////////////////////////////

//Create Elements to show in cart
function createHtmlElements(product, item) {

    //Create price
    const price = document.createElement('p')
    price.innerHTML = product.price + ' €'
    price.className = 'prix'

    //Create image and alt
    const img = document.createElement('img')
    img.src = product.imageUrl
    img.alt = product.altTxt

    //Create Name
    const title = document.createElement('h2')
    title.innerHTML = product.name

    //Create Color
    const colorContainer = document.createElement('p')
    colorContainer.innerHTML = item.color

    //Create Quantity
    const quantity = `<p>Qté : ${item.quantity}</p>`

    //Create quantity Input
    const input = `<input class='itemQuantity' name='itemQuantity' type='number' min='1' max='100' value='0' >`

    //Create article .cart__item
    let cartItem = document.createElement('article')
    cartItem.className = 'cart__item'
    cartItem.setAttribute('data-id', `${item.id}`)
    cartItem.setAttribute('data-color', `${item.color}`)

    //Create div .cart__item__img
    let divImg = document.createElement('div')
    divImg.className = 'cart__item__img'

    //Create div .cart__item__content
    let divContent = document.createElement('div')
    divContent.className = 'cart__item__content'

    //Create div .cart__item__content__description
    let divContentDescription = document.createElement('div')
    divContentDescription.className = 'cart__item__content__description'

    //Select section #cart__items
    let cartContainer = document.getElementById('cart__items')

    // Img Part
    cartContainer.append(cartItem)
    cartItem.append(divImg)
    divImg.append(img)

    // Description Part
    cartItem.append(divContent)
    divContent.append(divContentDescription)
    divContentDescription.append(title)
    divContentDescription.append(colorContainer)
    divContentDescription.append(price)

    //Create div .cart__item__content__settings
    let cartContentSettings = document.createElement('div')
    cartContentSettings.className = 'cart__item__content__settings'

    //Create div .cart__item__content__settings__quantity
    let cartSettingsQuantity = document.createElement('div')
    cartSettingsQuantity.className = 'cart__item__content__settings__quantity'

    // Cart Settings Part
    divContent.append(cartContentSettings)
    cartContentSettings.append(cartSettingsQuantity)
    cartSettingsQuantity.innerHTML = `${quantity} ${input}`

    //Create div .cart__item__content__settings__delete
    let cartDelete = document.createElement('div')
    cartDelete.className = 'cart__item__content__settings__delete'

    //Create paragraph .deleteItem
    let deleteItem = document.createElement('p')
    deleteItem.className = 'deleteItem'
    deleteItem.innerText = 'Supprimer'

    //Cart Delete Part
    cartContentSettings.append(cartDelete)
    cartDelete.append(deleteItem)

}


async function displayCartProduct() {
    let cartJson = JSON.parse(localStorage.cart)

    for (let item of cartJson) {
        let id = item.id

        const product = await getProductInfos(id)
        createHtmlElements(product, item)
        CalculateTotalPrice(product, item)
    }


    deleteProductFromCart()
    changeQuantity()

}

displayCartProduct()


////////////////////////////////////////



let totalValue = []
let totalQuantity = []
let totalPrice = 0;


async function CalculateTotalPrice(product, item) {
    //Calculate total of each product price * it's quantity
    let productPrice = product.price * item.quantity
    totalValue.push(productPrice)

}


function test(value) {

    let cart = getCart()
    cart.forEach(product => {

        quantity = parseInt(product.quantity) + parseInt(value)
        if (quantity > 100) {
            alert('quantité superieur à 100!')
        } else {
            product.quantity = quantity
            console.log(quantity)
            saveCart(cart)
        }
    })
}

function changeQuantity() {

    document.querySelectorAll('.itemQuantity').forEach(element => {
        element.addEventListener('input', function (e) {
            let value = e.target.value
            test(value)

        })
    })
}