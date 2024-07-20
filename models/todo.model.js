const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    status:{type:Boolean, required: true, default:false}
    
}, {
    versionKey: false,
    timestamp:true
})



module.exports= mongoose.model("todo", todoSchema);