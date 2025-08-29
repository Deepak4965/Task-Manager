const mongoose = require('mongoose')

const TaskSchema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        requird:true,
    },
    dueData:{
        type:Date,
        
    },
    completed:{
        type:Boolean,
        default:false,
    }

},{timestamps:true})


const Task=mongoose.model("Task",TaskSchema);

module.exports=Task;