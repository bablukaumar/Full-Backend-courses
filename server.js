const express = require('express')
const app = express();
require('dotenv').config();
const passport = require('./auth')

const db = require('./db')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const PersonRoutes = require('./ExpressRoutes/PersonRouter')
const MenuRoutes = require('./ExpressRoutes/MenuRouter');


const PORT = process.env.PORT || 5000;

/*MIDDLEWARE FUNCTION----------------- */
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request made to the database connection `);
    next();
}
app.use(logRequest)

app.use(passport.initialize())
const localAuth = passport.authenticate('local', { session: false })
app.get('/', localAuth, (req, res) => {
    res.send("this is my home page")
})
// Only for Person related
app.use('/Person',localAuth,PersonRoutes)
// Only for Menu Items
app.use('/menu', MenuRoutes)


app.listen(PORT, () => {
    console.log(`server is start on http://localhost:${PORT}`)
})



