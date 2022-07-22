const params = new URLSearchParams(window.location.search)
fetch(`http://localhost:3000/api/products/${params.get('id')}`)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
