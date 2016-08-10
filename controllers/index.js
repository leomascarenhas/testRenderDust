'use strict';

var IndexModel = require('../models/index');


module.exports = function (router) {

    var model = new IndexModel();

    var UserService = require('../services/users');

    router.get('/', function (req, res) {
        res.render('index', model);
    });

    router.get('/test', function (req, res) {
        var usUser = {
            email: 'james@localhost',
            locale: 'en-US',
            name: 'James'
        }
        var brUser = {
            email: 'leonardo@localhost',
            locale: 'pt-BR',
            name: 'Leonardo'
        }

        var content = '';
        UserService.testRender(usUser, function(err, html) {
            content += html;
            console.log(html);

            UserService.testRender(brUser, function(err, html) {
                content += html;
                console.log(html);

                res.send(content);
            });
        });
    });

};
