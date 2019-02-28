const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
  //Handlebars
  res.render('add-product', {
    pageTitle: 'Add Product', 
    path: '/admin/add-product', 
    activeAddProduct: true,
    formsCss: true,
    productCss: true
   });
  
  //Pug
  //res.render('add-product', {pageTitle: 'Add Product', path: '/admin/add-product'});
  
  //HTML
  //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});
  
router.post('/add-product', (req, res, next) => {
  products.push({title: req.body.title});
  res.redirect('/');
});

exports.routes = router;
exports.products = products;