define([
    'jquery',
    'ko',
    'uiComponent',
    'underscore',
    'Magento_Checkout/js/model/step-navigator',
    'uiRegistry',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/model/shipping-rate-registry',
    'Magento_Checkout/js/model/checkout-data-resolver',
    'Magento_Checkout/js/checkout-data',
    'Magento_Checkout/js/model/shipping-rates-validator',
    'Magento_Customer/js/model/customer'
], function($, ko, Component, _, stepNavigator, registry, quote, rateRegistry, 
            checkoutDataResolver, checkoutData, shippingRatesValidator, customer) {
    'use strict';

    return Component.extend({
        defaults: {
            sortOrder: 10,
            stepCode: 'customer-details-step',
            stepTitle: 'Details',
            fieldComponentsOfThisStep: [
                "checkout.steps.customer-details-step.customer-details-area.customer-details-fieldset.firstname",
                "checkout.steps.customer-details-step.customer-details-area.customer-details-fieldset.lastname",
                "checkout.steps.customer-details-step.customer-details-area.customer-details-fieldset.telephone",
                "checkout.steps.customer-details-step.customer-details-area.customer-details-fieldset.postcode"
            ],
            loginFormSelector: 'form[data-role=email-with-possible-login]'
        },

        isVisible: ko.observable(true),

        initialize: function () {
            this._super();
            var fieldsetName = 'checkout.steps.customer-details-step.customer-details-area.customer-details-fieldset';

            stepNavigator.registerStep(
                this.stepCode,
                null,
                this.stepTitle,
                this.isVisible,
                _.bind(this.navigate, this),
                this.sortOrder
            );

            // sync the data checkoutData local storage
            registry.async('checkoutProvider')(function (checkoutProvider) {
                var shippingAddressData = checkoutData.getShippingAddressFromData();

                if (shippingAddressData) {
                    checkoutProvider.set(
                        'shippingAddress',
                        $.extend(true, {}, checkoutProvider.get('shippingAddress'), shippingAddressData)
                    );
                }
                checkoutProvider.on('shippingAddress', function (shippingAddrsData, changes) {
                    var isPostcodeNotEmpty = shippingAddrsData.postcode && !_.isEmpty(shippingAddrsData.postcode);

                    if (isPostcodeNotEmpty) {
                        checkoutData.setShippingAddressFromData(shippingAddrsData);
                    }
                });
                shippingRatesValidator.initFields(fieldsetName);
            });

            return this;
        },

        navigate: function () {
            this.isVisible(true);
        },

        navigateToNextStep: function () {
            if (!this.hasInvalidFields() && this.isCustomerEmailValid()) {
                /*var address = quote.shippingAddress();
                address.trigger_reload = new Date().getTime();
                rateRegistry.set(address.getKey(), null);
                rateRegistry.set(address.getCacheKey(), null);
                quote.shippingAddress(address);*/

                // reload shipping method
                checkoutDataResolver.resolveShippingAddress();
                stepNavigator.next();
            }
        },

        hasInvalidFields: function () {
            var result = false;
            _.each(this.fieldComponentsOfThisStep, function ($nextElementName) {
                var nextUiElement = registry.get($nextElementName);
                if (nextUiElement) {
                    var validationResult = nextUiElement.validate();
                    if (!validationResult.valid) {
                        result = true;
                    }
                }
            });

            return result;
        },

        isCustomerEmailValid: function () {
            var emailValidationResult = customer.isLoggedIn();

            if (!customer.isLoggedIn()) {
                $(this.loginFormSelector).validation();
                emailValidationResult = Boolean($(this.loginFormSelector + ' input[name=username]').valid());
            }

            return emailValidationResult;
        },
    });
});
