 /**
  * ***** EVERY *****
  * ================= 
  * Iteration helper
  * Iterates through an array and adds CSS helper classes and index indicator
  * 
  * See https://github.com/rasmusbp/handlebarhelpers for documentation
  *
  * @param array {Array} data set to iterate through
  * @param options {Object} pass in a "group" or "prefix" option
  * 
  * @author Rasmus Bangsted Pedersen
  */
 Handlebars.registerHelper('every', function(array, options, elseFn) {

    if (array && array.length > 0) {

        var buffer  = '',
            group   = options.hash.group ? parseFloat(options.hash.group, 10) : false,
            prefix  = options.hash.prefix || false,
            // class names:
            odd             = prefix ? prefix + '-odd' : 'odd',
            even            = prefix ? prefix + '-even' : 'even',
            firstChild      = prefix ? prefix + '-first-child' : 'first-child',
            lastChild       = prefix ? prefix + '-last-child' : 'last-child',
            groupClass      = prefix ? prefix + '-group' : 'group',
            firstGroupItem  = prefix ? prefix + '-first-group-item' : 'first-group-item',
            lastGroupItem   = prefix ? prefix + '-last-group-item' : 'last-group-item';
     
        for (var i = 0, j = array.length; i < j; i++) {

            var item = array[i];

            // Prepare data object (by doing this the helper can support and array of strings and/or objects)
            if ( typeof item !== 'object' ) {
              var data = item;
              item = {};
              item.data = data;
            } else {
              item.data = item;
            }

            // Add child indicators
            if ( i === 0 ) {
                item._child = (i % 2 === 0 ? even + ' ' + firstChild : odd + ' ' + firstChild);
            } else if ( i+1 === j ) {
                item._child = (i % 2 === 0 ? even + ' ' + lastChild : odd + ' ' + lastChild);
            } else {
                item._child = (i % 2 === 0 ? even : odd);
            }

            // Add group indicators
            if ( group ) {
                var groupNo = ((i)/group);
                if ( i === 0 ) {

                    // .. first group
                    this.currentGroup = groupClass + '1';
                    item._group = this.currentGroup + ' ' + firstGroupItem;
                    item._groupId = this.currentGroup;
                    item._firstGroupItem = true;

                } else if ( groupNo%1 === 0 ) {

                    // .. following groups
                    this.currentGroup = groupClass + (groupNo + 1);
                    item._group = this.currentGroup  + ' ' + firstGroupItem;
                    item._groupId = this.currentGroup;
                    item._firstGroupItem = true;

                } else if ( ((i+1)/group)%1 === 0 ) {

                    // .. last item in group
                    item._group = this.currentGroup  + ' ' + lastGroupItem;
                    item._groupId = this.currentGroup;
                    item._lastGroupItem = true;

                } else {

                    // .. items inside group
                    item._groupId = this.currentGroup;
                    item._group = this.currentGroup;
                }
            }

            // Add index indicator
            item.index = i;

            // Add to buffer
            buffer += options.fn(item);

        }

        // delete temp currentGroup property
        delete this.currentGroup;

        // return the finished buffer 
        return buffer;
    } else {
        return false;
    }
});
