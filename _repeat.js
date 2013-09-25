/**
 * ***** REPEAT ****
 * ================= 
 * Iteration helper
 * 
 * 
 * See https://github.com/rasmusbp/handlebarhelpers for documentation
 *
 * @param times {Integer} how many loops
 * @param options {Object} pass in an offset to the index
 * 
 * @author Rasmus Bangsted Pedersen
 */
repeat: function(){
    Handlebars.registerHelper('repeat', function( numberOfTimes, options ) {
      var fn = options.fn, 
      	  inverse = options.inverse,
      	  offset = options.hash.offset ? options.hash.offset : 0,
      	  buffer = '';

      for(var i=offset; i <= numberOfTimes; i++){
          buffer += fn(options[i]);
      }
      return buffer;
    });
}