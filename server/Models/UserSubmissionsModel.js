const mongoose = require('mongoose')

const userSubmissionSchema = new mongoose.Schema({
    submission_id:{
        type:mongoose.Types.ObjectId,
        ref:'submissions'
    },
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:'User_Account'
    },
    problem_id:{
        type:mongoose.Types.ObjectId,
        ref:'problems'
    },
    language : {
        type : String,
        required : true
    },
    code : {
        type : String,
        required : true
    }
})

const UserSubmission = new mongoose.model('user_submissions',userSubmissionSchema);

module.exports = UserSubmission;