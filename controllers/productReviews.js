"use strict";

let productServer = require('../models/productServer');
let userServer = require('../models/userServer');
let reviewServer = require('../models/reviewServer');
let _ = require('lodash');

module.exports = {
    getAllReviews: function (productId) {
        let productData = reviewServer.getAllForProductId(productId);
        let response = {
            status : 200
        }

        if (!productData) {
            response.status = 404;
            response.body = {
                status: 'fail',
                data: {
                    error: 'reviews not found'
                }
            };
            return response;
        }

        response.body = {
            status: 'success',
            data: productData
        };
        return response;
    }
};