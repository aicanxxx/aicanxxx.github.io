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
function moveElement(ele,x_final,y_final,interval){//移动图片元素

    var x_pos=ele.offsetLeft;
    var y_pos=ele.offsetTop;
    var dist=0;
    if(ele.movement){//防止悬停
        clearTimeout(ele.movement);
    }
    if(x_pos==x_final&&y_pos==y_final){//先判断是否需要移动
        return;
    }
    dist=Math.ceil(Math.abs(x_final-x_pos)/10);//分10次移动完成
    x_pos = x_pos<x_final ? x_pos+dist : x_pos-dist;

    dist=Math.ceil(Math.abs(y_final-y_pos)/10);//分10次移动完成
    y_pos = y_pos<y_final ? y_pos+dist : y_pos-dist;

    ele.style.left=x_pos+'px';
    ele.style.top=y_pos+'px';

    ele.movement=setTimeout(function(){//分10次移动，自调用10次
        moveElement(ele,x_final,y_final,interval);
    },interval)
}

function moveIndex(list,num){//移动小圆点
    for(var i=0;i<list.length;i++){
        if(list[i].className=='on'){//清除li的背景样式
            list[i].className='';
        }
    }
    list[num].className='on';
}

    function main(){
        var img=document.getElementById('img');
        var list=document.getElementById('index').getElementsByTagName('li');
        var index=0;
        var timer;

        for(var i=0;i<list.length;i++){//鼠标覆盖上哪个小圆圈，图片就移动到哪个小圆圈，并停止
            list[i].index=i;//设置index属性
            list[i].onmouseover= function () {
                var clickIndex=parseInt(this.index);
                moveElement(img,-720*clickIndex,0,20);
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
            if(index>=list.length){
                index=0;
            }
            moveIndex(list,index);
            moveElement(img,-720*index,0,20);
        };
        var play=function(){
            timer=setInterval(function(){
                nextMove();
            },2500);
        };
        play();
    }

addLoadEvent(main);