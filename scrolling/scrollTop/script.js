/**
 * Created by Administrator on 2017/7/5 0005.
 */
//往上滚动
window.onload=function () {
    var nav=document.getElementsByTagName('nav')[0];
    var list=document.getElementById('img').getElementsByTagName('li');
    function scroll() {
        if(nav.scrollTop==list[list.length-1].offsetTop){
            nav.scrollTop=0;
        }else{
            nav.scrollTop++;
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
