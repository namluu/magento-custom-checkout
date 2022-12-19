<?php
namespace Lounge\CheckoutRedesign\Plugin;

class LayoutProcessorPlugin
{
    public function afterProcess(\Magento\Checkout\Block\Checkout\LayoutProcessorInterface $layoutProcessor, $jsLayout)
    {
        /*
         * Let's remove the customer Email from the shipping step.
         */
        unset($jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']
            ['children']['shippingAddress']['children']['customer-email']);
            
        $jsLayout = $this->moveFromTheShippingStepToTheFirstStep($jsLayout, 'firstname', ['sortOrder' => 10]);

        $jsLayout = $this->moveFromTheShippingStepToTheFirstStep($jsLayout, 'lastname', ['sortOrder' => 20]); 

        $jsLayout = $this->moveFromTheShippingStepToTheFirstStep($jsLayout, 'country_id', ['sortOrder' => 30]);

        $jsLayout = $this->moveFromTheShippingStepToTheFirstStep($jsLayout, 'region_id', ['sortOrder' => 40]);

        $jsLayout = $this->moveFromTheShippingStepToTheFirstStep($jsLayout, 'city', ['sortOrder' => 50]);

        $jsLayout = $this->moveFromTheShippingStepToTheFirstStep($jsLayout, 'postcode', ['sortOrder' => 60]);

        $jsLayout = $this->moveFromTheShippingStepToTheFirstStep($jsLayout, 'telephone', [
            'sortOrder' => 70,
            'placeholder' => 'e.g. 0444333444',
            'validation' => [
                'required-entry' => true,
                'phoneAU' => true
            ]
        ]);

        $jsLayout = $this->removeFromTheShippingStep($jsLayout, 'company');
        
        $jsLayout = $this->removeFromTheShippingStep($jsLayout, 'street');

        return $jsLayout;
    }
    

    private function moveFromTheShippingStepToTheFirstStep(array $jsLayout, string $keyInLayout, array $additionalSettings): array 
    {
        if (isset($jsLayout['components']['checkout']['children']['steps']['children']['customer-details-step']
            ['children']['customer-details-area']['children']['customer-details-fieldset']['children'][$keyInLayout])
        ) {
            if (isset($jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']
                ['children']['shippingAddress']['children']['shipping-address-fieldset']['children'][$keyInLayout])
            ) {
                $shippingStepSettings = $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']
                ['children']['shippingAddress']['children']['shipping-address-fieldset']['children'][$keyInLayout];

                unset($jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']
                    ['shippingAddress']['children']['shipping-address-fieldset']['children'][$keyInLayout]);
            } else {
                $shippingStepSettings = [];
            }

            $detailsStepSettings = $jsLayout['components']['checkout']['children']['steps']['children']['customer-details-step']
            ['children']['customer-details-area']['children']['customer-details-fieldset']['children'][$keyInLayout];

            $jsLayout['components']['checkout']['children']['steps']['children']['customer-details-step']
            ['children']['customer-details-area']['children']['customer-details-fieldset']['children'][$keyInLayout] =
                array_replace_recursive(
                    $shippingStepSettings,
                    $detailsStepSettings,
                    $additionalSettings
                );
        }
        
        return $jsLayout;
    }
    
    private function removeFromTheShippingStep(array $jsLayout, string $keyInLayout): array
    {
        if (isset($jsLayout["components"]["checkout"]["children"]["steps"]["children"]["shipping-step"]["children"]
            ["shippingAddress"]["children"]["shipping-address-fieldset"]["children"][$keyInLayout]['config']['template'])
        ) {
            $jsLayout["components"]["checkout"]["children"]["steps"]["children"]["shipping-step"]["children"]
            ["shippingAddress"]["children"]["shipping-address-fieldset"]["children"][$keyInLayout]['config']['template']  = '';
        }
        
        return $jsLayout;
    }
}
