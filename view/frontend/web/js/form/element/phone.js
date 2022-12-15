define([
    'Magento_Ui/js/form/element/abstract',
    'jquery'
], function (Element, $) {
    'use strict';

    return Element.extend({
        defaults: {
            listens: {
                focused: 'isFocused'
            },
        },

        /**
         * Invokes initialize method of parent class,
         * contains initialization logic
         */
        initialize: function () {
            this._super();

            return this;
        },

        isFocused: function (isFocusedInput) {
            if (!isFocusedInput) {
                this.validate();
            }
        },

        /**
         * Callback that fires when 'value' property is updated.
         */
        onUpdate: function () {
            this.bubble('update', this.hasChanged());

            if (this.value() && this.value().replace(/[\s-]/g, '').match(/^\d{10}$/)) {
                this.validate();
            }
        },
    });
});

