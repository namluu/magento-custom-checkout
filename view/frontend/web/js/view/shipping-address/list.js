define([
    'ko',
    'underscore',
    'mageUtils',
    'uiLayout',
    'Magento_Checkout/js/view/shipping-address/list',
    'Magento_Customer/js/model/address-list',
    'Magento_Checkout/js/checkout-data'
], function (ko, _, utils, layout, ListView, addressList, checkoutData) {
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
            imports: {
                firstname: 'checkout.steps.customer-details-step.customer-details-area.customer-details-fieldset.firstname:value',
                lastname: 'checkout.steps.customer-details-step.customer-details-area.customer-details-fieldset.lastname:value',
                street: 'checkout.steps.customer-details-step.customer-details-area.customer-details-fieldset.street:value',
                city: 'checkout.steps.customer-details-step.customer-details-area.customer-details-fieldset.city:value',
                region: 'checkout.steps.customer-details-step.customer-details-area.customer-details-fieldset.region_id:value',
                postcode: 'checkout.steps.customer-details-step.customer-details-area.customer-details-fieldset.postcode:value',
                telephoneNew: 'checkout.steps.customer-details-step.customer-details-area.customer-details-fieldset.telephone:value'
            }
        },

        initObservable: function () {
            this._super().observe('firstname lastname street city region postcode telephoneNew');
            return this;
        },

        fullName:function () {
            return this.firstname() + ' ' + this.lastname();
        },

        shippingAddress: function() {
            return this.street() + ' ' + this.city() + ', ' + this.region() + ', ' + this.postcode();
        },

        telephone: function() {
            return this.telephoneNew(); // avoid issue Maximum call stack size exceeded
        },

        guestEmail: function() {
            return checkoutData.getInputFieldEmailValue();
        }
    });
});
