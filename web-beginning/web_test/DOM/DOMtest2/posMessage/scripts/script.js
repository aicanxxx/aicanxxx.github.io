/**
 * Created by Administrator on 2016/11/3.
 */
function moveElement(elementID,final_x,final_y,interval){
    if(!document.getElementById)return false;
    if(!document.getElementById(elementID))return false;
    var ele=document.getElementById(elementID);
    var xpos=parseInt(ele.style.left);
    var ypos=parseInt(ele.style.top);
    if(xpos==final_x&&ypos==final_y){
        return true;
    }
    if(xpos<final_x)xpos++;
    if(xpos>final_x)xpos--;
    if(ypos<final_y)ypos++;
    if(ypos>final_y)ypos--;
    ele.style.left=xpos+"px";
    ele.style.top=ypos+"px";
    var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    movement=setTimeout(repeat,interval);
}
function addLoadEvent(func){
    var oldonload=window.onload;
    if(typeof window.onload!='function'){
        window.onload=func;
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}