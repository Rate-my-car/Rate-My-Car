require('dotenv').config()
const express = require('express')
const massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING , SESSION_SECRET} = process.env
const app = express()
const session = require('express-session')
const authCtrl = require('./controllers/authController')
app.use(express.json())


app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 100 * 60 * 60}
}))


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db running')
    app.listen(SERVER_PORT, () => console.log(`server is laying waste to its enemies on ${SERVER_PORT}`))
}).catch(err => console.log(err))


app.post('/auth/register', authCtrl.register); 
app.post('/auth/login', authCtrl.login); 
app.post('/auth/logout', authCtrl.logout); 


