function getBlogs(){
    fetch('/ShowAllBlogs').then((res) => res.json()).then((data)=>{
        var str ='<h1>My Blogs</h1><div id="blogs_all">';
        for(i=0;i<data.length;i++){
            str+="<div class='blogs_spacing'>";
            str+='<div id="blog_header"><a href="'+data[i].blog_file+'">'+data[i].blog_title.toUpperCase()+'</a></div><hr size="3" color="gold" width="75%" align="left">';
            str+='<div id="blog_content">'+data[i].blog_desc+'</div>';
            str+='</div>';
        }
        str+='</div>';
        document.getElementById("content_Blogs").innerHTML=str;

    });
}
function getAboutUs(){
    fetch('/ShowAboutMe').then(res=>res.json()).then((data)=>{
        var str='<h1>About Me</h1><div id="aboutMeContent">';
        str+=data[0].me;
        str+='</div>';
        document.getElementById("about_me").innerHTML=str;
    });
}
getBlogs();
getAboutUs();