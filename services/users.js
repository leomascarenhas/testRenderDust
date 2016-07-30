'use strict';


var fs = require('fs');

var UserService = function () {};

UserService.prototype.testRender = function (callback) {
    var dust = require('dustjs-linkedin');
    var helper = require('dust-usecontent-helper');
    var messagehelper = require('dust-message-helper');

    // The user object has a language defined,
    // so the generated content should respect this.
    // ex.: {name: 'Leo', locale: 'pt-BR'}

    helper(function (context, bundleName, cb) {
        console.log('context: ' + context);
        console.log('bundleName: ' + bundleName);
        cb(null, {hello: "world"});

    }).registerWith(dust);
    messagehelper.registerWith(dust);

    fs.readFile('./public/templates/users/welcome.dust', 'utf8', function (err, src) {

        if (err) {
            return callback(err);
        }

        console.log('\n'+src);

        //var compiledTemplate = dust.compile(src, 'welcome');
        //dust.loadSource(compiledTemplate);

        dust.renderSource(src, dust.context({
            intl: { locales: 'en-US' },
            user: { name: 'Leonardo' },
            templateName: 'welcome'
        }), function(err, out) {
            console.log('>>>>>> err: ' + err);
            console.log('>>>>>> out: ' + out);
        });

        // Send an e-mail to the user

        callback(null);
    });
};

module.exports = new UserService();
