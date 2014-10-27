define([
	'backbone',
	'models/Hardware',
],
function( Backbone, HardwareModel ) {
    'use strict';

    /**
     * ArduinoUno Model containing Arduino Uno specific properties and defaults
     *
     * @return
     */
	var ArduinoUno = HardwareModel.extend({

		// Need to update for separated inputs/outputs
		defaults: {
			type: "ArduinoUno",
			A0: 0,
			A1: 0,
			D9: 0,
			inputs: {
				A0: 0,
				A1: 0,
				A2: 0,
				A3: 0,
				A4: 0,
				A5: 0,
			},
			outputs: {
				D9: 0,
				D10: 0,
				D11: 0,
			},
		},

    });

	return ArduinoUno;
});
