"use strict";

let productServer = require('../models/productServer');

module.exports = {
    getAllProducts:  function () {
        return {
            status : 200,
            body : {
                status:'success',
                data: productServer.getItemsList()
            }
        }
    }
};


