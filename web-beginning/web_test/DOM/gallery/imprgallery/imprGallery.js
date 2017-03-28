/**
 * Created by Administrator on 2016/10/26.
 */
function showPictures(whichpic){
    //替换图片
    if(!document.getElementById("placeHolder"))return false;//如果不存在这个id就返回false
    var pic=whichpic.getAttribute('href');
    var placeHolder=document.getElementById("placeHolder");
    placeHolder.setAttribute("src", pic);

    //替换文字
    if(document.getElementById("description")){
        var description=document.getElementById("description");
        var title=whichpic.getAttribute('title');
        if(title){
            description.firstChild.nodeValue=title;
        }else{
            description.firstChild.nodeValue='';
        }
    }
    return true;
}
function prepareGallery(){
    if(!document.getElementById)return false;//如果不存在getElementById就返回false
    if(!document.getElementsByTagName)return false;
    if(!document.getElementById("imagesGallery"))return false;//如果不存在这个id就返回false
    var imagesGallery=document.getElementById("imagesGallery");
    var links=imagesGallery.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        links[i].onclick=function(){
            if(showPictures(this)){
                return false;
            }
            else{
                return true;
            }
        }
    }
}

/*window.onload=function(){
    prepareGallery();
}*/
function addLoadEvent(func){
    var oldonload=window.onload;
    if(typeof window.onload!='function'){
        window.onload=func;
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}
addLoadEvent(prepareGallery);