/**
 * Created by Administrator on 2016/11/2.
 */
function styleHeaderSiblings(){
    if (!document.getElementsByTagName)return false;
    var headers=document.getElementsByTagName('h1');
    var ele;
    for (var i=0;i<headers.length;i++){
        ele=getNextElement(headers[i].nextSibling);
        ele.style.fontWeight='bold';
        ele.style.fontSize='1.5em';
    }
}

function getNextElement(node){//返回元素节点
    if (node.nodeType==1)return node;
    if(node.nextSibling){
        return getNextElement(node.nextSibling);
    }
    return null;
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
function highlightRows() {
    if(!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i=0; i<rows.length; i++) {
        rows[i].onmouseover = function() {
            this.style.fontWeight = "bold";
        }
        rows[i].onmouseout = function() {
            this.style.fontWeight = "normal";
        }
    }
}
addLoadEvent(highlightRows);
addLoadEvent(styleHeaderSiblings);
addLoadEvent(stripeTales);