const mongoose = require('mongoose')

const testCaseSchema = new mongoose.Schema({
    problem_id : {
        type : mongoose.Types.ObjectId,
        ref : 'problems'
    },
    input : {
        type : String,
        required : true
    },
    output : {
        type : String,
        required : true
    }
})


const TestCase = new mongoose.model("test_cases" , testCaseSchema);

module.exports = TestCase;