const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    topic_name: {
        type : String,
    }
})

const Topic = new mongoose.model("topics" , TopicSchema); 

module.exports = Topic;