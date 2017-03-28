/**
 * Created by Administrator on 2010/11/18.
 */
/*太复杂 write less do more
$(document).ready(function () {
    $(".menu ul").hide();
    for(var i=0;i<$(".menu").length;i++) {
        menuToggle(i);
    }

});
function menuToggle(index) {
    $(".menu:eq("+index+")").click(function () {
        $(".menu ul:eq("+index+")").toggle();
    })
}*/
$(document).ready(function () {
   $(".menu>a").click(function () {
       $(this).next("ul").slideToggle();
   });
   $(".hmenu>a").hover(function () {
        $(this).next("ul").slideDown();
   },function () {
       $(this).next("ul").slideUp();
   })
});