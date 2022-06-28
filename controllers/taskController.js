//const fs = require('fs')
const Task = require('./../models/taskModel')
const {taskError} = require('./error')

// exports.checkID = (req,res,next, val)=>{

    
//     if (req.params.id * 1 > tasks.length){
//         return res.status(404).json({
//             status:'fail',
//             message: 'Invalid ID'
//         })
//     }
// next();
// }

// exports.checkBody = (req,res,next)=>{

// if (!req.body.title) {
//     return res.status(404).json({
//     status:'fail',
//     message: 'Missing task title.'

// })


//}
//next();
//}

// class APIfeature {
//     constructor(query, queryString){
//         this.query = query;
//         this.queryString = queryString;

//     }



// }




exports.getAllTasks = async (req,res,next)=>{
    
    
try {

        const queryObj = {...req.query}
        const excludedFields = ['page','sort', 'limit', 'fields']
        excludedFields.forEach( el => delete queryObj[el])
        let queryString = JSON.stringify(queryObj)
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        queryString = JSON.parse(queryString);
       
       
        let query = Task.find(queryString);

        if (req.query.sort){
            const sortField = req.query.sort.split(',').join(' ');
            query = query.sort(sortField);
        }

        if (req.query.fields){
            fields = req.query.fields.split(',').join(' ');

            query = query.select (fields);

        } else (
            query = query.select('-__v')
        )

        //Pagination
            const limit = req.query.limit*1 || 20;
            const  page = req.query.page * 1 || 1;
            const skip = (page-1)*limit;
            
            
            query = query.skip(skip).limit(limit);

            if(req.query.page){
                
                const numTasks = await Task.countDocuments();
                
                if(skip >= numTasks) throw new taskError('fail', 504);

                
            }    
            
        



        const tasks = await query;

       return  res.status(200).json({
        status: 'success',
         results: tasks.length,
         data:{
             tasks
    
            }
        })
    
} catch (err){
    next(err)
}

}
exports.getTask = async (req,res,next)=>{

    try {

    const task = await Task.findById(req.params.id)
  
    if(!task) return next(new taskError('There is no task with this', 404));

     return res.status(200).json({
            status:'success', 
            data:{
                task,
                CDtimer:task.CDtimer
                
            }
        })
    } catch (err)
    {
            next(err)
    }

 
}

    


exports.createTask = async (req,res)=>{
    // const newId = tasks[tasks.length - 1].id + 1;
    // const newTask =  Object.assign({ id: newId }, req.body)
  
    // tasks.push(newTask)
    // // eslint-disable-next-line no-unused-vars
    // fs.writeFile(`${__dirname}/../data/tasks.json`, JSON.stringify(tasks, null, 4), 
    //     // eslint-disable-next-line no-unused-vars
    //     err =>{

    try {
    const newTask = await Task.create(req.body)
            res.status(201).json({
                status:'success',
                data:{
                    task: newTask
                }
            })
        } catch(err){
            res.status(400).json({
                status:'fail',
                message: 'Invalid data sent!'
            })

        }
    }
    

exports.updateTask = async (req,res)=>{
try {

    const task  = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
   
   
    res.status(200).json({
        status:'success', 
        data: {
            task
        }
        })    
    } catch (err){
        res.status(404).json({
            status: 'fail',
            message: err
            
        })
    }

}
exports.deleteTask = async (req,res)=>{

    try {
   await Task.findByIdAndRemove(req.params.id)
   
    res.status(204).json({
        status:'success', 
        data:null
        })    
    }

 catch (err){
    res.status(404).json({
        status: 'fail',
        message: err
    })
}
}