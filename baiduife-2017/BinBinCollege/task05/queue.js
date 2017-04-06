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
        if(theObj>=10&&theObj<=100)
            return true;
    }
    return false;
}


function newLiNode(){
    var input=document.getElementById('input');
    var list=document.createElement('li');
    if(!checkNumber(input.value)){
        alert('输入有问题，请输入10-100');
        return null;
    }else{
        list.style.height=input.value*5+'px';
        list.style.marginTop=500-input.value*5+'px';
        list.onclick=function(){
            alert((this.offsetHeight)/5);
            this.parentNode.removeChild(this);

        };
        return list;
    }
}
function leftIn(){
    var queue=document.getElementById('queue');
    var eleNode=newLiNode();
    if(eleNode!=null&&queue.childElementCount<=60){
        if(queue.childElementCount<60){
            queue.insertBefore(eleNode,queue.firstChild);
        }else {
            alert('队列元素超出60');
        }
    }
}

function rightIn(){
    var queue=document.getElementById('queue');
    var eleNode=newLiNode();
    if(eleNode!=null) {
        if(queue.childElementCount<60){
            queue.appendChild(eleNode);
        }else {
            alert('队列元素超出60');
        }

    }
}
function leftOut(){
    var queue=document.getElementById('queue');
    if(queue.childElementCount!=0){
        alert(queue.firstElementChild.offsetHeight/5);
        queue.removeChild(queue.firstElementChild);
    } else {
        alert('队列中没有元素');
    }

}
function rightOut(){
    var queue=document.getElementById('queue');
    if(queue.childElementCount!=0){
        alert(queue.lastElementChild.offsetHeight/5);
        queue.removeChild(queue.lastElementChild);
    } else {
        alert('队列中没有元素');
    }
}
function getData(){
    var queue=document.getElementById('queue');
    var list=queue.getElementsByTagName('li');
    var data=[];
    for(var i=0;i<list.length;i++){
        data[i]=list[i].offsetHeight;
    }
    return data;
}
function dataVisualization(){
    var queue=document.getElementById('queue');
    var list=queue.getElementsByTagName('li');
    if(list.length<1){
        alert('队列中没有元素');
        return;
    }
    var arr=getData();
    var i=0;
    var temp,count=0;
    while (i<list.length){
        for (var j=list.length-2;j>=i;j--){
            if(arr[j+1]<arr[j]){
                temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;
                count+=1;
                (function(val,k,p,q){
                    setTimeout(function(){
                        list[val].style.height=p;
                        list[val].style.marginTop=500-p+'px';
                        list[val+1].style.height=q;
                        list[val+1].style.marginTop=500-q+'px';
                    },k*1000);
                })(j,count,arr[j],arr[j+1]);
            }
        }
        i++;
    }
}

function btnAddClick(){
    addClick('btn1',leftIn);
    addClick('btn2',rightIn);
    addClick('btn3',leftOut);
    addClick('btn4',rightOut);
    addClick('btn5',dataVisualization);
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