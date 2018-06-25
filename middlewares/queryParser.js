export function queryParser(req, res, next) {
    req.requestTime = Date.now();
    let urlString = req.url;
    let urlArray = urlString.split('?');
    urlArray.shift();
    let queryString = urlArray.shift();
    console.log(queryString);
    let parsedQuery = queryString.split('&').reduce((previousValue, currentValue) => {
        const [name, value] = currentValue.split('=');
        previousValue[name] = value;
        return previousValue
    }, {});
    req.parsedQuery = parsedQuery;
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(req.parsedQuery));
    return next();
};
