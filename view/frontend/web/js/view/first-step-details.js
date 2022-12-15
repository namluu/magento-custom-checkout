define([
    'ko',
    'uiComponent',
    'underscore',
    'Magento_Checkout/js/model/step-navigator',
    'uiRegistry'
], function(ko, Component, _, stepNavigator, registry) {
    'use strict';
    
    return Component.extend({
        defaults: {
            sortOrder: 10,
            stepCode: 'customer-details-step',
            stepTitle: 'Details',
            fieldComponentsOfThisStep: [
                "checkout.steps.customer-details-step.customer-details-area.customer-details-fieldset.firstname",
                "checkout.steps.customer-details-step.customer-details-area.customer-details-fieldset.lastname",
                "checkout.steps.customer-details-step.customer-details-area.customer-details-fieldset.telephone"
            ]
        },
        
        isVisible: ko.observable(true),
        
        initialize: function () {
            this._super();
            stepNavigator.registerStep(
                this.stepCode,
                null,
                this.stepTitle,
                this.isVisible,
                _.bind(this.navigate, this),
                this.sortOrder
            );
            return this;
        },
        
        navigate: function () {
            this.isVisible(true);
        },
        
        navigateToNextStep: function () {
            if (!this.hasInvalidFields()) stepNavigator.next();
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
        }
    });
});
