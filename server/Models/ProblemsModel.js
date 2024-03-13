const mongoose = require('mongoose')

const problemsSchema = new mongoose.Schema({
    problem_name : {
        type : String,
        required : true
    },
    problem_description : {
        type : String,
        required : true
    },
    constraints : {
        type : [String],
    },
    difficulty_level : {
        type : String
    }
})

const Problem = mongoose.model("problems" , problemsSchema);

module.exports = Problem;

