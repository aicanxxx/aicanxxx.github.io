/**
 * Created by Administrator on 2017/4/10 0010.
 */
function addLoadEvent(func){
    var oldload=window.onload;
    if(typeof window.onload!='function'){
        window.onload=func;
    }else{
        window.onload=function(){
            oldload();
            func();
        }
    }
}
/*function moveElement(list,index){//移动图片元素
    for(var i=0;i<list.length;i++){
        if(list[i].className=='on'){//清除li的背景样式
            list[i].className='';
        }
    }
    list[index-1].className='on';
}*/

function moveIndex(list,index){//移动小圆圈
    for(var i=0;i<list.length;i++){
        if(list[i].className=='on'){//清除li的背景样式
            list[i].className='';
        }
    }
    list[index-1].className='on';
}

function main(){
    var imgList=document.getElementById('img').getElementsByTagName('li');
    var list=document.getElementById('index').getElementsByTagName('li');
    var index=1;
    var timer;

    for(var i=0;i<list.length;i++){//鼠标覆盖上哪个小圆圈，图片就移动到哪个小圆圈，并停止
        list[i].index=i;
        list[i].onmouseover= function () {
            var clickIndex=parseInt(this.getAttribute('index'));
            moveIndex(imgList,clickIndex-1);
            index=clickIndex;
            moveIndex(list,index);
            clearInterval(timer);
        };
        list[i].onmouseout= function () {//移开后继续轮播
            play();
        };

    }
    //没有将nextMove、play写成函数形式，是因为index是个全局变量，需要对其进行赋值无法传递
    var nextMove=function(){//一直向右移动，最后一个之后返回
        index+=1;
        if(index>5){
            index=1
        }
        moveIndex(list,index);
        moveElement(img,-720*(index-1),0,10);
    };
    var play=function(){
        timer=setInterval(function(){
            nextMove();
        },3000);
    };
    play();
}

addLoadEvent(main);