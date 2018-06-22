import productServer from '../models/productServer';
import validator from './validator';

export default {
    getOneProduct: function (id) {
        let productData = productServer.findOne(id);
        let response = {
            status: 200
        };

        if (!productData) {
            response.status = 404;
            response.body = {
                data: {
                    error: 'product ot found'
                }
            };

            return response;
        }

        response.body = {
            data: productData
        };

        return response;
    },

    addOneProduct: function (request) {

        let response = {
            status: 200
        };

        const schemaToPut = {
            id: {
                type: 'number',
                required: true
            },
            name: {
                type: 'string',
                required: true
            },
            brand: {
                type: 'string',
                required: true
            },
            price: {
                type: 'number',
                required: true
            },
            options: {
                type: 'object',
                properties: {
                    color: {
                        type: 'string',
                        required: true
                    },
                    size: {
                        type: 'string',
                        required: false
                    }
                }
            }
        };

        let validationResult = validator.validate(request.body, schemaToPut);

        if (!validationResult.isValid) {
            response.status = 400;
            response.body = {
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
                data: {
                    error: 'product already exist'
                }
            };

            return response;
        }

        let newproductData = productServer.putOne(request.body.id, request.body);

        response.body = {
            data: newproductData
        };

        return response;
    },
};
