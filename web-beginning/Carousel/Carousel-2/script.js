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
function fadeIn(elem){
    for(var i=0;i<list.length;i++){
        setOpacity(list[i],0); //初始全透明
    }
    for(var i=0;i<5;i++){//透明度5次渐进
        (function(i){
            setTimeout(function(){
                setOpacity(elem,20*i);
            },i*100);
        } )(i)
    }

}
function setOpacity(elem, level) {    //设置透明度
    if (elem.filters) {//兼容IE浏览器
        elem.style.filter = "alpha(opacity=" + level + ")";
    } else {
        elem.style.opacity = level / 100;
    }
}

function moveIndex(list,num){//移动小圆圈
    for(var i=0;i<list.length;i++){
        if(list[i].className=='on'){//清除li的背景样式
            list[i].className='';
        }
    }
    list[num].className='on';
}

function main(){
    var imgList=document.getElementById('img').getElementsByTagName('li');
    var list=document.getElementById('index').getElementsByTagName('li');
    var index=0;
    var timer;

    for(var i=0;i<list.length;i++){//鼠标覆盖上哪个小圆圈，图片就移动到哪个小圆圈，并停止
        list[i].index=i;
        list[i].onmouseover= function () {
            var clickIndex=parseInt(this.index);
            index=clickIndex;

            fadeIn(imgList[index]);
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
        if(index>=5){
            index=0
        }
        for(var i=0;i<imgList.length;i++){
            setOpacity(imgList[i],0); //初始全透明
        }
        fadeIn(imgList[index]);
        moveIndex(list,index);
    };
    var play=function(){
        timer=setInterval(function(){
            nextMove();
        },3000);
    };
    play();
}

addLoadEvent(main);