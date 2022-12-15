define([
    'ko',
    'uiComponent',
    'underscore',
    'Magento_Checkout/js/model/step-navigator'
], function(ko, Component, _, stepNavigator) {
    'use strict';
    return Component.extend({
        defaults: {
            sortOrder: 10,
            stepCode: 'customer-details-step',
            stepTitle: 'Details'
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
            stepNavigator.next();
        }
    });
});
