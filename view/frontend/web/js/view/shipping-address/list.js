/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'ko',
    'underscore',
    'mageUtils',
    'uiLayout',
    'Magento_Checkout/js/view/shipping-address/list',
    'Magento_Customer/js/model/address-list'
], function (ko, _, utils, layout, ListView, addressList) {
    'use strict';

    var defaultRendererTemplate = {
        parent: '${ $.$data.parentName }',
        name: '${ $.$data.name }',
        component: 'Lounge_CheckoutRedesign/js/view/shipping-address/address-renderer/default',
        provider: 'checkoutProvider'
    };

    return ListView.extend({
        defaults: {
            template: 'Lounge_CheckoutRedesign/shipping-address/list',
            visible: addressList().length > 0,
            visibleGuest: addressList().length == 0
        },

        /** @inheritdoc */
        initChildren: function () {
            

            return this;
        }
    });
});
