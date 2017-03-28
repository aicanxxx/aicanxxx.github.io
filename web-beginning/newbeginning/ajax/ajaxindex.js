/**
 * Created by Administrator on 2016/11/17.
 */
$(document).ready(function(){
    $("#btn").on("click",getName);
});
function getName() {
    $.get("server.php",{name:$("#name").val()},function (data) {
        $("#results").text(data);
        //document.getElementById("results").innerHTML=data;
    }).error (function () {
        $("#results").text("找不到网页");
    });
}