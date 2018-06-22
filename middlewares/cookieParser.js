export function cookieParser(req, res, next) {
    req.requestTime = Date.now();
    let cookieString = req.headers.cookie;
    let parsedCookies = {};
    cookieString.trim().split(';').forEach((cookie) => {
        let parts = cookie.trim().split('=');
        if (parts.length > 1) {
            parsedCookies[parts[0]] = parts[1];
        }
    });
    req.parsedCookies = parsedCookies;
    return next();
};
