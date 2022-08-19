
const tasks = require('.././models/taskModel')
const TaskModel = require('.././models/taskModel')

exports.viewAllTasks= async (req,res,next)=>{
     const  alltasks = await tasks.find();
   
    res.status(200).render('index.ejs',
  {alltasks}
  )   
}
exports.createTask = async  (req,res,next)=>{
 

 const newTask = new TaskModel({title: req.body.title});
 newTask.save().then(res.redirect('/')).catch(err=>console.log(err) )


}

exports.deleteTask =  async (req,res,next)=>{


}
