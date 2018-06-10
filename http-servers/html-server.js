var fs = require('fs');

const requestHandler = (request, response) => {
    var filename = __dirname+'/../index.html';
    //var readStream = fs.createReadStream(filename);

    var contents = fs.readFileSync(filename);
    var newC = contents.toString().replace(/{message}/g, 'Hello World');
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(newC);

    // readStream.on('open', function () {
    //     response.writeHead(200, {"Content-Type": "text/html"});
    //     readStream.pipe(response);
    // });
    //
    // readStream.on('error', function(err) {
    //     response.end(err);
    // });
};

module.exports = requestHandler;