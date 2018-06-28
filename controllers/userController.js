import path from 'path';
import fs from 'fs';
import util from 'util';

const filePath = path.join(__dirname, '../mock/users.json');
const readFile = util.promisify(fs.readFile);

export function getAllUsers(req, res, next) {
    readFile(filePath).then( (file) => {
        let data = file.toString();
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(data);
        console.log('Time:', Date.now());
    })
};

export function getUserByName(name) {
    readFile(filePath).then((file) => {
        let data = file.toString();
        let userItems = JSON.parse(data);
        console.log(name);
        let userData = userItems.find((x) => x.name === name);
        console.log(JSON.stringify(userData));
        return userData;
    })
}
