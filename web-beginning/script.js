/**
 * Created by Administrator on 2016/10/26.
 */

/*编写一些平时可能调用的函数*/

/*
addLoadEvent(func){}
页面加载函数，添加页面加载完后所执行的函数，可添加多个执行函数
func:需要执行的函数*/
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

/*
* insertAfter(newElement,targetElement){}
 * 节点插入函数，把一个节点插入到另一个节点之后
  * newElement:需要插入的节点
  * targetElement:被插入的目标节点*/
function insertAfter(newElement,targetElement){
    var parent=targetElement.parentNode;
    if(parent.lastChild==targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling)
    }
}

/*
* addClass(element,value)为一个标签添加一个class属性
* class属性是在css样式表中定义的*/
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

/*
* 实现动画效果，根据时间的变化从一个位置动画的移到另一个位置
* function moveElement(elementID,final_x,final_y,interval)
* elementID:标签的ID
* final_x,final_y:移到的目的地，即position：absolute时设置top和left
* interval:为位置变换的时间间隔*/
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
/*用于表格中隔行显示不同颜色，且鼠标覆盖的一行高亮*/
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
//为表格奇数行添加一种背景颜色，偶数行添加另一种
function stripeTales(){
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