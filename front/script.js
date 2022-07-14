fetch('http://localhost:3000/api/products')
    .then(function(res){
        if (res.ok){
            return res.json();
        }
    })

    .then(function(products){
        products.forEach(product => {
            let select = document.querySelector('#colors')
            let option = document.createElement('option')
            option.appendChild(document.createTextNode(product.colors))
            option.value = product.colors
            select.appendChild(option);
        })
    }
);

function getInfo(num){
    fetch('http://localhost:3000/api/products')
    .then(function(res){
        if (res.ok){
            return res.json();
        }
    })
    .then(function(products){
        //if else 

        let img = document.createElement('img')
        img.src = products[num].imageUrl

        document
            .querySelector('article div.item__img')
            .appendChild(img);

        document
            .getElementById('title')
            .innerHTML = products[num].name

        document
            .getElementById('price')
            .innerHTML = products[num].price

        document
            .getElementById('description')
            .innerHTML = products[num].description;
        
    })
    .catch(function(err){ 

    });
};



document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('select[name="color-select"]').onchange=changeValue;
});

function changeValue(colors){
    if(colors.target.value == "Blue,White,Black") {
    return getInfo(0);
    }
    else if(colors.target.value == "Black/Yellow,Black/Red") {
        return getInfo(1);
    }
    else if(colors.target.value == "Green,Red,Orange") {
        return getInfo(2);
    }
    else if(colors.target.value == "Pink,White") {
        return getInfo(3);
    }
    else if(colors.target.value == "Grey,Purple,Blue") {
        return getInfo(4);
    }
    else if(colors.target.value == "Grey,Navy") {
        return getInfo(5);
    }
    else if(colors.target.value == "Red,Silver") {
        return getInfo(6);
    }
    else if(colors.target.value == "Pink,Brown,Yellow,White") {
        return getInfo(7);
    }
    else {
        return 0;
    }
};



//Récupère l'image de l'élément N°1 des products


/*function getImage() {
    fetch('http://localhost:3000/api/products')
    .then(function(res){
        if (res.ok){
            return res.json();
        }
    })
    .then(function(products){
        document
            .getElementsByClassName('item__img')
            .innerHTML = Products[num].imageUrl ;
        
    })
    .catch(function(err){

    });
};

getImage();*/


// Fonction add colors 

/*function createColorsOptions (){

    fetch('http://localhost:3000/api/products')
    .then(function(res){
        if (res.ok){
            return res.json();
        }
    })

    .then(function(products){
        products.forEach(product => {
            let select = document.querySelector('#colors')
            let option = document.createElement('option')
            option.appendChild(document.createTextNode(product.colors))
            option.value = product.colors
            select.appendChild(option);
        })
    }
)}*/

/*function test(val1, val2){
    console.log(val1 + val2)
};
test("http://localhost:3000/images/","kanap01.jpeg")


function imgCreate(src) {
    const img = IEWIN ? new Image() : document.createElement('img');
    img.src = "http://localhost:3000/images/" + src
    document.getElementById('item__img').appendChild(img)
}
imgCreate(kanap01.jpeg)*/

/* let img = document.createElement('img');
        let imgContainer = document.getElementsByClassName('item__img');
        console.log('1')
        img.src = products[num].imageUrl;
        console.log('2')
        imgContainer.appendChild(img);
        console.log('3')
*/