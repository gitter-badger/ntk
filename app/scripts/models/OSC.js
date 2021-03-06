define([
	'backbone',
	'models/Hardware',
],
function( Backbone, HardwareModel ) {
    'use strict';

    /**
     * OSC Model containing OSC specific properties and defaults
     *
     * @return
     */
	var OSC = HardwareModel.extend({

		initialize: function initialize() {
			window.app.vent.on('Widget:hardwareSwitch', function(options) {
				if(options.deviceType == this.get('type') ) {
					if(options.hasInput === false) {
						if(this.get('outputs')[options.port] == undefined) {
							this.get('outputs')[options.port] = 0;
						}
					}
					else if(options.hasInput === true) {
						if(this.get('inputs')[options.port] == undefined) {
							this.get('inputs')[options.port] = 0;
							this.set(options.port, 0);
						}
					}
				}
			}.bind(this));
		},
		defaults: {
			type: "OSC",
			inputs: {
				'/ntk/in/1': 0,
			},
			outputs: {
				'/ntk/out/1:127.0.0.1:57120': 0,
			},
			'/ntk/in/1': 0,
			'/ntk/out/1:127.0.0.1:57120': 0,
		},

    });

	return OSC;
});
