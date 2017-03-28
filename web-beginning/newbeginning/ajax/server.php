<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/11/17
 * Time: 10:08
 */
//echo "hello php";

if(isset($_GET['name'])){
    echo "hello: ".$_GET['name'];
}else{
    echo "args error!";
}