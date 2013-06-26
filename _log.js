/**
 * ****** LOG ******
 * ================= 
 * A simple log helper.
 * Enables console logging of data
 * See https://github.com/rasmusbp/handlebarhelpers for documentation
 * 
 * @param  {Object} data in given scope
 *
 * @author Rasmus Bangsted Pedersen
 */
Handlebars.registerHelper('log', function(arg) {
  console.log(arg);
});
