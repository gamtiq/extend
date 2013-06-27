# extend

Make one class (constructor function) inherited from another.

Based on [extend](http://yuilibrary.com/yui/docs/api/classes/YUI.html#method_extend) method from [YUI library](http://yuilibrary.com).

## Installation

### Component

Install component:

    npm install -g component

Then:

    component install gamtiq/extend

## Usage

```js

    var extend = require("extend");
    ...
    var SuperClass = function(a, b) {
        ...
    };
    SuperClass.prototype.method1 = function(c, d, e) {
        ...
    };
    ...
    var SubClass = function(a, b) {
        ...
        SubClass.superconstructor.call(this, a, b);
        // or
        // SubClass.superconstructor.apply(this, arguments);
        ...
    };
    extend(SubClass, SuperClass);
    ...
    SubClass.prototype.method1 = function(c, d, e) {
        ...
        SubClass.superclass.method1.call(this, c, d, e);
        // or
        // SubClass.superclass.method1.apply(this, arguments);
        ...
    };
```

## API

### extend(SubClass: Function, ParentClass: Function): Function

Replace value of `prototype` field of `SubClass` by another object that inherits from `prototype` of `ParentClass`.

Returns `SubClass`.

## Licence

MIT
