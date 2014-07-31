define([
	'backbone',
	'views/item/WidgetMulti',
	'text!tmpl/CustomFilterMulti_tmpl.js',

	'codemirror',
],
function(Backbone, WidgetView, Template, CodeMirror){
    'use strict';

	return WidgetView.extend({
		ins: [
			{name: 'one', fieldMap: 'inOne'},
			{name: 'two', fieldMap: 'inTwo'},
		],
		outs: [
			{name: 'output', fieldMap: 'outOne'},
		],
		className: 'customFilterMulti',
		template: _.template(Template),

		initialize: function(options) {
			if(!options) {
				options = {};
			}
			_.extend(options, {
				filter: "return {outOne: inputs.one + inputs.two};",
				inOne: 2,
				inTwo: 3,
				outOne: 1,
			});
			// Call the superclass constructor
			WidgetView.prototype.initialize.call(this, options);
			this.model.set('title', 'Expression');
		},
        /**
         * called when widget is rendered
         *
         * @return
         */
		onRender: function() {
			WidgetView.prototype.onRender.call(this);

			this.registerFilters();

			var self = this;
			var codeEditor = CodeMirror.fromTextArea(this.$('.filterFunction')[0], {
				lineNumbers: true,
				smartIndent: true,
				mode: "javascript",
			});

			codeEditor.on('blur', function() {
				self.model.set('filter', codeEditor.getValue());
				self.registerFilters.apply(self);
			});

		},
		registerFilters: function() {
			this.signalChainFunctions.length = 0;
			this.signalChainFunctions.push(new Function("var inputs = arguments[0]; " + this.model.get('filter')));
		},
	});
});
