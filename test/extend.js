"use strict";
/*global chai, describe, it, window*/

// Tests for extend
describe("extend", function() {
    var expect, extend;
    
    // node
    if (typeof chai === "undefined") {
        extend = require("../index.js");
        expect = require("./lib/chai").expect;
    }
    // browser
    else {
        extend = window.extend;
        expect = chai.expect;
    }
    
    
    // Class A (root)
    function A(name, value) {
        this.id = A.nextId++;
        if (name) {
            this.name = name;
        }
        if (value) {
            this.value = value;
        }
    }
    
    A.nextId = 1;
    
    A.className = A.prototype.className = "A";
    
    A.prototype.name = "unknown";
    
    A.prototype.value = null;
    
    A.prototype.getInheritanceChain = function() {
        return A.className;
    };
    
    A.prototype.getTime = function() {
        return new Date().getTime();
    };
    
    A.prototype.toString = function() {
        return [
                this.className, 
                "[",
                this.id, 
                ", ",
                this.name,
                "]; inheritance: ",
                this.getInheritanceChain()
                ].join("");
    };
    
    // Class B (extends A)
    function B() {
        B.superconstructor.apply(this, arguments);
    }
    extend(B, A);
    
    B.className = B.prototype.className = "B";
    
    B.prototype.value = "none";
    
    B.prototype.getInheritanceChain = function() {
        return B.superclass.getInheritanceChain.call(this) + " <- " + B.className;
    };
    
    // Class C (extends A)
    function C() {
        C.superconstructor.apply(this, arguments);
    }
    extend(C, A);
    
    C.className = C.prototype.className = "C";
    
    C.prototype.value = "no";
    
    C.prototype.methodC = function() {
        return this;
    };
    
    C.prototype.getInheritanceChain = function() {
        return C.superclass.getInheritanceChain.call(this) + " <- " + C.className;
    };
    
    // Class SubC (extends C)
    function SubC() {
        SubC.superconstructor.apply(this, arguments);
    }
    extend(SubC, C);
    
    SubC.className = SubC.prototype.className = "SubC";
    
    SubC.prototype.getInheritanceChain = function() {
        return SubC.superclass.getInheritanceChain.call(this) + " <- " + SubC.className;
    };
    
    
    // Tests
    
    describe("simple inheritance", function() {
        var objB = new B("b"),
            objC = new C("c", "c value"),
            objSubC = new SubC();
        
        it("instanceof should work", function() {
            expect(objB instanceof B)
                .equal(true);
            expect(objB instanceof A)
                .equal(true);
            
            expect(objC instanceof C)
                .equal(true);
            expect(objC instanceof A)
                .equal(true);
            
            expect(objSubC instanceof SubC)
                .equal(true);
            expect(objSubC instanceof C)
                .equal(true);
            expect(objSubC instanceof A)
                .equal(true);
        });
        
        it("object should have properties that are defined in superclass", function() {
            expect(objB)
                .have.ownProperty("id")
                .have.ownProperty("name")
                .respondTo("getInheritanceChain")
                .respondTo("getTime")
                .have.property("value", "none")
                .not   // Negates any of assertions following in the chain
                .have.ownProperty("value")
                .have.ownProperty("getInheritanceChain")
                .have.ownProperty("getTime");
            expect(objB.id)
                .a("number")
                .above(0);
            expect(objB.name)
                .a("string")
                .equal("b");
            expect(objB.toString())
                .equal("B[" + objB.id + ", b]; inheritance: A <- B");
            
            expect(objC)
                .have.ownProperty("id")
                .have.ownProperty("name")
                .have.ownProperty("value")
                .respondTo("getInheritanceChain")
                .respondTo("getTime")
                .not   // Negates any of assertions following in the chain
                .have.ownProperty("getInheritanceChain")
                .have.ownProperty("getTime");
            expect(objC.id)
                .a("number")
                .above(0);
            expect(objC.name)
                .a("string")
                .equal("c");
            expect(objC.value)
                .a("string")
                .equal("c value");
            expect(objC.toString())
                .equal("C[" + objC.id + ", c]; inheritance: A <- C");
            
            expect(objSubC)
                .have.ownProperty("id")
                .respondTo("getInheritanceChain")
                .respondTo("getTime")
                .respondTo("methodC")
                .have.property("value", "no")
                .not   // Negates any of assertions following in the chain
                .have.ownProperty("name")
                .have.ownProperty("value")
                .have.ownProperty("getInheritanceChain")
                .have.ownProperty("getTime")
                .have.ownProperty("methodC");
            expect(objSubC.id)
                .a("number")
                .above(0);
            expect(objSubC.name)
                .a("string")
                .equal("unknown");
            expect(objSubC.toString())
                .equal("SubC[" + objSubC.id + ", unknown]; inheritance: A <- C <- SubC");
        });
    });
    
    describe(".isSubclass", function() {
        function D() {
        }
        extend(D, B);
        
        var isSubclass = extend.isSubclass;
        
        it("should be subclass", function() {
            expect( isSubclass(B, A) )
                .equal(true);
            expect( isSubclass(C, A) )
                .equal(true);
            expect( isSubclass(D, A) )
                .equal(true);
            expect( isSubclass(D, B) )
                .equal(true);
        });
        it("should not be subclass", function() {
            expect( isSubclass(A, B) )
                .equal(false);
            expect( isSubclass(A, C) )
                .equal(false);
            expect( isSubclass(B, C) )
                .equal(false);
            expect( isSubclass(C, B) )
                .equal(false);
            expect( isSubclass(B, D) )
                .equal(false);
            expect( isSubclass(C, D) )
                .equal(false);
            expect( isSubclass(D, C) )
                .equal(false);
        });
    });
});
