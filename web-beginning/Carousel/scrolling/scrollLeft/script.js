/**
 * Created by Administrator on 2017/7/5 0005.
 */

//往左滚动

window.onload=function () {
    var nav=document.getElementsByTagName('nav')[0];
    var img=document.getElementById('img');
    var list=img.getElementsByTagName('li');
    function scroll() {
        if(nav.scrollLeft==list[list.length-1].offsetLeft){
            nav.scrollLeft=0
        }else{
            nav.scrollLeft++;
        }
    }
    var timer= setInterval(scroll,10);

    nav.onmouseover=function(){
        clearInterval(timer);
    };
    nav.onmouseout=function () {
        timer=setInterval(scroll,10);//必须得对timer重新赋值
    }
};
