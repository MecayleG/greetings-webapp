const express = require('express');

const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');

const flash = require('express-flash');

const session = require('express-session');

const Greetings = require("./greetings");

const app = express();

const greetings = Greetings();

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.engine('handlebars', exphbs({
    layoutsDir: './views/layouts'
}));

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.get('/', function(req, res) {
    res.render('index')
});

app.post('/greeting', function(req, res) {
    let radio = req.body.lang
    let name = req.body.string
    let flash = greetings.flashMessage(name)
    let getGreet = greetings.greet(radio, name)
    let count = greetings.counter();
    if (flash) {
        req.flash('info', 'enter a name');
    }
    res.render('index', {
        greet: getGreet,
        counter: count
    });
});

app.get('/greeted', function(req, res) {
    let allNames = greetings.getNames();
    res.render('actions', {
        name: allNames
    })
});

app.get('/counter/:username', function(req, res) {
    let users = req.params.username
    let count = greetings.getCount(users);
    res.render('people', {
        name: users,
        counter: count
    })
});

const PORT = process.env.PORT || 3020;

app.listen(PORT, function() {
    console.log('App starting on port', PORT);
});