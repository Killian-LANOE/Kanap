function getInfo(product) {

    const img = document.createElement('img')
    img.src = product.imageUrl
    img.alt = product.altTxt


    let title = document.createElement('h3')
    title.className = 'productName'
    title.innerHTML = product.name


    let description = document.createElement('p')
    description.className = 'productDescription'
    description.innerHTML = product.description;


    let vitrine = document.createElement('article')
    vitrine.appendChild(img)
    vitrine.appendChild(title)
    vitrine.appendChild(description)

    return vitrine


};


fetch('http://localhost:3000/api/products')
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })

    .then(function (products) {

        products.forEach(product => {

            const container = document.querySelector('section#items')

            let link = document.createElement('a')
            link.href = `../html/product.html?id=${product._id}`

            container.appendChild(link)
            link.appendChild(getInfo(product))

        })

    })
    .catch(err => {
        alert('Problème Serveur! Veuillez réessayer')

    })