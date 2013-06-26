#Handlebars helpers
A collection of useful helpers

##_every

Iteration helper
Iterates through an array and adds CSS helper classes and index indicator
Returns the following properties along with original data:

* **_index**
Index position of iteration

* **_child**
CSS helper classes indicating the position in list: 
"odd", "even", "first-child" and "last-child".
The odd/even classes can be overriden via the options.hash object.
         
* **_group**
(optional) CSS helper classes that add the ability to divide the iteration into 
segments. Adds the following classes based on current position:
group[n]", "first-group-item" and "last-group-item"

* **_groupId**
(optional) Same as _group, but only containing the group ID.

* **_firstGroupItem**
(optional) Boolean indicating if the iteration is positioned on the first item 
within a group. Useful if you need to add conditional markup or CSS classes.

* **_lastGroupItem**
(optional) Same principle as _firstGroupItem.

You can pass in two types of options to the helper function:
* **group**
Let's you specify a segment within the dataset
* **prefix**
Let's you prefix all the CSS classes with a "namespace"


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
    <li class="ns-odd ns-group2 ns-last-group-item">
        <p>Spoon</p>
    </li>
    <li data-group="ns-group2" class="ns-even ns-last-child add-all">
         <a href="#">add all above items</a>
    </li>
</ul>
```
