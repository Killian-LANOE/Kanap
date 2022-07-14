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