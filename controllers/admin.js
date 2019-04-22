const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProducts = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    
    Product.create({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl
    }).then(result => console.log(result)).catch(err => console.log(err));
};

exports.getEditProducts = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }

    const productId = req.params.productId;
    Product.findById(productId, product => {
        if (!product) {
            return res.redirect('/');
        }

        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    });
};

exports.postEditProducts = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;

    const updatedProduct = new Product(
        productId,
        updatedTitle,
        updatedImageUrl,
        updatedDescription,
        updatedPrice
    );
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll(products => {
        res.render('admin/products', {
            products: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId);
    res.redirect('/admin/products');
};
