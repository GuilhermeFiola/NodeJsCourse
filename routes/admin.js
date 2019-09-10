const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

router.get('/add-product', isAuth, adminController.getAddProducts);

router.get('/products', isAuth, adminController.getProducts);

router.post('/add-product', isAuth, adminController.postAddProducts);

router.get('/edit-product/:productId', isAuth, adminController.getEditProducts);

router.post('/edit-product', isAuth, adminController.postEditProducts);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
