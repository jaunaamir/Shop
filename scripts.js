const DEFAULT_IMAGE = 'https://via.placeholder.com/100'; // Placeholder image URL
let products = JSON.parse(localStorage.getItem('products')) || [];

function renderProducts(filteredProducts = products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    filteredProducts.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="Product Image" onclick="zoomImage('${product.image}')">
            <div>
                <p>Item Code: ${product.itemCode}</p>
                <p>Product Name: ${product.name}</p>
                <p>Shopkeeper Name: ${product.shopkeeperName}</p>
                <p>Shopkeeper Address: ${product.shopkeeperAddress}</p>
                <p>Product Price: PKR ${product.price}</p>
                <p>Shopkeeper Whatsapp: <a href="https://wa.me/${product.whatsappNumber}" target="_blank">Chat</a></p>
                <button class="delete-button" onclick="deleteProduct(${index})">Delete</button>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

function validateAndAddProduct() {
    const accessCode = document.getElementById('accessCode').value;
    if (accessCode === "1234567") {
        addProduct();
    } else {
        alert("Incorrect access code!");
    }
}

function addProduct() {
    const productImage = document.getElementById('productImage').files[0];
    const itemCode = document.getElementById('itemCode').value;
    const productName = document.getElementById('productName').value;
    const shopkeeperName = document.getElementById('shopkeeperName').value;
    const shopkeeperAddress = document.getElementById('shopkeeperAddress').value;
    const whatsappNumber = document.getElementById('whatsappNumber').value;
    const productPrice = document.getElementById('productPrice').value;

    const newProduct = {
        image: DEFAULT_IMAGE,
        itemCode: itemCode,
        name: productName,
        shopkeeperName: shopkeeperName,
        shopkeeperAddress: shopkeeperAddress,
        whatsappNumber: whatsappNumber,
        price: productPrice
    };

    if (productImage) {
        const reader = new FileReader();
        reader.onload = function (e) {
            newProduct.image = e.target.result;
            products.unshift(newProduct);
            localStorage.setItem('products', JSON.stringify(products));
            renderProducts();
            showSuccessMessage();
        };
        reader.readAsDataURL(productImage);
    } else {
        products.unshift(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
        showSuccessMessage();
    }

    // Clear the form after adding product
    document.getElementById('productForm').reset();
}

function deleteProduct(index) {
    const confirmation = prompt("Enter password to delete product:");
    if (confirmation === "12345") {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
    } else {
        alert("Incorrect password!");
    }
}

function deleteAllProducts() {
    const confirmation = prompt("Enter password to delete all products:");
    if (confirmation === "123456") {
        products = [];
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
    } else {
        alert("Incorrect password!");
    }
}

function searchProduct() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchInput) ||
        product.itemCode.toLowerCase().includes(searchInput) ||
        product.shopkeeperName.toLowerCase().includes(searchInput)
    );
    renderProducts(filteredProducts);
}

function zoomImage(imageUrl) {
    const newWindow = window.open();
    newWindow.document.write('<img src="' + imageUrl + '" style="width:100%; height:100%;">');
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.textContent = 'Product saved successfully!';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.backgroundColor = '#4CAF50';
    message.style.color = 'white';
    message.style.padding = '10px 20px';
    message.style.borderRadius = '5px';
    document.body.appendChild(message);
    setTimeout(() => {
        document.body.removeChild(message);
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
