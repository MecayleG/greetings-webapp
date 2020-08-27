module.exports = function TheGreetFunction() {
    let greetObject = {};

    // return the keys of the object
    function getNames() {
        return Object.keys(greetObject);
    }
    // used for initiating flash message in index.js
    function flashMessage(input) {
        if (input === "") {
            return "enter a name"
        }
    }

    // Get input from user and greet in language selected
    function greet(langSelected, theName) {
        let greet;

        if (!langSelected || !theName) {
            return "";
        }
        namesStored(theName)

        if (langSelected === "English") {
            greet = "Hello, " + theName
        } else if (langSelected === "Español") {
            greet = "Hola, " + theName
        } else if (langSelected === "Japanese") {
            greet = "Kon'nichiwa, " + theName
        }
        return greet;
    }

    // if username is not empty increment each name by 1
    function namesStored(name) {
        if (name !== "") {
            const userName = name.toUpperCase();
            if (greetObject[userName] === undefined) {
                greetObject[userName] = 0
            }
            greetObject[userName]++
        }
    }

    // return how many times the name was entered(value)
    function getCount(value) {
        return greetObject[value.toUpperCase()]
    }

    // return the length of the how many names are entered
    function counter() {
        let count = Object.keys(greetObject)
        return count.length;
    }
    return {
        getNames,
        flashMessage,
        greet,
        namesStored,
        getCount,
        counter
    }
}