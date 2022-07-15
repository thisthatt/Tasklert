// const errorHandler = (err, req, res, next)=>{
// err.status(err.status || 500)
// res.send({"error": true,
// "message": err.message} || "Something went wrong")

// next()

// }

class taskError extends Error {
constructor(message, statusCode){
       super(message); 
    this.statusCode= statusCode || 500;
        this.status = 'fail'
    Error.captureStackTrace(this, this.constructor);



}


}


const errorDisplay = (err, res)=>{
    
const {statusCode, message} = err

    res.status(statusCode).json({

            message,
            
    })
}

// const httpStatusCodes = {
//     
//     BADREQUEST: 400,
//     NOT_FOUND: 404,
//     INTERNAL_SERVER: 500
//    }
   
module.exports = {taskError, errorDisplay}