// Get localStorage data
function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

//Save added or deleted data in localstorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload()
}

//delete element from it's id and color
function removeFromCart({ id, color }) {
  const cart = getCart();
  let foundProduct = cart.findIndex((p) => p.id === id && p.color === color);
  cart.splice(foundProduct, 1);
  document.querySelector(`[data-id='${id}'][data-color='${color}']`).remove();
  saveCart(cart);
}

//look at parent element on click then get data(id & color), then remmove element from cart and delete HTML, then verify if cart empty
function deleteProductFromCart() {
  document.querySelectorAll(".deleteItem").forEach((product) => {
    product.addEventListener("click", function (e) {
      let parentArticle = product.closest("article");
      let id = parentArticle.getAttribute("data-id");
      let color = parentArticle.getAttribute("data-color");
      removeFromCart({ id, color });
      isCartEmpty();
    });
  });
}

//Look at the cart, if cart empty use function "cartEmpty"
function isCartEmpty() {
  let cart = localStorage.cart;
  if (cart == undefined || cart == null || cart == "[]") {
    cartEmpty();
  }
}
isCartEmpty();

//Write a message if cart is empty
function cartEmpty() {
  let cartVide = document.createElement("h2");
  cartVide.innerHTML = "Votre panier est vide.";
  cartVide.style = "text-align: center";

  let cartContainer = document.getElementById("cart__items");
  cartContainer.append(cartVide);
}

//Get product information then return them
async function getProductInfos(id) {
  let fetchInfo = await fetch(`http://localhost:3000/api/products/${id}`).then(
    function (res) {
      if (res.ok) {
        return res.json();
      }
    }
  );
  return fetchInfo;
}

////////////////////////////////////////////////////////////////////////////////////////////////

//Create Elements to show in cart
function createHtmlElements(product, item) {
  //Create price
  const price = document.createElement("p");
  price.innerHTML = product.price + " €";
  price.className = "prix";

  //Create image and alt
  const img = document.createElement("img");
  img.src = product.imageUrl;
  img.alt = product.altTxt;

  //Create Name
  const title = document.createElement("h2");
  title.innerHTML = product.name;

  //Create Color
  const colorContainer = document.createElement("p");
  colorContainer.innerHTML = item.color;

  //Create Quantity
  const quantity = `<p>Qté : ${item.quantity}</p>`;

  //Create quantity Input
  const input = `<input data-id='${item.id}' data-color='${item.color}' class='itemQuantity' name='itemQuantity' type='number' min='1' max='100' value='0' >`;

  //Create article .cart__item
  let cartItem = document.createElement("article");
  cartItem.className = "cart__item";
  cartItem.setAttribute("data-id", `${item.id}`);
  cartItem.setAttribute("data-color", `${item.color}`);

  //Create div .cart__item__img
  let divImg = document.createElement("div");
  divImg.className = "cart__item__img";

  //Create div .cart__item__content
  let divContent = document.createElement("div");
  divContent.className = "cart__item__content";

  //Create div .cart__item__content__description
  let divContentDescription = document.createElement("div");
  divContentDescription.className = "cart__item__content__description";

  //Select section #cart__items
  let cartContainer = document.getElementById("cart__items");

  // Img Part
  cartContainer.append(cartItem);
  cartItem.append(divImg);
  divImg.append(img);

  // Description Part
  cartItem.append(divContent);
  divContent.append(divContentDescription);
  divContentDescription.append(title);
  divContentDescription.append(colorContainer);
  divContentDescription.append(price);

  //Create div .cart__item__content__settings
  let cartContentSettings = document.createElement("div");
  cartContentSettings.className = "cart__item__content__settings";

  //Create div .cart__item__content__settings__quantity
  let cartSettingsQuantity = document.createElement("div");
  cartSettingsQuantity.className = "cart__item__content__settings__quantity";

  // Cart Settings Part
  divContent.append(cartContentSettings);
  cartContentSettings.append(cartSettingsQuantity);
  cartSettingsQuantity.innerHTML = `${quantity} ${input}`;

  //Create div .cart__item__content__settings__delete
  let cartDelete = document.createElement("div");
  cartDelete.className = "cart__item__content__settings__delete";

  //Create paragraph .deleteItem
  let deleteItem = document.createElement("p");
  deleteItem.className = "deleteItem";
  deleteItem.innerText = "Supprimer";

  //Cart Delete Part
  cartContentSettings.append(cartDelete);
  cartDelete.append(deleteItem);
}

let allProductsPrice = [];
let allProductsQuantity = [];
let totalQuantity = 0;
let totalPrice = 0;

function getTotalPrice() {
  allProductsPrice.forEach((element) => {
    totalPrice += element;
  });
  document.getElementById("totalPrice").innerHTML = totalPrice;
}

function getTotalQuantity() {
  allProductsQuantity.forEach((element) => {
    totalQuantity += element;
  });
  document.getElementById("totalQuantity").innerHTML = totalQuantity;
}

async function displayCartInformation() {
  let cartJson = JSON.parse(localStorage.cart);

  for (let item of cartJson) {
    let id = item.id;

    const product = await getProductInfos(id);
    createHtmlElements(product, item);
    CalculateTotalPrice(product, item);
    CalculateTotalQuantity(item);
  }
  getTotalPrice();
  getTotalQuantity();
  deleteProductFromCart();
  getNewQuantity();
}
displayCartInformation();

////////////////////////////////////////

function CalculateTotalPrice(product, item) {
  //Calculate total of each product price * it's quantity
  let productPrice = product.price * item.quantity;
  allProductsPrice.push(productPrice);
}

function CalculateTotalQuantity(item) {
  allProductsQuantity.push(item.quantity);
}

function modifyQuantity(value, productId, productColor) {
  let cart = getCart();
  let product = cart.find(_product => _product.id == productId && _product.color == productColor)
  console.log(product)

  const quantity = parseInt(product.quantity) + parseInt(value);

  if (quantity < 1 || quantity > 100) {
    alert("Veuillez choisir une quantité entre 1 et 100!");
  } else {
    product.quantity = quantity;
    console.log(quantity);
    console.log(cart)
    saveCart(cart);
  }
}

function getNewQuantity() {
  document.querySelectorAll(".itemQuantity").forEach((element) => {
    element.addEventListener("change", function (e) {
      console.log(e.target.dataset.id)
      console.log(e.target.dataset.color)
      let value = e.target.value;
      modifyQuantity(value, e.target.dataset.id, e.target.dataset.color);
    });
  });
}

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");

function checkIfFormIsValid() {
  let formIsValid = true

  const firstNameValue = firstName.value
  if (!/[0-9]/g.test(firstNameValue) && firstNameValue.length > 2) {
    firstName.style.border = "2px solid lightgreen";
    document.getElementById("firstNameErrorMsg").innerText = "";
  } else {
    formIsValid = false
    document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez renseigner votre prénom !";
    firstName.style.border = "2px solid red";
  }

  const lastNameValue = lastName.value
  if (!/[0-9]/g.test(lastNameValue) && lastNameValue.length > 2) {
    lastName.style.border = "2px solid lightgreen";
    document.getElementById("lastNameErrorMsg").innerText = "";
  } else {
    formIsValid = false
    document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez renseigner votre nom !";
    lastName.style.border = "2px solid red";
  }

  const addressValue = address.value
  if (/[a-zA-Z0-9]+/g.test(addressValue) && addressValue.length > 2) {
    address.style.border = "2px solid lightgreen";
    document.getElementById("addressErrorMsg").innerText = "";
  } else {
    formIsValid = false
    document.getElementById("addressErrorMsg").innerHTML = "Veuillez renseigner votre addresse !";
    address.style.border = "2px solid red";
  }

  const cityValue = city.value
  if (!/[0-9' ']+/g.test(cityValue) && cityValue.length > 2) {
    city.style.border = "2px solid lightgreen";
    document.getElementById("cityErrorMsg").innerText = "";
  } else {
    formIsValid = false
    document.getElementById("cityErrorMsg").innerHTML = "Veuillez renseigner votre ville !";
    city.style.border = "2px solid red";
  }

  const emailValue = email.value
  if (/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g.test(emailValue) && emailValue.length > 2) {
    email.style.border = "2px solid lightgreen";
    document.getElementById("emailErrorMsg").innerText = "";
  } else {
    formIsValid = false
    document.getElementById("emailErrorMsg").innerText = "Veuillez renseigner une adresse mail valide! !";
    email.style.border = "2px solid red";
  }

  return formIsValid
}

function getOrder(contact, products) {
  //Recover contact Info from input

  contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
  products = []

  let cart = JSON.parse(localStorage.cart)
  for (let i = 0; i < cart.length; i++) {
    products.push(cart[i].id)
  }
  sendOrder(contact, products)
  alert("Commande Validée");

}

//Send Order to back
function sendOrder(contact, products) {
  let sendOrderInfo = fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    body: JSON.stringify({ contact, products }),
    headers: { 'Content-Type': 'application/json', },
  })
    .then((res) => res.json())
    .then(function (data) {
      //clear cart
      localStorage.clear()
      //get orderID then send user to confirmation page
      let urlConfirmation = "./confirmation.html?id=" + data.orderId
      window.location.href = urlConfirmation
    })
  console.log(sendOrderInfo)
}

document.getElementById("order").addEventListener("click", function (e) {
  e.preventDefault();
  if (checkIfFormIsValid()) {
    getOrder();
  }
});