/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'ko',
    'underscore',
    'Magento_Checkout/js/view/shipping-address/address-renderer/default',
    'Magento_Checkout/js/model/quote'
], function ($, ko, _, AddressRendererView, quote) {
    'use strict';

    return AddressRendererView.extend({
        defaults: {
            template: 'Lounge_CheckoutRedesign/shipping-address/address-renderer/default'
        },
        isQuoteAddressLocked: false,

        /** @inheritdoc */
        initObservable: function () {
            var checkoutConfig = window.checkoutConfig;

            this._super();

            

            return this;
        }
    });
});
