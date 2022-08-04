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
//const { application } = require('express')

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
const mongourl = `mongodb+srv://dukenukem4w:333duke333@cluster0.ixejo.mongodb.net/tasklert?retryWrites=true`





mongoose.connect(mongourl).then(() =>
            console.log('Connected to MongoDB')
        )
        

// const { Schema} = mongoose;

// const taskSchema = new Schema ({
//     title: {
//         type: String,
//         required: [true, 'title required'],
//         index: true,
//         unique: true
//     }
    


// })

// const Task = mongoose.model('Task', taskSchema)

// const testTask = new Task ({title:'sdf'})

// testTask.save().then(doc =>{
//     console.log(doc) 
// }).catch(err =>{
//     console.log(err)
// })

app.listen(port, ()=>{
    console.log(`App running on ${port}`)
    
})

