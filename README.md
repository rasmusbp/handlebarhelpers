#Handlebars helpers
A collection of useful helpers

##_every.js

Iteration helper
Iterates through an array and adds CSS helper classes and index indicator


You can pass in two optional options to the helper function:
* **group**
Let's you specify a segment within the dataset
* **prefix**
Let's you prefix all the CSS classes with a "namespace". Use this to avoid style conflicts.

The helper always returns the following properties along with original data:

* **_index**
Index position of iteration

* **_child**
CSS helper classes indicating the position in list: 
"odd", "even", "first-child" and "last-child".

And if a "group" option is passed to the helper, these properties will be returned as well:
      
* **_group**
CSS helper classes that adds the ability to divide output into 
segments. Adds the following classes based on current position:
group[n]", "first-group-item" and "last-group-item"

* **_groupId**
Same as _group, but containing only the group ID.

* **_firstGroupItem**
Boolean indicating if the iteration is positioned on the first item 
within a group. Useful if you need to add conditional markup or CSS classes.

* **_lastGroupItem**
Same principle as _firstGroupItem.

###Usage

####Data
```js
var items = [
    "Milk",
    "Egg",
    "Butter",
    "Knife",
    "Fork",
    "Spoon"
];
```

####Template
```html
<ul>
    {{#every items group="3" prefix="ns"}}
        <li class="{{_child}} {{_group}}">
            <p>{{.}}</p> 
        </li>
        {{#if _lastGroupItem}}
        <li data-group="{{_groupId}}" class="{{_child}} add-all">
             <a href="#">add all above items</a>
        </li>
        {{/if}}
    {{/every}}
</ul>
```

####Output
```html
<ul>
    <li class="ns-odd ns-first-child ns-group1 ns-first-group-item">
        <p>Milk</p>
    </li>
    <li class="ns-even ns-group1">
        <p>Egg</p>
    </li>
    <li class="ns-odd ns-group1 ns-last-group-item">
        <p>Butter</p>
    </li>
    <li data-group="ns-group1" class="ns-even add-all">
         <a href="#">add all above items</a>
    </li>
    
    <li class="ns-odd ns-group2 ns-first-group-item">
        <p>Knife</p>
    </li>
    <li class="ns-even ns-group2">
        <p>Fork</p>
    </li>
    <li class="ns-odd ns-last-child ns-group2 ns-last-group-item">
        <p>Spoon</p>
    </li>
    <li data-group="ns-group2" class="add-all">
         <a href="#">add all above items</a>
    </li>
</ul>
```
