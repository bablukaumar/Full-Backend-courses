const express = require('express')
const app = express();
const db = require('./db')



const bodyParser = require('body-parser')
app.use(bodyParser.json())

const Person = require('./DataModal/PersonDataModal')
const MenuItems=require('./DataModal/MenuDataModel')
const PersonRoutes=require('./ExpressRoutes/PersonRouter')
const MenuRoutes=require('./ExpressRoutes/MenuRouter')


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("this is my home page")
})
// Only for Person related
app.use('/Person',PersonRoutes)
// Only for Menu Items
app.use('/menu',MenuRoutes)


app.listen(PORT, () => {
    console.log(`server is start on http://localhost:${PORT}`)
})



