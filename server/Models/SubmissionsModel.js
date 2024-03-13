const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Types.ObjectId,
        ref : 'User_Account'
    },
    status : {
        type : String,
    },
    submittedAt : {
        type : Date,
        default : Date.now
    }
})

const Submissions = new mongoose.model('submissions' , submissionSchema);

module.exports = Submissions;