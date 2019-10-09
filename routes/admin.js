const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

router.get('/add-product', isAuth, adminController.getAddProducts);

router.get('/products', isAuth, adminController.getProducts);

router.post(
    '/add-product',
    [
        body('title')
            .isString()
            .isLength({ min: 3 })
            .trim(),
        body('imageUrl').isURL(),
        body('price').isFloat(),
        body('description')
            .isLength({ min: 5, max: 400 })
            .trim()
    ],
    isAuth,
    adminController.postAddProducts
);

router.get('/edit-product/:productId', isAuth, adminController.getEditProducts);

router.post(
    '/edit-product',
    [
        body('title')
            .isString()
            .isLength({ min: 3 })
            .trim(),
        body('imageUrl').isURL(),
        body('price').isFloat(),
        body('description')
            .isLength({ min: 5, max: 400 })
            .trim()
    ],
    isAuth,
    adminController.postEditProducts
);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
