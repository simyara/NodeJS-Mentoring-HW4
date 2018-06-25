import path from 'path';
import fs from 'fs';
import util from 'util';
import {merge} from "lodash";
const filePath = path.join(__dirname, '../mock/reviews.json');
const readFile = util.promisify(fs.readFile);

export function getProductReviews(req, res, next) {
    let id = req.params.id;
    readFile(filePath).then(file => {
        let data = file.toString();
        let prodItems = JSON.parse(data);
        let productData = prodItems.find((x) => x.id === parseInt(id));
        if (!productData) {
            res.writeHead(404, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify({error: 'reviews not found'}));
        }
        else {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(productData));
            console.log('Time:', Date.now());
            next();
        }
    })
}