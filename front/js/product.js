// recover 'id' from url then write information from it 

const params = new URLSearchParams(window.location.search)
fetch(`http://localhost:3000/api/products/${params.get('id')}`)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })

    .then(function (product) {

        // recover all colors then separate them individually 
        for (let color of product.colors) {
            let select = document.getElementById('colors')
            let option = document.createElement('option')
            option.innerHTML = color
            option.value = color
            select.appendChild(option)
        }
        // create an image from recovered id 
        let img = document.createElement('img')
        img.src = product.imageUrl

        document
            .querySelector('article div.item__img')
            .append(img);

        // create Title, price, and description from recovered id
        let title = document.getElementById('title')
        title.innerHTML = product.name

        let price = document.getElementById('price')
        price.innerHTML = product.price

        let description = document.getElementById('description')
        description.innerHTML = product.description

        let info = [title, price, description]

        return info;
    })

    .catch(function (err) {
        console.log(err)
    })


let Validation = document.createElement('p')
Validation.id = 'ErrorText'
document
    .querySelector('div.item__content__settings__quantity')
    .append(Validation)


// function to disable or enable 'addToCart'
function disableSubmit(disabled) {
    let cartButton = document.getElementById("addToCart")
    if (disabled) {
        cartButton.setAttribute("disabled", true)
        cartButton.style.background = 'grey'

    } else {
        cartButton.removeAttribute("disabled");
        cartButton.style.background = '#2c3e50'
    }
};
disableSubmit(true)
// Verify color from option
function verifyColor() {
    document.getElementById('colors').addEventListener('change', function (e) {
        let color = e.target.value
        if (color == undefined) {
            disableSubmit(true)
        } else {
            disableSubmit(false)
        }
    })
}
// Verify quantity from input
function verifyQuantity() {
    document.getElementById('quantity').addEventListener('input', function (e) {
        let quantity = e.target.value
        if (quantity < 1 || quantity > 100 || quantity == undefined) {
            document.getElementById('ErrorText').innerHTML = 'Veuillez entrer une valeur entre 1 et 100 !! '
            disableSubmit(true)
        } else {
            document.getElementById('ErrorText').innerHTML = ''
            disableSubmit(false)
        }
    }
    )
}

// Limit quantity between 1 to 100 or desactivate button and send error message
let quantity = document.getElementById('quantity')
    .addEventListener('input', function (e) {
        let value = e.target.value

        if (value < 1 || value > 100) {
            document.getElementById('ErrorText').innerHTML = 'Veuillez entrer une valeur entre 1 et 100 !! '
            verifyColor()

        } else {
            document.getElementById('ErrorText').innerHTML = ''
            verifyColor()

        }
    });


// Disable "addToCart" if color isn't defined
let colors = document.getElementById('colors')
    .addEventListener('change', function (e) {
        let color = e.target.value

        if (color == undefined) {
            disableSubmit(true)
        } else {
            verifyQuantity()
        }
    })

//get cart and convert back to an array if cart isn't empty
function getCart() {
    let cart = localStorage.getItem('cart')
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

// save cart and convert to json
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}


// Recover cart info, push new product, then save cart
function addToCart(product) {
    let cart = getCart()
    let foundProduct = cart.find(p => p.id == product.id && p.color == product.color)
    let quantity = parseInt(product.quantity)

    if (foundProduct != undefined) {
        let total = parseInt(quantity) + parseInt(foundProduct.quantity)
        if (total > 100) {
            alert('Quantité superieur à 100 !')

        } else {
            foundProduct.quantity = total
        }
    } else {
        product.quantity = parseInt(quantity);
        cart.push(product)
    }
    saveCart(cart)
}

// Get (img, title, color and quantity) then add them to localstorage by clicking on "addToCart"
document.getElementById("addToCart").addEventListener('click', function () {
    let id = params.get('id')
    let img = document.querySelector('div.item__img img').src
    let title = document.getElementById('title').innerHTML
    let color = document.getElementById('colors').value
    let quantity = document.getElementById('quantity').value

    addToCart({ 'id': id, 'img': img, 'title': title, 'color': color, 'quantity': quantity })
})