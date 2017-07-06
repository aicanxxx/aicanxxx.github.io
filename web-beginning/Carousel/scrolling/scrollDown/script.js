/**
 * Created by Administrator on 2017/7/5 0005.
 */

//往下滚动
window.onload=function () {
    var img=document.getElementById('img');
    var list=img.getElementsByTagName('li');
    function scroll() {
        if(img.scrollTop==0){
            img.scrollTop=list[list.length-1].offsetTop;
        }else{
            img.scrollTop--;
        }
    }
    var timer= setInterval(scroll,10);

    img.onmouseover=function(){
        clearInterval(timer);
    };
    img.onmouseout=function () {
        timer=setInterval(scroll,10);//必须得对timer重新赋值
    }
};
