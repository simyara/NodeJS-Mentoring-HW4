const requestHandler = (request, response) => {
    console.log(request.url);
    response.writeHead(200, {'Content-Type': 'text/json'});
    response.write(JSON.stringify(product));
    response.end()
}


const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [
        { color: 'blue' },
        { size: 'XL' }
    ]
};
module.exports = requestHandler;