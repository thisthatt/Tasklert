const mongoose = require('mongoose')
const {Schema} = mongoose;

const taskSchema = new Schema ({
    title: {
        type: String,
        required: [true, 'title required'],
        index: true,
        unique: true
    },
    duration:{
        type: Number,
        
    },
    startDate:{
        type: [Date],
        default: Date.now
    },
    completed:{
        type: Boolean,
        default: 'false'
    },
    tags: { 
        type: [String],

    },
    note:{
        type: String
    }

    
},{
    toJSON:{ virtuals:true}, toObject:{virtuals: true}
});
taskSchema.virtual('CDtimer').get(function(){
    return this.duration
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;