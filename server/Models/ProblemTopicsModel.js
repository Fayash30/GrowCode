const mongoose = require('mongoose');


const problemTopicsSchema = new mongoose.Schema({
    problem_id :{
        type : mongoose.Types.ObjectId,
        ref : 'problems'
    },
    topic_id : {
        type : mongoose.Types.ObjectId,
        ref : 'topics'
    }
})

const ProblemTopic = new mongoose.model('problem_topics', problemTopicsSchema);

module.exports = ProblemTopic;