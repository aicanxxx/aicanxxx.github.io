/**
 * Created by Administrator on 2016/11/7.
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
function addClass(element,value){
    if(!element.className){
        element.className=value;
    }else{
        newClassName=element.className;
        newClassName +='';
        newClassName +=value;
        element.className=newClassName;
    }
}
function moveElement(elementID,final_x,final_y,interval){
    if(!document.getElementById)return false;
    if(!document.getElementById(elementID))return false;
    var ele=document.getElementById(elementID);
    if(ele.movement){//为了防止鼠标悬停
        clearTimeout(ele.movement);
    }
    if(!ele.style.left){
        ele.style.left='0px';
    }
    if(!ele.style.top){
        ele.style.top='0px';
    }
    var xpos=parseInt(ele.style.left);
    var ypos=parseInt(ele.style.top);
    var dist=0;
    if(xpos==final_x&&ypos==final_y){
        return true;
    }
    if(xpos<final_x){
        dist=Math.ceil((final_x-xpos)/10);
        xpos=xpos+dist;
    }
    if(xpos>final_x){
        dist=Math.ceil((xpos-final_x)/10);
        xpos=xpos-dist;
    }
    if(ypos<final_y){
        dist=Math.ceil((final_y-ypos)/10);
        ypos=ypos+dist;
    }
    if(ypos>final_y){
        dist=Math.ceil((ypos-final_y)/10);
        ypos=ypos-dist;
    }
    ele.style.left=xpos+"px";
    ele.style.top=ypos+"px";
    var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    ele.movement=setTimeout(repeat,interval);
}
function highlightPage(){
    if(!document.getElementsByTagName)return false;
    if(!document.getElementById)return false;
    var headers=document.getElementsByTagName('header');
    if(headers.length==0)return false;
    var navs=headers[0].getElementsByTagName('nav');
    if(navs.length==0)return false;
    var links=navs[0].getElementsByTagName('a');
    var linkurl;
    for (var i=0;i<links.length;i++){
        linkurl=links[i].getAttribute('href');
        if(window.location.href.indexOf(linkurl)!=-1){
            links[i].className='here';
            var linktext=links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id",linktext);
        }
    }
}
function prepareSlideshow(){
    if(!document.getElementsByTagName)return false;
    if(!document.getElementById)return false;
    if(!document.getElementById("intro"))return false;
    var intro=document.getElementById("intro");
    var slideshow=document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var frame=document.createElement("img");
    frame.setAttribute("src","images/frame.gif");
    frame.setAttribute("alt","");
    frame.setAttribute("id","frame");
    slideshow.appendChild(frame);
    var preview=document.createElement("img");
    preview.setAttribute("src","images/slideshow.gif");
    preview.setAttribute("alt","a glimpse of what awaits you");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);
    var links=document.getElementsByTagName('a');
    var destination;
    for (var i=0;i<links.length;i++){
        links[i].onmouseover=function(){
            destination=this.getAttribute('href');
            if(destination.indexOf("index.html")!=-1){
                moveElement("preview",0,0,5);
            }
            if(destination.indexOf("about.html")!=-1){
                moveElement("preview",-150,0,5);
            }
            if(destination.indexOf("photos.html")!=-1){
                moveElement("preview",-300,0,5);
            }
            if(destination.indexOf("live.html")!=-1){
                moveElement("preview",-450,0,5);
            }
            if(destination.indexOf("contact.html")!=-1){
                moveElement("preview",-600,0,5);
            }
        }
    }
}
function showSection(id){
    var section=document.getElementsByTagName("section");
    for(var i=0;i<section.length;i++){
        if(section[i].getAttribute("id")!=id){
            section[i].style.display='none';
        }else{
            section[i].style.display='block';
        }
    }
}
function prepareInternalnav(){
    if(!document.getElementsByTagName)return false;
    if(!document.getElementById)return false;
    var articles=document.getElementsByTagName('article');
    if(articles.length==0)return false;
    var navs=articles[0].getElementsByTagName('nav');
    if(navs.length==0)return false;
    var links=navs[0].getElementsByTagName('a');
    for (var i=0;i<links.length;i++){
        var sectionId=links[i].getAttribute('href').split('#')[1];
        if(!document.getElementById(sectionId))continue;
        document.getElementById(sectionId).style.display="none";
        links[i].destination=sectionId;
        links[i].onclick= function () {
            showSection(this.destination);
            return false;
        };
    }
}
function preparePlaceholder(){
    if(!document.createElement)return false;
    if(!document.createTextNode)return false;
    if(!document.getElementById)return false;
    if(!document.getElementById("imageGallery"))return false;
    //创建img与p节点，并设置其属性
    var image=document.createElement('img');
    image.setAttribute("id","placeHolder");
    image.setAttribute("src","images/placeholder.gif");
    image.setAttribute("alt","my images");
    var para=document.createElement('p');
    var txt=document.createTextNode("Choose a image");
    para.setAttribute("id","description");
    para.appendChild(txt);
    //将其插入到节点树中
    var imageGallery=document.getElementById("imageGallery");
    insertAfter(para,imageGallery);
    insertAfter(image,para);
}
function showPictures(whichpic){
    //替换图片
    if(!document.getElementById("placeHolder"))return false;//如果不存在这个id就返回false
    var pic=whichpic.getAttribute('href');
    var placeHolder=document.getElementById("placeHolder");
    placeHolder.setAttribute("src", pic);

    //if(!document.getElementById("description"))return false;
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
    if(!document.getElementById("imageGallery"))return false;//如果不存在这个id就返回false
    var imageGallery=document.getElementById("imageGallery");
    var links=imageGallery.getElementsByTagName("a");
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
function stripeTales(){//为表格奇数行添加一种背景颜色，偶数行添加另一种
    if (!document.getElementsByTagName)return false;
    var tables=document.getElementsByTagName('table');
    for (var i=0;i<tables.length;i++){
        var rows=tables[i].getElementsByTagName('tr');
        var odd=false;
        for (var j=0;j<rows.length;j++){
            if(odd==true){
                addClass(rows[j],'odd');
                odd=false
            }else{
                odd=true;
            }
        }
    }
}
function displayAbbr(){//显示缩略语列表
    if(!document.getElementsByTagName)return false;
    if(!document.createElement)return false;
    if(!document.createTextNode)return false;
    var defs=[];
    var abbreviation=document.getElementsByTagName("abbr");
    //获取缩略词的title属性以及其缩写
    for(var i=0;i<abbreviation.length;i++){
        //IE6及以下不能识别abbr下子节点的个数，会一直返回0
        if(abbreviation[i].childNodes.length<1)continue;
        var keys=abbreviation[i].lastChild.nodeValue;
        defs[keys]=abbreviation[i].getAttribute("title");
    }
    //创建“定义缩略列表”
    var dList=document.createElement("dl");
    for(keys in defs){
        var dTitle=document.createElement("dt");
        var dTitleText=document.createTextNode(keys);
        dTitle.appendChild(dTitleText);
        var dDesc=document.createElement("dd");
        var dDescText=document.createTextNode(defs[keys]);
        dDesc.appendChild(dDescText);
        dList.appendChild(dTitle);
        dList.appendChild(dDesc);
    }
    //如果abbr不能被识别，则不用执行下面函数
    if(dList.childNodes.length<1)return false;
    var header =document.createElement("h2");
    var headerText=document.createTextNode("Abbreviation");
    header.appendChild(headerText);
    var articles=document.getElementsByTagName("article")[0];
    articles.appendChild(header);
    articles.appendChild(dList);
}
function highlightRows() {
    if(!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i=0; i<rows.length; i++) {
        rows[i].oldClassName=rows[i].className;
        rows[i].onmouseover = function() {
            addClass(this,"highlight");
        }
        rows[i].onmouseout = function() {
            this.className=this.oldClassName;
        }
    }
}

function focusLabels(){
    if(!document.getElementsByTagName)return false;
    var labels=document.getElementsByTagName("label");
    for(var i=0;i<labels.length;i++){
        if(!labels[i].getAttribute("for"))continue;
        labels[i].onclick=function(){
            var id=this.getAttribute('for');
            if(!document.getElementById(id))return false;
            var ele=document.getElementById(id);
            ele.focus();
        }
    }
}

function resetFields(whichform) {//预防浏览器不显示placeholder
    if (Modernizr.input.placeholder) return false;
    for (var i=0; i<whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.type == "submit") continue;
        if (!element.getAttribute('placeholder')) continue;
        element.onfocus = function() {
            if (this.value == this.getAttribute('placeholder')) {
                this.value = "";
            }
        }
        element.onblur = function() {
            if (this.value == "") {
                this.value = this.getAttribute('placeholder');
            }
        }
        element.onblur();
    }
}
function validateForm(whichform) {
    for (var i=0; i<whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.getAttribute("required") == 'required') {
            if (!isFilled(element)) {
                alert("Please fill in the "+element.name+" field.");
                return false;
            }
        }
        if (element.getAttribute("type") == 'email') {
            if (!isEmail(element)) {
                alert("The "+element.name+" field must be a valid email address.");
                return false;
            }
        }
    }
    return true;
}

function isFilled(field) {
    return (field.value.length > 0 && field.value != field.getAttribute('placeholder'));
}

function isEmail(field) {
    return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

function prepareForms() {
    for (var i=0; i<document.forms.length; i++) {
        var thisform = document.forms[i];
        resetFields(thisform);
        thisform.onsubmit = function() {
            return validateForm(this);
        }
    }
}

addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(displayAbbr);
addLoadEvent(stripeTales);
addLoadEvent(highlightRows);
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);