const assert = require('assert');

const Greetings = require("../greetings");


describe("the Greet Function", function() {
    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://root:pg123@localhost:5432/users';
    const pool = new Pool({
        connectionString
    });
    const INSERT_QUERY = "insert into users (name,counter) values ($1, 0)";

    beforeEach(async function() {
        await pool.query("delete from users");
    });
    describe("The getNames function", function() {
        it("should return 1 name from the database", async function() {

            await pool.query(INSERT_QUERY, ["Mecayle"]);

            const results = await pool.query("select name from users");

            assert.deepEqual([{ name: 'Mecayle' }], results.rows);

        });
        it("should return 3 names from the database", async function() {
            await pool.query(INSERT_QUERY, ["ammaar"]);
            await pool.query(INSERT_QUERY, ["mecayle"]);
            await pool.query(INSERT_QUERY, ["amirah"]);
            const results = await pool.query("select name from users");
            assert.deepEqual([{ name: "ammaar" }, { name: "mecayle" }, { name: "amirah" }], results.rows)
        });
        it("should return 5 names from the database", async function() {
            let greetFunction = Greetings();
            await pool.query(INSERT_QUERY, ["ammaar"]);
            await pool.query(INSERT_QUERY, ["mecayle"]);
            await pool.query(INSERT_QUERY, ["amirah"]);
            await pool.query(INSERT_QUERY, ["jody"]);
            await pool.query(INSERT_QUERY, ["kagiso"]);
            const results = await pool.query("select name from users");
            assert.deepEqual([{ name: "ammaar" }, { name: "mecayle" }, { name: "amirah" }, { name: "jody" }, { name: "kagiso" }], results.rows)
        });
    });
    describe("The eachNameCount function", function() {
        it("should return the counter for a specific name", async function() {
            let name = "Mimi"
            await pool.query(INSERT_QUERY, [name]);

            let results = await pool.query("select counter from users where name = $1", [name]);

            assert.deepEqual(0, results.rows[0].counter);

        });
        it("should return the counter for a specific name", async function() {
            let name = "Amirah"
            await pool.query(INSERT_QUERY, [name])
            let results = await pool.query("select counter from users where name = $1", [name]);

            assert.deepEqual(0, results.rows[0].counter)
        });
        it("should return the counter for a specific name", async function() {
            let name = "Jody"
            await pool.query(INSERT_QUERY, [name])
            let results = await pool.query("select counter from users where name = $1", [name]);

            assert.deepEqual(0, results.rows[0].counter)
        });
    });
    describe("The greet function", function() {
        it("should greet Mecayle in English", async function() {
            let greetFunction = Greetings();
            var valSelected = "English";
            var theName = "Mecayle";
            assert.equal(await greetFunction.greet(valSelected, theName), "Hello, Mecayle");
        });
        it("should greet Flora in Español", async function() {
            let greetFunction = Greetings();
            var valSelected = "Español";
            var theName = "Flora";
            assert.equal(await greetFunction.greet(valSelected, theName), "Hola, Flora");
        });
        it("should greet Sasuki in Japanese", async function() {
            let greetFunction = Greetings();
            var valSelected = "Japanese";
            var theName = "Sasuki";
            assert.equal(await greetFunction.greet(valSelected, theName), "Kon'nichiwa, Sasuki");
        });
    });
    describe("The counter function", function() {
        it("should return 3 ", async function() {
            await pool.query(INSERT_QUERY, ["candy"]);
            await pool.query(INSERT_QUERY, ["joy"]);
            await pool.query(INSERT_QUERY, ["honey"]);
            const results = await pool.query("select count(name) as counter from users");
            assert.deepEqual(3, results.rows[0].counter);
        });
        it("should return 4", async function() {
            let greetFunction = Greetings();
            await pool.query(INSERT_QUERY, ["candy"]);
            await pool.query(INSERT_QUERY, ["joy"]);
            await pool.query(INSERT_QUERY, ["honey"]);
            await pool.query(INSERT_QUERY, ["wilma"]);
            const results = await pool.query("select count(name) as counter from users");

            assert.deepEqual(4, results.rows[0].counter);
        });
        it("should return 1", async function() {
            let greetFunction = Greetings();
            await pool.query(INSERT_QUERY, ["candy"]);
            const results = await pool.query("select count(name) as counter from users");
            assert.deepEqual(1, results.rows[0].counter);
        });
    });
    // after(function() {
    //     pool.end();
    // })

});