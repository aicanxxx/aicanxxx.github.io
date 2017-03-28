/**
 * Created by Administrator on 2016/10/27.
 */
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

function insertAfter(newElement,targetElement){
    var parent=targetElement.parentNode;
    if(parent.lastChild==targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling)
    }
}

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

function preparePlaceholder(){
    if(!document.createElement)return false;
    if(!document.createTextNode)return false;
    if(!document.getElementById)return false;
    if(!document.getElementById("imagesGallery"))return false;
    //创建img与p节点，并设置其属性
    var image=document.createElement('img');
    image.setAttribute("id","placeHolder");
    image.setAttribute("src","../images/whyme.jpg");
    image.setAttribute("width","800px");
    image.setAttribute("height","600px");
    image.setAttribute("alt","my images");
    var para=document.createElement('p');
    var txt=document.createTextNode("Choose a image");
    para.setAttribute("id","description");
    para.appendChild(txt);
    //将其插入到节点树中
    var imagesGallery=document.getElementById("imagesGallery");
    insertAfter(image,imagesGallery);
    insertAfter(para,image);
}

addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);