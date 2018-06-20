module.exports = function (req, res, next) {
    req.requestTime = Date.now();
     let urlString = req.url;
     let urlArray = urlString.split('?');
     urlArray.shift();
     let queryString = urlArray.shift();
     let parsedQuery = {};
    queryString.split('&').forEach((query) => {
         let parts = query.trim().split('=');
         if (parts.length > 1) {
             parsedQuery[parts[0]] = parts[1];
         }
     });
     req.parsedQuery = parsedQuery;
    return next();
};