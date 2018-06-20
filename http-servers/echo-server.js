var http = require('http');

const server = http.createServer(function(req, res){
    console.log(req)
    res.writeHead(200);
    req.pipe(res);

});
const port = process.env.ECHOPORT || 3000;

server.listen(port, () => console.log(`ECHO-Server listening on port ${port}!`))