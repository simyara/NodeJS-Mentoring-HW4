import express from 'express';
import plainTextServer from '../http-servers/plain-text-server';
import jsonServer from '../http-servers/json-server';
import htmlServer from '../http-servers/html-server';
import bodyParser from 'body-parser';
import * as productController from '../controllers/productController';
import * as userController from '../controllers/userController';
import * as reviewController from '../controllers/reviewController';
import {cookieParser} from '../middlewares/cookieParser';
import {queryParser} from '../middlewares/queryParser';

const type = process.env.TYPE || 'json';
const requestHandler = {
    plain: plainTextServer,
    json: jsonServer,
    html: htmlServer,
}

let router = express.Router();

router.post('/test', function(req, res, next) {
    requestHandler[type](req, res);
    console.log('Time:', Date.now());
    next();
});

router.post('/parseCookie', cookieParser);

router.post('/queryParser', queryParser);

//Return ALL products
router.get('/api/products', productController.getAllProducts);
//Return SINGLE product
router.get('/api/products/:id', productController.getProductById);
//Return ALL reviews for a single product
router.get('/api/products/:id/reviews', reviewController.getProductReviews);
//Add NEW product and return it
router.post('/api/products', bodyParser.json(), productController.addNewProduct);
//Return ALL users
router.get('/api/users', userController.getAllUsers);

let app = express();

app.use('/', router);

export default app;
