const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const adminData = require('./admin');

router.get('/', (req, res, next) => {
  const products = adminData.products;
  
  // Handlebars
  res.render('shop', { 
    products: products, 
    pageTitle: 'Shop', 
    path: '/', 
    activeShop: true, 
    productCss: true
  });

  // Pug
  //res.render('shop', { products: products, pageTitle: 'Shop', path: '/' });
  
  // HTML
  //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;