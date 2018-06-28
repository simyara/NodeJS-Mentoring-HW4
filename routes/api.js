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
import passportFacebook from 'passport-facebook';
import passportTwitter from 'passport-twitter';
import passportGoogle from 'passport-google-oauth';


const credentials = {
    name: 'John',
    password: 'psw',
};
let LocalStrategy = passportLocal.Strategy;
let FacebookStrategy = passportFacebook.Strategy;
let TwitterStrategy = passportTwitter.Strategy;
let GoogleStrategy  = passportGoogle.OAuthStrategy;

passport.use(new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password',
    },
    function(username, password, done) {
        if (username !== credentials.name || password !== credentials.password) {
            return done(null, false, {message: 'Bad username/password combination'});
        } else {
            return done(null, credentials);
        }
}));

passport.use(new FacebookStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_KEY,
        consumerSecret: process.env.TWITTER_SECRET,
        callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
        done(null, user);
    }
));

passport.use(new GoogleStrategy({
        consumerKey: process.env.GOOGLE_KEY,
        consumerSecret: process.env.GOOGLE_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(token, tokenSecret, profile, done) {
        done(null, user);
    }
));

const type = process.env.TYPE || 'json';
const requestHandler = {
    plain: plainTextServer,
    json: jsonServer,
    html: htmlServer,
}

let router = express.Router();

router.get('/auth', authentication);

router.post('/auth/local', passport.authenticate('local'), function(req, res, next) {
    res.status(200).send(`Hello ${user.username}!`)
    next();
});

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),
    function(req, res) {
        res.redirect('/');
    });

router.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { successRedirect: '/',
        failureRedirect: '/auth/twitter' }));

router.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/google' }),
    function(req, res) {
        res.redirect('/');
    });

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
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);

export default app;
