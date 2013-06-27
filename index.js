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
module.exports = function(SubClass, ParentClass) {
    function F() {};
    F.prototype = ParentClass.prototype;
    SubClass.prototype = new F();
    SubClass.prototype.constructor = SubClass;
    SubClass.superclass = ParentClass.prototype;
    SubClass.superconstructor = ParentClass;
    return SubClass;
};
