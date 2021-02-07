const content1 = document.getElementById("content1");
const content2 = document.getElementById("content2");
const content3 = document.getElementById("content3");

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
}