const fs = require('fs');
const path = require('path');

const rootDirectory = require('../util/path');

const dataPath = path.join(rootDirectory, 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Buscar um carrinho anterior
        fs.readFile(dataPath, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            // Analisar o carrinho => Achar um produto existente
            const exisistingProductIndex = cart.products.findIndex(
                p => p.id === id
            );
            const exisistingProduct = cart.products[exisistingProductIndex];
            let updatedProduct;

            // Adicionar novo produto / quantidade e valor
            if (exisistingProduct) {
                updatedProduct = { ...exisistingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[exisistingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;

            fs.writeFileSync(dataPath, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }
};