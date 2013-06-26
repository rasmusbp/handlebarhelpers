$(function () {

	var data = {
		items: [
			'Milk',
			'Egg',
			'Butter',
			'Knife',
			'Fork',
			'Spoon'
		]
	};

	// Helper: every
	var helperEvery = {
		render: function ( options ) {
			var tpl = Handlebars.compile( $(options.tpl).html() );
			$(options.el).html( tpl( data ));
		}
	};

	// Helper: log
	var helperLog = {	
		render: function ( options ) {
			var tpl = Handlebars.compile( $(options.tpl).html() );
			$(options.el).html( tpl( data ) );
		}
	};

	// render'em
	helperEvery.render({
		el: '.every-target',
		tpl: '#everyTpl'
	});
	helperLog.render({
		el: '.log-target',
		tpl: '#logTpl'
	});

});