const mongoose=require('mongoose')

// This mongodb database connection
const mongoURL='mongodb://localhost:27017/hotels';

//setup connection with mongodb
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