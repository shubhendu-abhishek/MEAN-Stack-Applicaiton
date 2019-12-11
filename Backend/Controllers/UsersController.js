const router = require('express').Router();
const crypto = require('crypto');
const Users = require('../models/Users');

router.get('/',(req,res)=>{
    Users.find().then((users)=>{
        res.json(users);
    }).catch(error=> res.status(400).josn('Error:'+error));
});

router.post('/addUser',(req,res)=>{
let secret = "newsblogs";
let phash = crypto.createHmac('sha256',secret)
            .update(req.body.password)
            .digest('hex');
    const params = {
        userName:req.body.userName,
        email:req.body.email,
        password:phash
    }
    Users.create(params,(err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data);
        }
    })
});

router.get('/login',(req,res)=>{
    let secret = "newsblogs";
    let phash = crypto.createHmac('sha256',secret)
            .update(req.query.password)
            .digest('hex');
    let param = {
        email : req.query.email,
        password : phash
    }
    Users.findOne(param,(err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data);
        }
    })
})

module.exports = router;