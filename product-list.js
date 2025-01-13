document.addEventListener('DOMContentLoaded', function () {
    const productListContainer = document.getElementById('product-list-container');
    const searchBox = document.getElementById('search-box');
    let products = JSON.parse(localStorage.getItem('products')) || [];

    function displayProducts(productsToDisplay) {
        productListContainer.innerHTML = '';
        productsToDisplay.forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" class="product-image" onclick="zoomImage(event)" download="${product.image}">
                <p>Code: ${product.code}</p>
                <p>Shop Code: ${product.shopCode}</p>
                <p>Name: ${product.name}</p>
                <p>Price: ${product.price}</p>
                <button onclick="shareProduct('${product.image}', '${product.code}', '${product.shopCode}', '${product.price}')">Share to WhatsApp</button>
                <button onclick="deleteProduct(${index}, prompt('Enter confirm key:'))">Delete Product</button>
            `;
            productListContainer.appendChild(productItem);
        });
    }

    searchBox.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query) || 
            product.code.toLowerCase().includes(query)
        );
        displayProducts(filteredProducts);
    });

    displayProducts(products);
});

function zoomImage(event) {
    const image = event.target;
    image.style.width = image.style.width === '100%' ? '100px' : '100%';
}

function shareProduct(image, code, shopCode, price) {
    const message = `Product Info:\nCode: ${code}\nShop Code: ${shopCode}\nPrice: ${price}`;
    const whatsappLink = `https://wa.me/923125136107?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}

function deleteProduct(index, confirmKey) {
    if (confirmKey === '7897836') {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        location.reload();
    } else {
        alert('Invalid key.');
    }
}

function deleteAllProducts(confirmKey) {
    if (confirmKey === '7897836') {
        localStorage.setItem('products', JSON.stringify([]));
        location.reload();
    } else {
        alert('Invalid key.');
    }
}
function chatWithUs() {
    window.open('https://wa.me/923125136107', '_blank');
}
