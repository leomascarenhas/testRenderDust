'use strict';


var fs = require('fs');
var makara = require('makara');
var path = require('path');
var freshy = require('freshy');
var dust = freshy.freshy('dustjs-linkedin');
var properties = require ("properties");

var UserService = function () {};

require('dust-makara-helpers').registerWith(dust, {
    enableMetadata: false,
    autoloadTemplateContent: false,
    loader: function (context, bundle, cb) {
        cb(null, context.get('userBundle'));
    }
});

UserService.prototype.testRender = function (user, callback) {
    var localeArr = user.locale.split("-");
    var lang = localeArr[0];
    var country = localeArr[1];
    var file = path.resolve(__dirname, '../locales/'+country+'/'+lang+'/default.properties');

    properties.parse(file, { path: true }, function (err, jsonBundle) {
        if (err)
          callback(err);

        var src = fs.readFileSync(path.resolve(__dirname, '../public/templates/users/welcome.dust')).toString();
        dust.loadSource(dust.compile(src, 'welcome'));
        dust.render('welcome', {
            app: 'WelcomeApp',
            templateName: 'welcome',
            locale: user.locale,
            userName: user.name,
            userBundle: jsonBundle
        }, function(err, out) {
            callback(null, out);
        });
    });
};

module.exports = new UserService();
