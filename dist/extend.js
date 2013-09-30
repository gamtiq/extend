
(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory(require, exports, module);
    }
    else if(typeof define === 'function' && define.amd) {
        define(['require', 'exports', 'module'], factory);
    }
    else {
        var req = function(id) {return root[id];},
            exp = root,
            mod = {exports: exp};
        root.extend = factory(req, exp, mod);
    }
}(this, function(require, exports, module) {
/**
 * @module extend 
 */

/**
 * Inherit one class (constructor function) from another by using prototype inheritance.
 * Based on <code>extend</code> method from YUI library.
 * <br>
 * Set the following static fields for child class:
 * <ul>
 * <li><code>superconstructor</code> - reference to parent class
 * <li><code>superclass</code> - reference to <code>prototype</code> of parent class
 * </ul>
 *
 * @param {Function} SubClass
 *      Child class that will inherit.
 * @param {Function} ParentClass
 *      Parent class.
 * @return {Function}
 *      Modified child class.
 */
function extend(SubClass, ParentClass) {
    "use strict";
    function F() {}
    F.prototype = ParentClass.prototype;
    SubClass.prototype = new F();
    SubClass.prototype.constructor = SubClass;
    SubClass.superclass = ParentClass.prototype;
    SubClass.superconstructor = ParentClass;
    return SubClass;
}

/**
 * Test whether the specified class is inherited from another.
 *
 * @param {Function} subClass 
 *      The class that should be tested.
 * @param {Function} parentClass 
 *      The parent class.
 * @return {Boolean}
 *      <code>true</code>, if <code>subClass</code> is inherited from <code>parentClass</code>, 
 *      otherwise <code>false</code>.
 * @author Denis Sikuler
 * @see suifw#extend
 */
extend.isSubclass = function isSubclass(subClass, parentClass) {
    "use strict";
    if (typeof parentClass === "function" && typeof subClass === "function") {
        var superClass = subClass;
        while (superClass = superClass.superconstructor) {
            if (superClass === parentClass) {
                return true;
            }
        }
    }
    return false;
};

// Exports

module.exports = extend;

    return extend;
}));
