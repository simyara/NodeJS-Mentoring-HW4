import fs from 'fs';

const requestHandler = (request, response) => {
    var filename = __dirname + '/../index.html';
    var contents = fs.readFileSync(filename);
    var newC = contents.toString().replace(/{message}/g, 'Hello World');
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.end(newC);

};

export default requestHandler;
