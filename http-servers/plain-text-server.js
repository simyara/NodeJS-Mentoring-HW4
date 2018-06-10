const requestHandler = (request, response) => {
    console.log(request.url);
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Hello World');
    response.end();
}

module.exports = requestHandler;



