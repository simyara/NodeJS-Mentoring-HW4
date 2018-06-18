"use strict";

let productServer = require('../models/productServer');
let _ = require('lodash');
let validator = require('./validator');

module.exports = {
    getOneProduct: function (id) {
        let productData = productServer.findOne(id);
        let response = {
            status : 200
        }

        if (!productData) {
            response.status = 404;
            response.body = {
                status: 'fail',
                data: {
                    error: 'product ot found'
                }
            };
            return response;
        }

        response.body = {
            status: 'success',
            data: productData
        };
        return response;
    },
   
    addOneProduct: function (request) {

        let response = {
            status: 200
        };

        const schemaToPut = {
            id: {type: 'number', required: true},
            name: {type: 'string', required: true},
            brand: {type: 'string', required: true},
            price: {type: 'number', required: true},
            options: {
                type :'object',
                properties: {
                    color: {type: 'string', required: true},
                    size: {type: 'string', required: false}
                }
            }
        };

        let validationResult = validator.validate(request.body, schemaToPut);

        if (!validationResult.isValid){
            response.status = 400;
            response.body = {
                status: 'fail',
                data: {
                    error: validationResult.errorMessage
                }
            };
            return response;
        }

        let productData = productServer.findOne(request.body.id, request.body);

        if (productData) {
            response.status = 400;
            response.body = {
                status: 'fail',
                data: {
                    error: 'product already exist'
                }
            };
            return response;
        }

        let newproductData = productServer.putOne(request.body.id, request.body);

        response.body = {
            status:'success',
            data: newproductData
        };

        return response;
    },
};