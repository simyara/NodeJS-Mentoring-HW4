"use strict";

let productServer = require('../models/productServer');
let _ = require('lodash');
let validator = require('./validator');

module.exports = {
    getOneproduct: function*() {
        let productData = yield productServer.findOne(this.params.id);

        if (!productData) {
            this.status = 404;
            this.body = {
                status: 'fail',
                data: {
                    error: 'product ot found'
                }
            };
            return;
        }

        this.body = {
            status: 'success',
            data: productData
        };
    },
    updateOneproduct: function*(next) {

        const schema = {
            name: {type: 'string'},
            brand: {type: 'string'},
            price: {type: 'integer'},
            options: {
                type :'object',
                properties: {
                    color: {type: 'string'},
                    size: {type: 'string'}
                }
            }
        };

        let validationResult = yield validator.validate(this.request.body, schema);

        if (!validationResult.isValid){
            this.status = 400;
            this.body = {
                status: 'fail',
                data: {
                    error: validationResult.errorMessage
                }
            };
            return;
        }




        let productData = yield productServer.findOne(this.params.id);

        if (!productData) {
            this.status = 404;
            this.body = {
                status: 'fail',
                data: {
                    error: 'product ot found'
                }
            };
            return;
        }

        _.merge(productData, this.request.body);

        this.body = {
            status:'success',
            data: productData
        };

        yield next;
    },
    addOneproduct: function*(next) {

        const schemaToPut = {
            name: {type: 'string', required: true},
            details: {
                type :'object',
                properties: {
                    url: {type: 'string', required: true},
                    description: {type: 'string', required: false}
                }
            }
        };

        let validationResult = yield validator.validate(this.request.body, schemaToPut);

        if (!validationResult.isValid){
            this.status = 400;
            this.body = {
                status: 'fail',
                data: {
                    error: validationResult.errorMessage
                }
            };
            return;
        }

        let productData = yield productServer.findOne(this.params.id, this.request.body);

        if (productData) {
            this.status = 400;
            this.body = {
                status: 'fail',
                data: {
                    error: 'product already exist'
                }
            };
            return;
        }

        let newproductData = yield productServer.putOne(this.params.id, this.request.body);

        this.body = {
            status:'success',
            data: newproductData
        };

        yield next;
    },
    deleteOneproduct: function*() {
        let productData = yield productServer.findOne(this.params.id);

        if (!productData) {
            this.status = 404;
            this.body = {
                status: 'fail',
                data: {
                    error: 'product not found'
                }
            };
            return;
        }

        let deletedId = yield productServer.deleteOne(this.params.id);

        this.body = {
            status: 'success',
            data: deletedId
        };
    }
};