const express = require("express");
const app = express();
const select = require('./Models/selectfrom');
var bodyParser = require('body-parser');  
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const pool = require('./Models/pool');
const fs = require('fs');
/*
All routings
*/
//sending home.html as index.html
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/Views/home.html');
});

//showing blog list on index
app.get('/ShowAllBlogs',(req,res)=>{
    pool.query("Select * from blogs",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.json(result);
        }
    });
});

//showing about me on index
app.get('/ShowAboutMe',(req,res)=>{
    pool.query('select * from aboutme', (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.json(result);     
        }
    });
});

//sending login.hmtl
app.get('/login',(req,res)=>{
    console.log('login request');
    res.sendFile(__dirname+'/Views/login.html');
});

//login from login.html
app.post('/dashboard',urlencodedParser,(req,res)=>{
    const login_id = req.body.user_id;
    const pass = req.body.user_pass;
    if(login_id=="ShambhaviHere" & pass=="mollymygirl"){
        res.sendFile(__dirname+'/Views/dashboard.html');
    }else{
        res.send('Login credentials wrong contact your adminstrator');
    }
})

//dashboard blog lists
app.get('/dashboard_blog_list',(req,res)=>{
    pool.query("Select * from blogs",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.json(result);
        }
    });
});


app.post('/add_new_blog',urlencodedParser,(req,res)=>{
    var blog_content_temp = req.body.new_blog_content;
    var blog_content_array = blog_content_temp.split('\r\n');
    var titlename = req.body.new_blog_title.split(' ')
    var filename='';
    for(i=0;i<titlename.length;i++){
        filename+=titlename[i];
    }
    filename+='.html';
    blog_content_temp='';
    for(i=0;i<blog_content_array.length;i++){
        blog_content_temp+=blog_content_array[i]+'<br/>';
    }
    const data = {
        title : req.body.new_blog_title,
        date : req.body.new_blog_date,
        content : blog_content_temp
    }
    var fileContent = '<html><head><title>'+data.title+'| Shambhavi'+'</title><link rel="stylesheet" href="style.css"/></head>';
    fileContent+='<body><div id="heading">Shambhavi Writes</div><div id="mainContent"><div id="title">'+data.title+'</div><div id="date">'+data.date+'</div><div id="content">'+data.content;
    fileContent+='</div></div></body></html>';
    fs.writeFile(__dirname+'/Blogs/'+filename,fileContent,(err)=>{
        if(err){
            console.log('file not written');
        }else{
            console.log('file written');
        }
    });
    res.sendFile(__dirname+'/Views/dashboard.html');
    var q = "insert into blogs values('"+data.title+"','"+blog_content_array+"','"+filename+"','"+data.date+"')";
    pool.query(q,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('blog inserted');
        }
    })
})


app.get('/Blogs',(req,res)=>{
const filename = req.query.filename;
res.sendFile(__dirname+'/Blogs/'+filename);
})


app.get('/checkBlog',(req,res)=>{
    var sql = "select * from blogs where blog_title='"+req.query.blog_title+"'";
pool.query(sql,(err,result)=>{
    console.log(result[0],result.length);
    if(result.length==0){
        var data = {
            found:false
        };
        res.json(data);
    }else{
        res.json(result);

    }
})
});
/*
Adding directories used
*/
app.use(express.static('Views'));
app.use(express.static('Blogs'));

/*
Giving a listening port
*/
app.listen('8001',(err)=>{
    console.log('listening to http://localhost:8001');
});