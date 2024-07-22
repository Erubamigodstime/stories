const path = require('path')
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const { engine } = require('express-handlebars');
const passport =  require('passport')
const session = require('express-session')
const methodOverride = require('method-override');
const connectDb = require('./model/index');
const MongoStore = require('connect-mongo')

dotenv.config({ path: './config/config.env' });

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}


require('./config/passport')(passport)

const app = express();


app.use(express.urlencoded({extended:false}))
app.use(express.json())
// method override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  }))


if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

connectDb();

// Handlebar helpers

const { formatDate, stripTag, truncate, editIcon, select  } = require('./helpers/hbs');





app.engine('.hbs', engine(
    { helpers: {formatDate,
     stripTag,
     truncate,
     editIcon,
     select
    },defaultLayout: 'main', extname: '.hbs'}));
    app.set('view engine', '.hbs');
    app.set('views', './views');
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            mongooseConnection: mongoose.connection
    })
    
    
  }))
app.use(passport.initialize())
app.use(passport.session())

// set global variable

app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});


app.use(express.static(path.join(__dirname, 'public')))




app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).redirect('/error/500');
});

const port = process.env.PORT;

app.listen(port, console.log(`server running in ${process.env.NODE_ENV} mode on ${port}`));
