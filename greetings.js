module.exports = function TheGreetFunction(pool) {

    //insert name into database and increment counter if name is entered again 
    async function addToDatabase(params) {
        const userName = params.name.toLowerCase();
        if (userName !== "") {
            const selectQuery = await pool.query('select name from users where lower(name)=lower($1)', [userName])
            if (selectQuery.rowCount === 0) {
                await pool.query('insert into users (name,counter) values ($1, 0)', [userName])
            }
            await pool.query('update users set counter=counter+1 where name=$1', [userName])
        }

    }
    // return the names from the database
    async function getNames() {
        const names = await pool.query(`select name from users`)
        return names.rows
    }
    // return the length of the how many names are entered
    async function counter() {
        const result = await pool.query(`select name from users`)
        return result.rowCount
    }
    // get counter of individual names
    async function eachNameCount(nameEntered) {
        const getCount = await pool.query(`select counter from users where name = $1`, [nameEntered])
        return getCount.rows[0].counter;
    }
    // }

    // Get input from user and greet in language selected
    function greet(langSelected, theName) {
        let greet;

        if (!langSelected || !theName) {
            return "";
        }
        if (langSelected === "English") {
            greet = "Hello, " + theName
        } else if (langSelected === "Español") {
            greet = "Hola, " + theName
        } else if (langSelected === "Japanese") {
            greet = "Kon'nichiwa, " + theName
        }
        return greet;
    }

    // used for initiating flash message in index.js
    function flashMessage(input) {
        if (input === "") {
            return "enter a name"
        }
    }
    //to clear the database
    async function reset() {
        await pool.query(`delete from users`);

    }

    return {
        addToDatabase,
        eachNameCount,
        getNames,
        greet,
        flashMessage,
        counter,
        reset
    }
}