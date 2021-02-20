const content1 = document.getElementById("content1");
const content2 = document.getElementById("content2");
const content3 = document.getElementById("content3");
const content3_part1 = document.getElementById("content3_part1");
const update_button = document.getElementById("update_button");
const update_blog_content = document.getElementById("blog_content");

function show_blog_list(){
    fetch('/dashboard_blog_list').then((res)=>(res.json())).then(data=>{
        var str = "<table id='bloglisttable' border='1' cellspacing='0' cellpadding='15'><tr><th>Blog title</th><th>Date</th></tr>";
        for(i=0;i<data.length;i++){
            str+='<tr><td>'+data[i].blog_title+'</td><td>'+data[i].blog_date.split('T')[0]+'</td></tr>';
        }
        str+='</table>';
        document.getElementById('blog_list').innerHTML= str;
    });
}

function new_blogs(){
    content1.style.display="none";
    content2.style.display="block";
    content3.style.display="none";
}

function update_blogs(){
    content1.style.display="none";
    content3.style.display="block";
    content2.style.display="none";
}

function checkBlog(){
    var blog_title = document.getElementById("blog_title").value;
    var url = "/checkBlog?blog_title="+blog_title;
    fetch(url).then(res=>res.json()).then((data)=>{
        console.log(data[0],data[0].length,data[0].blog_desc);
        var result = JSON.stringify(data);
        console.log(result.blog_desc);
        if(data.length>0){
            content3_part1.style.display="block";
            update_blog_content.innerHTML = data[0].blog_desc;
            update_button.disabled="true";
            document.getElementById("blog_title").readOnly=true;
        }else{
            content3_part1.style.display="none";
            alert("blog not found");
        }
    });

}