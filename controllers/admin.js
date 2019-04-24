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

    req.user
        .createProduct({
            title: title,
            price: price,
            description: description,
            imageUrl: imageUrl
        })
        .then(result => {
            console.log(result);
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};

exports.getEditProducts = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }

    const productId = req.params.productId;

    req.user
        .getProducts({
            where: {
                id: productId
            }
        })
        //Product.findByPk(productId)
        .then(products => {
            const product = products[0];
            if (!product) {
                return res.redirect('/');
            }

            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        })
        .catch(err => console.log(err));
};

exports.postEditProducts = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;

    Product.update(
        {
            title: updatedTitle,
            price: updatedPrice,
            description: updatedDescription,
            imageUrl: updatedImageUrl
        },
        {
            where: {
                id: productId
            }
        }
    )
        .then(result => {
            console.log(result);
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    req.user
        .getProducts()
        //Product.findAll()
        .then(products => {
            res.render('admin/products', {
                products: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.destroy({
        where: {
            id: productId
        }
    })
        .then(result => {
            console.log(result);
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};
