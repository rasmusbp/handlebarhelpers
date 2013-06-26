/**
 * **** WHATIF ****
 * ================= 
 * 
 * A more "advanced" IF block helper.
 * Compares two values against operators.
 * This helper is based on the GIST by doginthehat: 
 * https://gist.github.com/doginthehat/1890659
 * 
 * See https://github.com/rasmusbp/handlebarhelpers for documentation
 * 
 * @param  {Object} data in given scope
 *
 * @author Rasmus Bangsted Pedersen
 */
Handlebars.registerHelper('whatif', function(x, y, options) {

	if (arguments.length < 3)
		throw new Error("Handlerbars Helper 'whatif' needs 2 parameters");

	var operator = options.hash.operator || "===";

	var operators = {
		'=='		:	function(x,y) { return x == y; },
		'==='		:	function(x,y) { return x === y; },
		'!='		:	function(x,y) { return x != y; },
		'<'			:	function(x,y) { return x < y; },
		'>'			:	function(x,y) { return x > y; },
		'<='		:	function(x,y) { return x <= y; },
		'>='		:	function(x,y) { return x >= y; },
		'typeof'	:	function(x,y) { return typeof x == y; },
		'x-longest'	:	function(x,y) {
							if (x.length && y.length) {
								return x.length > y.length;
							}
						},
		'y-longest'	:	function(x,y) {
							if (x.length && y.length) {
								return x.length < y.length;
							}
						},
		'equal'		:	function(x,y) {
							if (x.length && y.length) {
								return x.length === y.length;
							}
						}
	};

	if (!operators[operator])
		throw new Error("Handlerbars Helper 'whatif' doesn't know the operator "+operator);

	var result = operators[operator](x,y);

	if( result ) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}

});