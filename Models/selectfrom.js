const pool = require('./Models/pool');
function getBlogsList(){
pool.query("Select * from blogs",(err,result)=>{
    if(err){
        console.log(err);
    }else{
        return result;
    }
});
}

function getAboutMe(){
pool.query('select * from aboutme',(err,result)=>{
    if(err){
        console.log(err);
    }else{
        return result;
    }
});
}

module.exports ={
    getBlogsList:getBlogsList,
    getAboutMe:getAboutMe
}