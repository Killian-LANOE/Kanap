let id = (new URL(location)).searchParams.get("id");

// Get Order Id then write it
let orderId = document.getElementById("orderId");
orderId.innerHTML = id;