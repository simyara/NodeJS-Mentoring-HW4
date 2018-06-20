"use strict";

let userServer = require('../models/userServer');

module.exports = {
    getAllUsers:  function () {
        return {
            status : 200,
            body : {
                status:'success',
                data: userServer.getItemsList()
            }
        }
    }
};


