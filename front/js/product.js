// Récupère les couleurs et les ajoutes dans le déroulants 
const params = new URLSearchParams(window.location.search)
console.log(params)
fetch(`http://localhost:3000/api/products/${params.get('id')}`)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })

    .then(function (product) {

        for (let color of product.colors) {
            let select = document.querySelector('#colors')
            let option = document.createElement('option')
            option.appendChild(document.createTextNode(color))
            option.value = color
            select.appendChild(option)
        }

        let img = document.createElement('img')
        img.src = product.imageUrl

        document
            .querySelector('article div.item__img')
            .append(img);

        document
            .getElementById('title')
            .innerHTML = product.name

        document
            .getElementById('price')
            .innerHTML = product.price

        document
            .getElementById('description')
            .innerHTML = product.description
    })
    .catch(function (err) {
        console.log(err)
    })


// Fonction créant le message pour valider ou non la quantité

function validateQuantity() {
    let quantityValidation = document.createElement('p')
    document
        .querySelector('div.item__content__settings__quantity')
        .append(quantityValidation)
    return document.querySelector('div.item__content__settings__quantity p')
};

// Fonction qui permet la désactivation du bouton 'addToCart'
function disableSubmit(disabled) {
    let cart = document.getElementById("addToCart")
    if (disabled) {
        cart.setAttribute("disabled", true)
        cart.style.background = 'grey'

    } else {
        cart.removeAttribute("disabled");
        cart.style.background = '#2c3e50'
    }
};

// Limite la quantité à un nombre entre 1 et 100, sinon désactive le bouton 'addToCart' et renvoie un message d'erreur.
document
    .querySelector('input')
    .addEventListener('input', function (e) {

        let value = e.target.value

        if (value < 1 || value > 100) {
            document
            validateQuantity().innerHTML = 'Veuillez entrer une valeur entre 1 et 100 !! '
            disableSubmit(true)
        } else {
            validateQuantity().innerHTML = ' '
            disableSubmit(false)

        }
    });

document.getElementById('addToCart').addEventListener('click',function(){
    
})
