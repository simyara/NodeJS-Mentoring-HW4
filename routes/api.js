const type = process.env.TYPE || 'json';

const requestHandler = {
    plain: require('../http-servers/plain-text-server'),
    json: require('../http-servers/json-server'),
    html: require('../http-servers/html-server'),
}

var express = require('express');
var router = express.Router();

let aProducts = require('../controllers/allProducts');
let sProduct = require('../controllers/singleProduct');

router.post('/test', function (req, res, next) {
    requestHandler[type](req, res);
    console.log('Time:', Date.now())
    next()
});

//Return ALL products
router.get('/api/products', function (req, res, next) {
    aProducts.getAllProducts();
    console.log('Time:', Date.now())
    next()
});
//Return SINGLE product
router.get('/api/products/:id', function (req, res, next) {
    console.log('Time:', Date.now())
    next()
});
//Return ALL reviews for a single product
router.get('/api/products/:id/reviews', function (req, res, next) {
    console.log('Time:', Date.now())
    next()
});
//Add NEW product and return it
router.post('/api/products', function (req, res, next) {
    console.log('Time:', Date.now())
    next()
});
//Return ALL users
router.get('/api/users', function (req, res, next) {
    console.log('Time:', Date.now())
    next()
});

module.exports = router;