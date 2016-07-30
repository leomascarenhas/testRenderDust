'use strict';

var IndexModel = require('../models/index');


module.exports = function (router) {

    var model = new IndexModel();

    var UserService = require('../services/users');

    router.get('/', function (req, res) {
        res.render('index', model);
    });

    router.get('/test', function (req, res) {
        console.log('Controller...');
        UserService.testRender(function(err) {
            console.log('Err? ' + err);
        });
    });

};
