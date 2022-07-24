let cart = localStorage.getItem('cart')
let cartJson = JSON.parse(cart)

for (let product of cartJson) {

    const img = document.createElement('img')
    img.src = product.img

    const title = document.createElement('h2')
    title.innerHTML = product.title

    const color = document.createElement('p')
    color.innerHTML = product.color

    const quantity = `<p>Qté : ${product.quantity}</p>`

    const input = `<input class='itemQuantity' name='itemQuantity' type='number' min='1' max='100' value='0' >`

    //Create article .cart__item
    let cartItem = document.createElement('article')
    cartItem.className = 'cart__item'
    cartItem.setAttribute('data-id', '{product-ID}')
    cartItem.setAttribute('data-color', '{product-color}')

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
    divContentDescription.append(color)

    //Create div .cart__item__content__settings
    let cartSettings = document.createElement('div')
    cartSettings.className = 'cart__item__content__settings'

    //Create div .cart__item__content__settings__quantity
    let cartSettingsQuantity = document.createElement('div')
    cartSettingsQuantity.className = 'cart__item__content__settings__quantity'

    // Cart Settings Part
    cartItem.append(cartSettings)
    cartSettings.append(cartSettingsQuantity)
    cartSettingsQuantity.innerHTML = `${quantity} ${input}`

    //Create div .cart__item__content__settings__delete
    let cartDelete = document.createElement('div')
    cartDelete.className = 'cart__item__content__settings__delete'

    //Create paragraph .deleteItem
    let deleteItem = document.createElement('p')
    deleteItem.className = 'deleteItem'
    deleteItem.innerText = 'Supprimer'

    //Cart Delete Part
    cartItem.append(cartSettings)
    cartSettings.append(cartDelete)
    cartDelete.append(deleteItem)
}