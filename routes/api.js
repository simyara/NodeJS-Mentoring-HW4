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
import {authentication} from '../middlewares/authentication';
import {verifyJWTToken} from '../middlewares/verifyJWTToken ';

import passport from 'passport';
import passportLocal from 'passport-local';
import passportFacebook from 'passport-facebook'';


const credentials = {
    name: 'John',
    password: 'psw',
};
let LocalStrategy = passportLocal.Strategy;
let FacebookStrategy = passportFacebook.Strategy;

passport.use(new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password'
    },
    function(username, password, done) {
        if (username !== credentials.name || password != credentials.password) {
        return done(null, false, 'Bad username/password combination')
        } else {
            return done(null, user)
        }
}));

passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://www.example.com/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate(..., function(err, user) {
            if (err) { return done(err); }
            done(null, user);
        });
    }
));

const type = process.env.TYPE || 'json';
const requestHandler = {
    plain: plainTextServer,
    json: jsonServer,
    html: htmlServer,
}

let router = express.Router();

router.get('/auth',authentication)

router.post('/test', function(req, res, next) {
    requestHandler[type](req, res);
    console.log('Time:', Date.now());
    next();
});

router.post('/parseCookie', cookieParser);

router.post('/queryParser', queryParser);

//Return ALL products
router.get('/api/products', verifyJWTToken, productController.getAllProducts);
//Return SINGLE product
router.get('/api/products/:id', verifyJWTToken, productController.getProductById);
//Return ALL reviews for a single product
router.get('/api/products/:id/reviews', verifyJWTToken, reviewController.getProductReviews);
//Add NEW product and return it
router.post('/api/products', verifyJWTToken, bodyParser.json(), productController.addNewProduct);
//Return ALL users
router.get('/api/users', verifyJWTToken, userController.getAllUsers);

let app = express();
app.use('/', router);

export default app;
