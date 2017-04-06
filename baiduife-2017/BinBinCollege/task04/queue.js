/**
 * Created by Administrator on 2017/3/21 0021.
 */

function addLoadEvent(func){
    var oldonload=window.onload;
    if(typeof window.onload!='function'){
        window.onload=func;
    }else {
        window.onload=function(){
            oldonload();
            func();
        }
    }
}
function addClick(eleId,func){
    if(!document.getElementById)return false;
    var id=document.getElementById(eleId);
    id.onclick=func;
}
function checkNumber(theObj) {
    var reg =/^(0|[1-9]+.?[0-9]*)$/ ;
    if(reg.test(theObj)) {
        return true;
    }
    return false;
}

function newLiNode(){
    var input=document.getElementById('input');
    var list=document.createElement('li');
    if(!checkNumber(input.value)){
        alert('输入有问题，请输入正确的数');
        return null;
    }else{
        list.innerHTML=input.value;
        list.onclick=function(){
            this.parentNode.removeChild(this);
            alert(this.innerHTML);
        };
        return list;
    }
}
function leftIn(){
    var queue=document.getElementById('queue');
    var eleNode=newLiNode();
    if(eleNode!=null){
        queue.insertBefore(eleNode,queue.firstChild);
    }
}

function rightIn(){
    var queue=document.getElementById('queue');
    var eleNode=newLiNode();
    if(eleNode!=null) {
        queue.appendChild(eleNode);
    }
}
function leftOut(){
    var queue=document.getElementById('queue');
    if(queue.childElementCount!=0){
        alert(queue.firstChild.innerHTML);
        queue.removeChild(queue.firstChild);
    } else {
        alert('队列中没有元素')
    }

}
function rightOut(){
    var queue=document.getElementById('queue');
    if(queue.childElementCount!=0){
        alert(queue.lastChild.innerHTML);
        queue.removeChild(queue.lastChild);
    } else {
        alert('队列中没有元素')
    }
}
function btnAddClick(){
    addClick('btn1',leftIn);
    addClick('btn2',rightIn);
    addClick('btn3',leftOut);
    addClick('btn4',rightOut);
}

addLoadEvent(btnAddClick);



/*function insertAfter(newNode,targetNode){
 var parent=targetNode.parentNode;
 if(parent.lastChild==targetNode){
 parent.appendChild(newNode);
 }else{
 parent.insertBefore(newNode,targetNode.nextSibling);
 }
 }*/