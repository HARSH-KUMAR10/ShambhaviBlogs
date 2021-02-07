const express = require("express");
const app = express();
const select = require('./Models/selectfrom');
var bodyParser = require('body-parser');  
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/Views/home.html');
});

app.get('/ShowAllBlogs',(req,res)=>{
    res.json(select.getBlogsList());
});
app.get('/ShowAboutMe',(req,res)=>{
    res.json(select.getAboutMe());
});

app.get('/login',(req,res)=>{
    console.log('login request');
    res.sendFile(__dirname+'/Views/login.html');
});

app.post('/dashboard',urlencodedParser,(req,res)=>{
    const login_id = req.body.user_id;
    const pass = req.body.user_pass;
    if(login_id=="ShambhaviHere" & pass=="mollymygirl"){
        res.sendFile(__dirname+'/Views/dashboard.html');
    }else{
        res.send('Login credentials wrong contact your adminstrator');
    }
})

app.get('/dashboard_blog_list',(req,res)=>{
    res.json(select.getBlogsList())
});
//Adding directories used
app.use(express.static('./Views'));


//Giving a listening port
app.listen('8001',(err)=>{
    console.log('listening to http://localhost:8001');
});