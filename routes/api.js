import express from 'express';
import plainTextServer from '../http-servers/plain-text-server';
import jsonServer from '../http-servers/json-server';
import htmlServer from '../http-servers/html-server';

const type = process.env.TYPE || 'json';
const requestHandler = {
    plain: plainTextServer,
    json: jsonServer,
    html: htmlServer,
}

var router = express.Router();
import bodyParser from 'body-parser';

import aProducts from '../controllers/allProducts';
import sProduct from '../controllers/singleProduct';

import aUsers from '../controllers/allUsers';

import pReviews from '../controllers/productReviews';

router.post('/test', function(req, res, next) {
    requestHandler[type](req, res);
    console.log('Time:', Date.now());
    next()
});

import {
    cookieParser
} from '../middlewares/cookieParser';

router.post('/parseCookie', cookieParser, function(req, res, next) {
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(req.parsedCookies));
    console.log('Time:', Date.now());
    next()
});

import {
    queryParser
} from '../middlewares/queryParser';
router.post('/queryParser', queryParser, function(req, res, next) {
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(req.parsedQuery));
    console.log('Time:', Date.now());
    next()
});

//Return ALL products
router.get('/api/products', function(req, res, next) {
    let response = aProducts.getAllProducts();
    res.writeHead(response.status, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(response.body));
    console.log('Time:', Date.now());
    next()
});
//Return SINGLE product
router.get('/api/products/:id', function(req, res, next) {
    let response = sProduct.getOneProduct(req.params.id);
    res.writeHead(response.status, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(response.body));
    console.log('Time:', Date.now());
    next()
});
//Return ALL reviews for a single product
router.get('/api/products/:id/reviews', function(req, res, next) {
    let response = pReviews.getAllReviews(req.params.id);
    res.writeHead(response.status, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(response.body));
    console.log('Time:', Date.now());
    next()
});
//Add NEW product and return it
router.post('/api/products', bodyParser.json(), function(req, res, next) {
    let response = sProduct.addOneProduct(req);
    res.writeHead(response.status, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(response.body));
    console.log('Time:', Date.now());
    next()
});
//Return ALL users
router.get('/api/users', function(req, res, next) {
    let response = aUsers.getAllUsers();
    res.writeHead(response.status, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(response.body));
    console.log('Time:', Date.now());
    next()
});

export default router;
