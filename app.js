/* eslint-disable no-console */
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
//const fs = require('fs');
const dotenv = require('dotenv')
const {taskError,errorDisplay} = require('./controllers/error')
dotenv.config({path: './config.env'})
const taskRouter = require('./routes/taskRoutes')
const viewRouter = require('./routes/viewRoutes')

const app = express();
//MIDDLEWARE

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: '10kb'}))
app.use(express.static(`${__dirname}/public`))

//Route handler
app.set('view engine ', 'ejs')

app.use('/', viewRouter)

app.use('/api/v1/tasks', taskRouter);

app.all('*',function(req,res,next){
    throw new taskError('This URL doesnt exist!',500);
    


})

app.use(function(err,req,res,next){
        console.log(err.name, err.statusCode, err.message, err.stack)
    //errorDisplay(err,res)
    // if (err.statusCode && err.status){
    //     res.status(statusCode).json({
    //         status: err.status,
    //         message: err.message
    //     })
    // } 
    
    // err.status = 404;
    // // render the error page
    // res.status(err.status || 500);
    // res.render('error',{errorStatus: err.status}); // 
    


})
const port = process.env.PORT || 3000;





mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'));
        



app.listen(port, ()=>{
    console.log(`App running on ${port}`)
    
})

