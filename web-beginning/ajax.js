/**
 * Created by Administrator on 2016/11/16.
 */
/*
* 兼容浏览器获取XMLHTTP对象*/
function getHttpObject(){
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7, Firefox, Opera, etc.
        xmlhttp=new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {// code for IE6, IE5
        try {
            xmlhttp = new ActiveXObject("Msxm12.XMLHTTP");
        }
        catch(E) {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    if (xmlhttp!=null)
    {
        return xmlhttp;
        /*xmlhttp.onreadystatechange=state_Change;
        xmlhttp.open("GET",url,true);
        xmlhttp.send(null);*/
    }
    else
    {
        alert("Your browser does not support XMLHTTP.");
    }
}


