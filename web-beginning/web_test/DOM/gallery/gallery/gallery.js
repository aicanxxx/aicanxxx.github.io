/**
 * Created by Administrator on 2016/10/24.
 */
function showPictures(whichpic){
    //替换图片
    var pic=whichpic.getAttribute('href');
    var placeHolder=document.getElementById("placeholder");
    placeHolder.setAttribute("src", pic);

    //替换文字
    var title=whichpic.getAttribute('title');
    var description=document.getElementById("description");
    description.firstChild.nodeValue=title;
    return false;//使onclick函数的返回值为false表示连接没有被点击，即连接不会打开新窗口
}
