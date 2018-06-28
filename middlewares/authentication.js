import * as jwt from 'jsonwebtoken';
const user = {
    name: 'John',
    password: 'psw',
    email: 'John@g.com'
};


export function authentication(req, res, next) {
    req.requestTime = Date.now();
    let headers = req.headers;
    let username = headers.user;
    let password = headers.password;
    if (username !== user.name || password !== user.password) {
        res.status(404).send({
            message: 'Not Found',
        });
    } else {
        var token = jwt.sign(user, 'secret');
        let data = {
            message: 'OK',
            data: {
                user: {
                    email: user.email,
                    username: user.name
                }
            },
            token: token
        }
        res.status(200).send(data);
    }
    return next();
};