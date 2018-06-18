"use strict";

let _ = require('lodash');

let prodItems = [
    {
        id: 1,
        name: 'Supreme T-Shirt 001',
        brand: 'Supreme',
        price: 99.99,
        options: [
            { color: 'blue' },
            { size: 'XL' }
        ]
    },
    {
        id: 2,
        name: 'Supreme T-Shirt 002',
        brand: 'Supreme',
        price: 99.99,
        options: [
            { color: 'blue' },
            { size: 'XL' }
        ]
    },
    {
        id: 3,
        name: 'Supreme T-Shirt 003',
        brand: 'Supreme',
        price: 99.99,
        options: [
            { color: 'blue' },
            { size: 'XL' }
        ]
    },
    {
        id: 4,
        name: 'Supreme T-Shirt 004',
        brand: 'Supreme',
        price: 99.99,
        options: [
            { color: 'blue' },
            { size: 'XL' }
        ]
    },
    {
        id: 5,
        name: 'Supreme T-Shirt 005',
        brand: 'Supreme',
        price: 99.99,
        options: [
            { color: 'blue' },
            { size: 'XL' }
        ]
    },
    {
        id: 6,
        name: 'Supreme T-Shirt 006',
        brand: 'Supreme',
        price: 99.99,
        options: [
            { color: 'blue' },
            { size: 'XL' }
        ]
    },
    {
        id: 7,
        name: 'Supreme T-Shirt 007',
        brand: 'Supreme',
        price: 99.99,
        options: [
            { color: 'blue' },
            { size: 'XL' }
        ]
    },
    {
        id: 8,
        name: 'Supreme T-Shirt 008',
        brand: 'Supreme',
        price: 99.99,
        options: [
            { color: 'blue' },
            { size: 'XL' }
        ]
    },
    {
        id: 9,
        name: 'Supreme T-Shirt 009',
        brand: 'Supreme',
        price: 99.99,
        options: [
            { color: 'blue' },
            { size: 'XL' }
        ]
    },
    {
        id: 10,
        name: 'Supreme T-Shirt 010',
        brand: 'Supreme',
        price: 99.99,
        options: [
            { color: 'blue' },
            { size: 'XL' }
        ]
    },
];

module.exports = {
    getItemsList() {
        return prodItems;
    },
    findOne(id) {
        return prodItems.find((x) => x.id === parseInt(id));
    },
    putOne(id, item) {
        let newItem = _.merge({id: id}, item);
        prodItems.push(newItem);
        return newItem;
    },
    deleteOne(id){
        prodItems = prodItems.filter((item) => item.id !== id);
        return id;
    }
};

