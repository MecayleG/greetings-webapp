const express = require('express');

const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');

const flash = require('express-flash');

const session = require('express-session');

const Greetings = require("./greetings");

const app = express();
const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://root:pg123@localhost:5432/users';

const pool = new Pool({
    connectionString
});


const greetings = Greetings(pool);

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

app.get('/', async function(req, res) {
    let count = await greetings.counter();
    res.render('index', {
        counter: count
    })
});

app.post('/greeting', async function(req, res) {
    let radio = req.body.lang
    let name = req.body.string
    let flash = greetings.flashMessage(name)
    let getGreet = greetings.greet(radio, name)
    await greetings.addToDatabase({
        name
    })
    let count = await greetings.counter();

    if (flash) {
        req.flash('info', 'enter a name');
    }
    res.render('index', {
        greet: getGreet,
        counter: count
    });
});

app.get('/greeted', async function(req, res) {
    let allNames = await greetings.getNames();
    res.render('actions', {
        name: allNames
    })
});

app.get('/counter/:username', async function(req, res) {
    let users = req.params.username
    let count = await greetings.eachNameCount(users);
    res.render('people', {
        name: users,
        counter: count
    })
});
app.post('/reset', async function(req, res) {
    let reset = await greetings.reset();
    res.redirect('/')
});



const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
    console.log('App starting on port', PORT);
});