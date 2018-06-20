const type = process.env.TYPE || 'json';
console.log(type);

const requestHandler = {
    plain: require('../http-servers/plain-text-server'),
    json: require('../http-servers/json-server'),
    html: require('../http-servers/html-server'),
}

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

let aProducts = require('../controllers/allProducts');
let sProduct = require('../controllers/singleProduct');

router.post('/test', function (req, res, next) {
    requestHandler[type](req, res);
    console.log('Time:', Date.now());
    next()
});

const cookieParcer = require('../middlewares/cookieParser');
router.post('/parceCookie', cookieParcer, function (req, res, next) {
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(req.parsedCookies));
    console.log('Time:', Date.now());
    next()
});

const queryParser = require('../middlewares/queryParser');
router.post('/queryParser', queryParser, function (req, res, next) {
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(req.parsedQuery));
    console.log('Time:', Date.now());
    next()
});

//Return ALL products
router.get('/api/products', function (req, res, next) {
    let response  = aProducts.getAllProducts();
    res.writeHead(response.status, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(response.body));
    console.log('Time:', Date.now());
    next()
});
//Return SINGLE product
router.get('/api/products/:id', function (req, res, next) {
    let response  = sProduct.getOneProduct(req.params.id);
    res.writeHead(response.status, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(response.body));
    console.log('Time:', Date.now());
    next()
});
//Return ALL reviews for a single product
router.get('/api/products/:id/reviews', function (req, res, next) {
    console.log('Time:', Date.now());
    next()
});
//Add NEW product and return it
router.post('/api/products', bodyParser.json(), function (req, res, next) {
    let response  = sProduct.addOneProduct(req);
    res.writeHead(response.status, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(response.body));
    console.log('Time:', Date.now());
    next()
});
//Return ALL users
router.get('/api/users', function (req, res, next) {
    console.log('Time:', Date.now())
    next()
});

module.exports = router;