let products = JSON.parse(localStorage.getItem('products')) || [];

function addProduct() {
    const imageInput = document.getElementById('product-image');
    const imageFile = imageInput.files[0];
    const productCode = document.getElementById('product-code').value;
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const shopkeeperName = document.getElementById('shopkeeper-name').value;
    const shopkeeperWhatsApp = document.getElementById('shopkeeper-whatsapp').value;

    if (!productName) {
        alert('Product name is required.');
        return;
    }

    const reader = new FileReader();
    reader.onloadend = function() {
        const product = {
            image: imageFile ? reader.result : '',
            code: productCode,
            name: productName,
            price: productPrice,
            shopCode: productCode,
            shopkeeperName: shopkeeperName,
            shopkeeperWhatsApp: shopkeeperWhatsApp
        };

        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        alert('Product added successfully!');

        imageInput.value = '';
        document.getElementById('product-code').value = '';
        document.getElementById('product-name').value = '';
        document.getElementById('product-price').value = '';
        document.getElementById('shopkeeper-name').value = '';
        document.getElementById('shopkeeper-whatsapp').value = '';
    }

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        reader.onloadend();
    }
}

function chatWithUs() {
    window.open('https://wa.me/923125136107', '_blank');
}

function deleteProduct(index, confirmKey) {
    if (confirmKey === '7897836') {
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
