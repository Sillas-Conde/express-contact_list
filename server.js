// Padrão Model View Controller (MVC) 
const path = require('path');
const express = require('express');
const app = express();
const routes = require('./routes');
const middle = require('./src/middlewares/middleware');
const helmet = require('helmet');
const csrf = require('csurf');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

require('dotenv').config();

mongoose.connect(process.env.CONNSTRING)
    .then(() => {
        console.log('Connected');
        app.emit('Connected');
    })
    .catch(e => console.log(e));

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname,'public')));

const sessionOptions = session({
    secret: 'senha',
    // store: MongoStore.create({ mongoUrl: process.env.CONNSTRING }),
    store: MongoStore.create({ mongoUrl: process.env.CONNSTRING }),
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24*7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

// É necesssário importar os middlewares antes das routes
app.use(csrf());
app.use(middle.global);
app.use(middle.csrfCheck);
app.use(middle.middleCsrf);
app.use(routes);

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.on('Connected', () => {
    app.listen(3000,() => {
        console.log('Servidor executado na porta 3000');
        console.log('http://localhost:3000');
    });
})



