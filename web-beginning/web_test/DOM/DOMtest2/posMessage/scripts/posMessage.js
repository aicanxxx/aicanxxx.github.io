/**
 * Created by Administrator on 2016/11/3.
 */
function moveMassage(){
    if(!document.getElementById)return false;
    if(!document.getElementById('message'))return false;
    var ele=document.getElementById('message');
    ele.style.position='absolute';
    ele.style.left='50px';
    ele.style.top='150px';
    moveElement('message',200,100,20);
}
addLoadEvent(moveMassage);