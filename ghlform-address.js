<script>
    function initAutocomplete() {
        var addressInput = document.getElementById('address');
        var cityInput = document.getElementById('city');
        var stateInput = document.getElementById('state');
        var postalCodeInput = document.getElementById('postal_code');

        function setupAutocomplete() {
            var autocomplete = new google.maps.places.Autocomplete(addressInput);

            // Disable autocomplete after an address is selected
            autocomplete.addListener('place_changed', function() {
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    console.error("Autocomplete's returned place contains no geometry");
                    return;
                }

                // Set address, city, state, and postal code values with an extra space
                addressInput.value = '';
                place.address_components.forEach(function(component) {
                    if (component.types.includes('street_number') || component.types.includes('route')) {
                        addressInput.value += component.long_name + ' ';
                    } else if (component.types.includes('locality')) {
                        cityInput.value = component.long_name + ' ';
                    } else if (component.types.includes('administrative_area_level_1')) {
                        stateInput.value = component.long_name + ' ';
                    } else if (component.types.includes('postal_code')) {
                        postalCodeInput.value = component.long_name + ' ';
                    }
                });

                // Clear autocomplete predictions
                clearAutocompletePredictions(addressInput);

                // Trigger input event on each input field to simulate manual input
                ['input', 'change'].forEach(function(eventType) {
                    var inputEvent = new Event(eventType, {
                        bubbles: true,
                        cancelable: true,
                    });
                    addressInput.dispatchEvent(inputEvent);
                    cityInput.dispatchEvent(inputEvent);
                    stateInput.dispatchEvent(inputEvent);
                    postalCodeInput.dispatchEvent(inputEvent);
                });

                // Reinitialize autocomplete for the address input
                setupAutocomplete();
            });
        }

        // Initialize autocomplete
        setupAutocomplete();
    }

    // Function to clear autocomplete predictions
    function clearAutocompletePredictions(input) {
        var container = document.querySelector('.pac-container');
        if (container) {
            container.parentNode.removeChild(container);
        }
    }
</script>
