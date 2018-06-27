import path from 'path';
import fs from 'fs';
import util from 'util';
import {validate} from '../helpers/validator';
import {merge} from 'lodash';
const filePath = path.join(__dirname, '../mock/products.json');
const readFile = util.promisify(fs.readFile);

const schema = {
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

export function getAllProducts(req, res, next) {
    readFile(filePath).then( (file) => {
        let data = file.toString();
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(data);
        console.log('Time:', Date.now());
    })
}

export function getProductById(req, res, next) {
    let id = req.params.id;
    readFile(filePath).then((file) => {
        let data = file.toString();
        let prodItems = JSON.parse(data);
        let productData = prodItems.find((x) => x.id === parseInt(id));
        if (!productData) {
            res.writeHead(404, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify({error: 'product not found'}));
        }
        else {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(productData));
            console.log('Time:', Date.now());
        }
    })
}

export function addNewProduct(req, res, next) {

    let validationResult = validate(req.body, schema);

    if (!validationResult.isValid) {
        res.writeHead(400, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify({error: validationResult.errorMessage}));
        console.log('Time:', Date.now());
    }

    let id = req.body.id;

    readFile(filePath).then( (file) => {
        let data = file.toString();
        let prodItems = JSON.parse(data);
        let productData = prodItems.find((x) => x.id === parseInt(id));
        if (productData) {
            res.writeHead(400, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify({error: 'product already exist'}));
        }

        let newProductData = merge({id: id}, req.body);

        fs.appendFileSync(filePath, JSON.stringify(newProductData));
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(newProductData));

        console.log('Time:', Date.now());
    })
}



