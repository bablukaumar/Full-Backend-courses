const mongoose=require('mongoose')
require('dotenv').config();
// This mongodb database connection

/* Local DataBase connection------------- */

// const mongoURL=process.env.local_DB

/*Global database connection------------- */
const mongoURL=process.env.DB_URL;




mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true

})

const db=mongoose.connection;


db.on('connected',()=>{
    console.log('connected to mongodb server')
})



db.on('error',(error)=>{
    console.error('connected to mongodb server error',error)
})


db.on('disconnected',()=>{
    console.log('disconnected to mongodb server')
})


//export the database connection

module.exports=db;