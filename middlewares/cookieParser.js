export function cookieParser(req, res, next) {
    req.requestTime = Date.now();
    let cookieString = req.headers.cookie;
    let parsedCookies = cookieString.trim().split(';').reduce((previousValue, currentValue) => {
        const [name, value] = currentValue.split('=');
        previousValue[name] = value;
        return previousValue
    }, {});
    req.parsedCookies = parsedCookies;
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(req.parsedCookies));
    return next();
};
