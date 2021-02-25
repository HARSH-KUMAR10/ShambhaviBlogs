function getBlogs(){
    fetch('/ShowAllBlogs').then((res) => res.json()).then((data)=>{
        var str ='<h1>My Blogs</h1><div id="blogs_all">';
        for(i=0;i<data.length;i++){
            str+="<div class='blogs_spacing'>";
            str+='<div id="blog_header"><a class="blog_links" href="Blogs?filename='+data[i].blog_file+'">'+data[i].blog_title.toUpperCase()+' - ('+data[i].blog_date.split('T')[0]+')</a></div><hr size="3" color="gold" width="75%" align="left">';
            var str2="";
            for(j=0;j<data[i].blog_desc.length;j++){
                if(j>100){
                    break;
                }
                str2+=data[i].blog_desc[j];
            }
            str2+="...";
            str+='<div id="blog_content">'+str2+'</div>';
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