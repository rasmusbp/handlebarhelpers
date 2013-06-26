 /**
  * ***** EVERY *****
  * ================= 
  * Iteration helper
  * Iterates through an array and adds CSS helper classes and index indicator
  * Returns the following properties:
  *
  * _index              : Index position of iteration
  * 
  * _child              : CSS helper classes indicating the position in list: 
  *                       "odd", "even", "first-child" and "last-child".
  *                       The odd/even classes can be overriden via the options.hash object.
  *          
  * _group              : (optional) CSS helper classes that add the ability to divide the iteration into 
  *                       segments. Adds the following classes based on current position:
  *                       group[n]", "first-group-item" and "last-group-item"
  *
  * _groupId            : (optional) Same as _group, but only containing the group ID.
  * 
  *
  * _firstGroupItem     : (optional) Boolean indicating if the iteration is positioned on the first item 
  *                       within a group. Useful if you need to add conditional markup or CSS classes.
  *
  * _lastGroupItem      : (optional) Same principle as _firstGroupItem.
  * 
  * 
  * _______________
  * USAGE:
  * 
  * ==== Data: ====
  * var items = [
  *     "Milk",
  *     "Egg",
  *     "Butter",
  *     "Knife",
  *     "Fork",
  *     "Spoon"
  * ];
  * 
  * ==== Template: ====
  * <ul>
  *     {{#every items group="3"}}
  *         <li class="{{_child}} {{_group}}">
  *             <p>{{.}}</p> 
  *         </li>
  *         {{#if _lastGroupItem}}
  *         <li class="{{_child}} {{_groupId}} add-all">
  *              <a href="#">add all above items</a>
  *         </li>
  *         {{/if}}
  *     {{/every}}
  * </ul>
  * 
  *
  * ==== Output: ====
  * <ul>
  *     <li class="odd first-child group1 first-group-item">
  *         <p>Milk</p>
  *     </li>
  *     <li class="even group1">
  *         <p>Egg</p>
  *     </li>
  *     <li class="odd group1 last-group-item">
  *         <p>Butter</p>
  *     </li>
  *     <li class="even group1 add-all">
  *          <a href="#">add all above items</a>
  *     </li>
  *     
  *     <li class="odd group2 first-group-item">
  *         <p>Knife</p>
  *     </li>
  *     <li class="even group2">
  *         <p>Fork</p>
  *     </li>
  *     <li class="odd group2 last-group-item">
  *         <p>Spoon</p>
  *     </li>
  *     <li class="even group2 last-child add-all">
  *          <a href="#">add all above items</a>
  *     </li>
  * </ul>
  *
  * @param array {Array} data set to iterate through
  * @param options {Object} Override the "odd/even" classes or add a group
  * 
  * @author Rasmus Bangsted Pedersen
  */
 Handlebars.registerHelper('every', function(array, options, elseFn) {

    if (array && array.length > 0) {

        var buffer = "",
            group = options.hash.group ? parseFloat(options.hash.group, 10) : false,
            even = options.hash.even || 'even',
            odd = options.hash.odd || 'odd';

        for (var i = 0, j = array.length; i < j; i++) {

            var item = array[i];

            // Add child indicators
            if ( i === 0 ) {
                item._child = (i % 2 === 0 ? even + ' first-child' : odd + ' first-child');
            } else if ( i+1 === j ) {
                item._child = (i % 2 === 0 ? even + ' last-child' : odd + ' last-child');
            } else {
                item._child = (i % 2 === 0 ? even : odd);
            }

            // Add group indicators
            if ( group ) {
                var groupNo = ((i)/group);
                if ( i === 0 ) {

                    // .. first group
                    this.currentGroup = "group1";
                    item._group = "group1 first-group-item";
                    item._groupId = "group1";
                    item._firstGroupItem = true;
                } else if ( groupNo%1 === 0 ) {

                    // .. following groups
                    this.currentGroup = "group" + (groupNo + 1);
                    item._group = this.currentGroup  + " first-group-item";
                    item._groupId = this.currentGroup;
                    item._firstGroupItem = true;

                } else if ( ((i+1)/group)%1 === 0 ) {

                    // .. last item in group
                    item._group = this.currentGroup  + " last-group-item";
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
        // return the finished buffer 
        return buffer;
    } else {
        return false;
    }
});