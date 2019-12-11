'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT || 5000;

//DB Connection
const url = 'mongodb://localhost:27017/NewsBlog'
mongoose.connect(url,{useNewUrlParser:true,useFindAndModify:false,useUnifiedTopology:true,useCreateIndex:true})
.then((db)=>{
    console.log('MongoDb Connected.');
}).catch((error)=>{
    console.log(error);
    throw error;
});

//Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const usersRouter = require('./Controllers/UsersController');
app.use('/users',usersRouter);
const postsRouter = require('./Controllers/PostsController');
app.use('/posts',postsRouter);

app.listen(port,()=>{
    console.log(`Server is running on port :${port}`)
})