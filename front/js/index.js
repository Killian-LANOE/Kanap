function getInfo(num){
    fetch('http://localhost:3000/api/products')
    .then(function(res){
        if (res.ok){
            return res.json();
        }
    })
    .then(function(products){
       
        const img = document.createElement('img')
        img.src = products[num].imageUrl 

        let title = document.createElement('h3')
        title.className = 'productName'
        title.innerHTML = products[num].name

        let description = document.createElement('p')
        description.className = 'productDescription'
        description.innerHTML = products[num].description;

        let vitrine = document.querySelector('a article')
            vitrine.appendChild(img)
            vitrine.appendChild(title)
            vitrine.appendChild(description)
        
    })
    .catch(function(err){ 

    });
};

fetch('http://localhost:3000/api/products')
    .then(function(res){
        if (res.ok){
            return res.json();
        }
    })

    .then(function(products){

        const container = document.querySelector('section#items')

        let link = document.createElement('a')
        link.href = "../html/product.html"
        
        let product = document.createElement('article')

        container.appendChild(link)
        link.appendChild(product)
        product.innerHTML = "", getInfo(0);
});