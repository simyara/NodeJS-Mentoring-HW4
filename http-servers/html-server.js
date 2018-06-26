import fs from 'fs';
import path from 'path';

function templateEngine(template, data) {
    let reg = /{([^%>]+)?}/g;
    let match;
    while (match = reg.exec(template)) {
        template = template.replace(match[0], data[match[1]])
    }
    return template;
}

const requestHandler = (request, response) => {
    let filename = path.resolve(__dirname, '/../index.html');
    let contents = fs.readFileSync(filename);
    let dataToReplace = {
        message: 'Hello World!'
    };
    let newContent = templateEngine(contents.toString(), dataToReplace);
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.end(newContent);

};

export default requestHandler;
