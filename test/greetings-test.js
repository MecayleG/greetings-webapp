const assert = require('assert');

const Greetings = require("../greetings");


describe("the Greet Function", function() {
    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://root:pg123@localhost:5432/users';
    const pool = new Pool({
        connectionString
    });
    const INSERT_QUERY = "insert into users (name,counter) values ($1, 1)";

    beforeEach(async function() {
        await pool.query("delete from users");
    });
    it("getNames function should return the names entered from the database", async function() {
        let greetFunction = Greetings();
        await pool.query(INSERT_QUERY, ["Ammaar"]);
        assert.equal(await greetFunction.getNames(), [{ name: "ammaar" }])
    });
    it("eachNameCount function should return the counter for a specific name", async function() {
        let greetFunction = Greetings();
        let name = "Mecayle"
        await greetFunction.addToDatabase(name)
        assert.equal(await greetFunction.eachNameCount(name), 1)
    });
    it("greet function should greet Mecayle in English", async function() {
        let greetFunction = Greetings();
        var valSelected = "English";
        var theName = "Mecayle";
        assert.equal(await greetFunction.greet(valSelected, theName), "Hello, Mecayle");
    });
    it("greet function should greet Flora in Español", async function() {
        let greetFunction = Greetings();
        var valSelected = "Español";
        var theName = "Flora";
        assert.equal(await greetFunction.greet(valSelected, theName), "Hola, Flora");
    });
    it("greet function should greet Sasuki in Japanese", async function() {
        let greetFunction = Greetings();
        var valSelected = "Japanese";
        var theName = "Sasuki";
        assert.equal(await greetFunction.greet(valSelected, theName), "Kon'nichiwa, Sasuki");
    });
    it("counter function should return how many names have been entered", async function() {
        let greetFunction = Greetings();
        await pool.query(INSERT_QUERY, ["candy"]);
        await pool.query(INSERT_QUERY, ["joy"]);
        await pool.query(INSERT_QUERY, ["honey"]);

        assert.deepEqual(await greetFunction.counter(), 3);
    });
    after(function() {
        pool.end();
    })

});