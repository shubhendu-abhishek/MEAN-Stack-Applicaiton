const router = require('express').Router();
const Posts = require('../models/Posts');

router.get('/',(req,res)=>{
    Posts.find().sort({createdAt:-1}).then((posts)=>{
        res.json(posts);
    }).catch(error=> res.status(400).josn('Error:'+error));
});

router.post('/addPosts',(req,res)=>{
    Posts.create(req.body,(err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data);
        }
    })
});

router.put('/updatePosts',(req,res)=>{
    Posts.updateOne({_id:req.body._id},{
        $set:{
            title:req.body.title,
            content:req.body.content
        }
    },(err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data);
        }
    })
});
router.delete('/deletePosts',(req,res)=>{
    Posts.deleteOne({_id:req.query.id},(err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data);
        }
    })
});


module.exports = router;