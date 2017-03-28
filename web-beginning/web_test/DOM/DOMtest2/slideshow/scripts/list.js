/**
 * Created by Administrator on 2016/11/3.
 */
function preSlideshow(){
    if(!document.getElementById)return false;
    if(!document.getElementsByTagName)return false;
    if(!document.getElementById('linklist'))return false;
    //动态创建div与img
    var slideshow=document.createElement('div');
    slideshow.setAttribute('id','slideshow');
    var image=document.createElement('img');
    image.setAttribute('src','topics.gif');
    image.setAttribute('id','preview');
    image.setAttribute('alt','building blocks of web design');
    slideshow.appendChild(image);
    var linkList=document.getElementById('linklist');
    insertAfter(slideshow,linkList);

    var links=linkList.getElementsByTagName('a');
    links[0].onmouseover=function(){
        moveElement("preview",-100,0,10);
    };
    links[1].onmouseover=function(){
        moveElement("preview",-200,0,10);
    };
    links[2].onmouseover=function(){
        moveElement("preview",-300,0,10);
    };

}
addLoadEvent(preSlideshow);
