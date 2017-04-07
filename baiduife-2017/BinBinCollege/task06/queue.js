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

function textChangeArr(){
    var textarea=document.getElementById('textarea').value;
    var reg =/(\w.+|[\u4e00-\u9fa5]+)(\r|\t|\n|,|，| |、|)+/g ;
    var arr=[];
    if(textarea.match(reg)) {
        arr=textarea.replace(reg,'$1 ').split(' ');
    }else{
        arr.push(textarea);
    }
   return arr;
}
function find(){
    var queue=document.getElementById('queue');
    var list=queue.getElementsByTagName('li');
    var input=document.getElementById('input').value;
    for(var i=0;i<list.length;i++){
        if(list[i].innerHTML.indexOf(input)!=-1){
            list[i].style.backgroundColor='pink'
        }
    }
}

function newLiNode(value){
    var list=document.createElement('li');
    list.innerHTML=value;
    list.onclick=function(){
        this.parentNode.removeChild(this);
        alert(this.innerHTML);
    };
    return list;
}

function leftIn(){
    var arr=textChangeArr();
    var queue=document.getElementById('queue');
    var eleNode;
    for(var i=arr.length-1;i>=0;i--){
        if(arr[i]!=''){//数组的最后一个有可能是空字符
            eleNode=newLiNode(arr[i]);
            queue.insertBefore(eleNode,queue.firstChild);
        }
    }
}

function rightIn(){
    var arr=textChangeArr();
    var queue=document.getElementById('queue');
    var eleNode=newLiNode();
    for(var i=0;i<arr.length;i++){
        if(arr[i]!=''){//数组的最后一个有可能是空字符
            eleNode=newLiNode(arr[i]);
            queue.appendChild(eleNode);
        }
    }
}
function leftOut(){
    var queue=document.getElementById('queue');
    if(queue.childElementCount!=0){
        alert(queue.firstElementChild.innerHTML);
        queue.removeChild(queue.firstElementChild);
    } else {
        alert('队列中没有元素')
    }

}
function rightOut(){
    var queue=document.getElementById('queue');
    if(queue.childElementCount!=0){
        alert(queue.lastElementChild.innerHTML);
        queue.removeChild(queue.lastElementChild);
    } else {
        alert('队列中没有元素')
    }
}
function btnAddClick(){
    addClick('btn1',leftIn);
    addClick('btn2',rightIn);
    addClick('btn3',leftOut);
    addClick('btn4',rightOut);
    addClick('btn5',find);
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