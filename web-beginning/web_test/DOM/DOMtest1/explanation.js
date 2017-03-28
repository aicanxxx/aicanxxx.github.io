/**
 * Created by Administrator on 2016/11/1.
 */
function displayAbbr(){//显示缩略语列表
    if(!document.getElementsByTagName)return false;
    if(!document.createElement)return false;
    if(!document.createTextNode)return false;
    var defs=[];
    var abbreviation=document.getElementsByTagName("abbr");
    //获取缩略词的title属性以及其缩写
    for(var i=0;i<abbreviation.length;i++){
        //IE6及以下不能识别abbr下子节点的个数，会一直返回0
        if(abbreviation[i].childNodes.length<1)continue;
        var keys=abbreviation[i].lastChild.nodeValue;
        defs[keys]=abbreviation[i].getAttribute("title");
    }
    //创建“定义缩略列表”
    var dList=document.createElement("dl");
    for(keys in defs){
        var dTitle=document.createElement("dt");
        var dTitleText=document.createTextNode(keys);
        dTitle.appendChild(dTitleText);
        var dDesc=document.createElement("dd");
        var dDescText=document.createTextNode(defs[keys]);
        dDesc.appendChild(dDescText);
        dList.appendChild(dTitle);
        dList.appendChild(dDesc);
    }
    //如果abbr不能被识别，则不用执行下面函数
    if(dList.childNodes.length<1)return false;
    var header =document.createElement("h2");
    var headerText=document.createTextNode("Abbreviation");
    header.appendChild(headerText);
    var body=document.getElementsByTagName("body")[0];
    body.appendChild(header);
    body.appendChild(dList);
}

function displayCite(){
    if(!document.getElementsByTagName)return false;
    if(!document.createElement)return false;
    if(!document.createTextNode)return false;
    var quote=document.getElementsByTagName("blockquote");
    for (var i=0;i<quote.length;i++){
        if(!quote[i].getAttribute("cite"))continue;
        var url=quote[i].getAttribute("cite");
        //因为文本节点不能使用appendChild函数，故需找出blockquote里的所有的元素节点，将sup插入最后一个元素节点的子节点中
        //元素节点与文本节点是不同的，文本节点是元素节点的子节点，
        var quoteChilden=quote[i].getElementsByTagName('*');
        if(quoteChilden.length<1)continue;
        //blockquote节点最后一个元素节点
        var ele=quoteChilden[quoteChilden.length-1];
        var link=document.createElement('a');
        link.setAttribute('href',url);
        var linkText=document.createTextNode("source");
        link.appendChild(linkText);
        var sup=document.createElement('sup');
        sup.appendChild(link);
        ele.appendChild(sup);
    }
}

function displayAccessKeys(){
    if(!document.getElementsByTagName)return false;
    if(!document.createElement)return false;
    if(!document.createTextNode)return false;
    var links=document.getElementsByTagName('a');
    var defs=[];
    for(var i=0;i<links.length;i++){
        if(!links[i].getAttribute("accesskey"))continue;
        //获取链接中的accesskey的值以及作用
        var key=links[i].getAttribute("accesskey");
        defs[key]=links[i].lastChild.nodeValue;
    }
    //创建无序列表
    var uList=document.createElement('ul');
    for(var p in defs){//遍历数组
        var str=p+':'+defs[p];
        var list=document.createElement('li');
        var listText=document.createTextNode(str);
        list.appendChild(listText);
        uList.appendChild(list);
    }
    if(uList.childNodes.length<1)return false
    var header=document.createElement('h3');
    var headerText=document.createTextNode("accessKeys");
    header.appendChild(headerText);
    var body=document.getElementsByTagName("body")[0];
    body.appendChild(header);
    body.appendChild(uList);
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

addLoadEvent(displayCite);
addLoadEvent(displayAbbr);
addLoadEvent(displayAccessKeys);