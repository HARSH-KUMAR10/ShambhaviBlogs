const e = require("express");
const express = require("express");
const app = express();
const pool = require('./Models/showBlogs');

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/Views/home.html');
});

app.get('/ShowAllBlogs',(req,res)=>{
    pool.query("Select * from blogs",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result[0]);
        }
        res.json(result);
    });
});
app.get('/ShowAboutMe',(req,res)=>{
    pool.query('select * from aboutme',(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.json(result);
        }
    })
});

//Adding directories used
app.use(express.static('./Views'));


//Giving a listening port
app.listen('8001',(err)=>{
    console.log('listening to http://localhost:8001');
});