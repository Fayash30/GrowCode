const express = require('express');

const router = express.Router();
const Topic = require("../Models/TopicModel");
const ProblemTopics = require('../Models/ProblemTopicsModel');
const TestCase = require('../Models/TestCaseModels');
const Problem = require('../Models/ProblemsModel');


//Routes for Topics

router.post('/addtopic', async(req,res)=>{

    try{
    const { topic_name } = req.body;

    const newTopic = new Topic({
        topic_name : topic_name
    })

    await newTopic.save();

    res.send({ status : "ok" , newTopic});
    } catch(err){
        res.status(404).json({error:err.message})
    }
})

router.get('/gettopics' , async(req,res)=>{
    try{
        const topics = await Topic.find();
        return res.status(200).json({topics});
    }
    catch(err)
    {
        res.status(404).json({error:err.message})
    }
})


router.put('/updatetopic/:id', async (req ,res) =>{
    try
    {
        const _id = req.params.id;
        const topic_name = req.body;
        
        const updatedTopic = await Topic.findByIdAndUpdate(_id , topic_name , {new : true});
        
        return res.status(200).json({message:"Topic Updated" , updatedTopic});

    } catch(err)
    {
       return res.status(404).json({ error:err.message})
    }
})


router.delete('/deletetopic/:id', async (req ,res) =>{
    try{
        
        const deletedTopic = await Topic.findByIdAndDelete(req.params.id);

        return res.status(200).json({deletedTopic,message:"Topic is Deleted"});
    } catch(err)
    {
        return res.status(404).json({error : err.message});
    }
})


//Routes for Problems

router.post('/addproblem', async(req,res)=>{

    try{
        const { problem_name , problem_description , constraints , difficulty_level } = req.body;

        await Problem.create({
            problem_name, 
            problem_description,
            constraints,
            difficulty_level
        })

        res.send({ status : "ok" , message : "Problem Added Successfully"});
    } catch(err){
        res.status(404).json({error:err.message})
    }
})

router.get('/getproblems', async(req,res)=>{
    try{
        const problems = await Problem.find();
        return res.status(200).json({problems});
    }
    catch(err)
    {
        res.status(404).json({error:err.message})
    }
})

router.get('/getproblem/:id', async(req,res)=>{
    try{
        const problem = await Problem.findById(req.params.id);
        return res.status(200).json({problem});
    }
    catch(err)
    {
        res.status(404).json({error:err.message})
    }
})



router.post('/addproblemtopic', async (req, res) => {
    try {
        const { problem_id, topic_id } = req.body;

    
        const newProblemTopic = new ProblemTopics({
            problem_id,
            topic_id
        });

        const savedProblemTopic = await newProblemTopic.save();

        res.status(201).json(savedProblemTopic);
    } catch (error) {
        console.error("Error associating problem with topic:", error);
        res.status(500).json({ error: 'Error associating problem with topic' });
    }
});

router.post('/addtestcases', async (req, res) => {
    try {
        const { problem_id, input , output } = req.body;

    
        const newTestCase = new TestCase({
            problem_id,
            input , 
            output
        });

        const savedTestCase = await newTestCase.save();

        res.status(201).json(savedTestCase);
    } catch (error) {
        console.error("Error associating problem with testcase:", error);
        res.status(500).json({ error: 'Error associating problem with testcase' });
    }
});

router.get('/gettestcases/:problemId', async (req, res) => {
    try {
        const problemId = req.params.problemId;

        const testCases = await TestCase.find({ problem_id: problemId });

        res.json(testCases);
    } catch (error) {
        console.error("Error retrieving test cases:", error);
        res.status(500).json({ error: 'Error retrieving test cases' });
    }
    //sample


});



module.exports = router;