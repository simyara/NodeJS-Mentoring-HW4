import * as jwt from 'jsonwebtoken'
const user = {
    name: 'John',
    password: 'psw',
    email: 'John@g.com'
};

export function verifyJWTToken (req, res, next) {
    let token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, 'secret', function(err, decoded) {
            if (err) {
                res.status(400)
                    .json({message: "Invalid auth token provided."})
            } else {
                next()
            }
        })
    } else {
        res.status(404)
            .json({message: "No token provided"})
    }
};