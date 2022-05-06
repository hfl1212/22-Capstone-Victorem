import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import sessions from 'express-session';
import bodyParser from 'body-parser';
import {default as connectMongoDBSession} from 'connect-mongodb-session';
import passport from 'passport';


import flash from 'express-flash';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import postRouter from './routes/posts.js';
import profileRouter from './routes/profile.js';
import db from './db.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const MongoDBSession = connectMongoDBSession(sessions);

var app = express();
const mongoURI = "mongodb+srv://me:victorem@cluster0.jaf1k.mongodb.net/victorem?retryWrites=true&w=majority";

// tracking sessions
var SessionStore = new MongoDBSession({
    uri: mongoURI,
    collection: 'sessions'
  })

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("secretCode"));
app.use(bodyParser.json());

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "Capstone Victorem",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
    store: SessionStore
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'build')));
app.use( function (req, res, next) {
    req.db = db;
    next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postRouter);
app.use('/profile', profileRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'))
})


export default app;
