const express = require("express");
const app = express();
require('dotenv').config();

const cors = require('cors');
app.use(cors());

app.use(express.json());

const DBConnect = require("./Database/Connection");

DBConnect();

//import routes
const UserRoutes = require('./Routes/UserRoutes');
const problemRoutes = require('./Routes/ProblemsRoutes');

app.use('/auth/' ,  UserRoutes);

app.use('/problem', problemRoutes);

app.listen(process.env.PORT, ()=>{
    console.log("Server is Running...");
})