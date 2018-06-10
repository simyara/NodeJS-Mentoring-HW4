"use strict";

let productServer = require('../models/productServer');

module.exports = {
    getAllProducts:  function* () {
        this.body = {
            status:'success',
            data: productServer.getItemsList()
        };
    }
};


