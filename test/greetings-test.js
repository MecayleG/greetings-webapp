const assert = require('assert');

const Greetings = require("../greetings");


describe("The Greetings Webapp", function() {
    describe("the getNames function", function() {
        it("should return the 2 names that has been entered", function() {
            let greetFunction = Greetings();
            greetFunction.namesStored('mecayle')
            greetFunction.namesStored('ammaar')

            assert.deepEqual(greetFunction.getNames(), ['MECAYLE', 'AMMAAR'])
        });
        it("should return the 3 names that has been entered", function() {
            let greetFunction = Greetings();
            greetFunction.namesStored('cassi')
            greetFunction.namesStored('stacey')
            greetFunction.namesStored('andy')

            assert.deepEqual(greetFunction.getNames(), ['CASSI', 'STACEY', 'ANDY'])
        });
        it("should return the 5 names that has been entered", function() {
            let greetFunction = Greetings();
            greetFunction.namesStored('mecayle')
            greetFunction.namesStored('leo')
            greetFunction.namesStored('andy')
            greetFunction.namesStored('liam')
            greetFunction.namesStored('ziyaad')

            assert.deepEqual(greetFunction.getNames(), ['MECAYLE', 'LEO', 'ANDY', 'LIAM', 'ZIYAAD'])
        });
    });
    describe("the langButton function", function() {
        it("should greet Mecayle in English", function() {
            let greetFunction = Greetings();
            var valSelected = "English";
            var theName = "Mecayle";
            assert.equal(greetFunction.greet(valSelected, theName), "Hello, Mecayle");
        });
        it("should greet Flora in Español", function() {
            let greetFunction = Greetings();
            var valSelected = "Español";
            var theName = "Flora";
            assert.equal(greetFunction.greet(valSelected, theName), "Hola, Flora");
        });
        it("should greet Sasuki in Japanese", function() {
            let greetFunction = Greetings();
            var valSelected = "Japanese";
            var theName = "Sasuki";
            assert.equal(greetFunction.greet(valSelected, theName), "Kon'nichiwa, Sasuki");
        });
    });
    describe("the counter function", function() {
        it("should show 3 names are in the object", function() {
            let greetFunction = Greetings();

            greetFunction.namesStored('mecayle')
            greetFunction.namesStored('me')
            greetFunction.namesStored('cayle')

            assert.deepEqual(greetFunction.counter(), 3);
        });
        it("should show 4 names are in the object", function() {
            let greetFunction = Greetings();

            greetFunction.namesStored('lila')
            greetFunction.namesStored('mecayle')
            greetFunction.namesStored('jan')
            greetFunction.namesStored('joe')

            assert.deepEqual(greetFunction.counter(), 4);
        });
        it("should show 6 names are in the object", function() {
            let greetFunction = Greetings();
            greetFunction.namesStored('lila')
            greetFunction.namesStored('likla')
            greetFunction.namesStored('jan')
            greetFunction.namesStored('mecayle')
            greetFunction.namesStored('jay')
            greetFunction.namesStored('kay')

            assert.deepEqual(greetFunction.counter(), 6);
        });
        it("should not increment if the name has already been entered", function() {
            let greetFunction = Greetings();
            greetFunction.namesStored('lila')
            greetFunction.namesStored('Lila')
            greetFunction.namesStored('likla')
            greetFunction.namesStored('jan')
            greetFunction.namesStored('mecayle')
            greetFunction.namesStored('jay')
            greetFunction.namesStored('kay')

            assert.deepEqual(greetFunction.counter(), 6);
        });
    });
});