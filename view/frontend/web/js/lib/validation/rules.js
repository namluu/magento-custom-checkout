define([
    'jquery'
    ], function ($) {
        'use strict';

        return function (rules) {

            rules['phoneAU'] = {
                handler: function (value) {
                    return !/\s/g.test(value) && value.match("^04") && value.replace(/[\s-]/g, '').match(/^\d{10}$/);
                },
                message: $.mage.__('Enter valid mobile number e.g. 0444333444')
            };

            return rules
        };
    });

