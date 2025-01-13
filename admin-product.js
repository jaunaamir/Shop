document.addEventListener('DOMContentLoaded', function () {
    const adminProductListContainer = document.getElementById('admin-product-list-container');
    const searchBox = document.getElementById('admin-search-box');
    let products = JSON.parse(localStorage.getItem('products')) || [];

    function displayAdminProducts(productsToDisplay) {
        adminProductListContainer.innerHTML = '';
        productsToDisplay.forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.classList.add('admin-product-item');
            productItem.innerHTML = `
                <img src="${product.image}" class="product-image" onclick="zoomImage(event)" download="${product.image}">
                <p>Code: ${product.code}</p>
                <p>Name: ${product.name}</p>
                <p>Price: ${product.price}</p>
                <p>Shop Code: ${product.shopCode}</p>
                <p>Shopkeeper: ${product.shopkeeperName}</p>
                <p>WhatsApp: ${product.shopkeeperWhatsApp}</p>
                <button onclick="shareFullProduct('${product.image}', '${product.code}', '${product.name}', '${product.price}', '${product.shopCode}', '${product.shopkeeperName}', '${product.shopkeeperWhatsApp}')">Share to WhatsApp</button>
                <button onclick="deleteProduct(${index}, prompt('Enter confirm key:'))">Delete Product</button>
            `;
            adminProductListContainer.appendChild(productItem);
        });
    }

    searchBox.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query) || 
            product.code.toLowerCase().includes(query)
        );
        displayAdminProducts(filteredProducts);
    });

    displayAdminProducts(products);
});

function zoomImage(event) {
    const image = event.target;
    image.style.width = image.style.width === '100%' ? '100px' : '100%';
}

function shareFullProduct(code, name, price, shopCode, shopkeeperName, shopkeeperWhatsApp) {
    const message = `Product Info:\nCode: ${code}\nName: ${name}\nPrice: ${price}\nShop Code: ${shopCode}\nShopkeeper: ${shopkeeperName}\nWhatsApp: ${shopkeeperWhatsApp}\nImage: ${image}`;
    const whatsappLink = `https://wa.me/${shopkeeperWhatsApp}?text=${encodeURIComponent(message)}`;
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

function checkPassword() {
    const password = document.getElementById('admin-password').value;
    if (password === '7897836') {
        document.getElementById('admin-page-container').style.display = 'block';
    } else {
        document.getElementById('admin-page-container').style.display = 'none';
    }
}
function chatWithUs() {
    window.open('https://wa.me/923125136107', '_blank');
}