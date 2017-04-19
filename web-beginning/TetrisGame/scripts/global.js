/**
 * Created by Administrator on 2017/4/19 0019.
 * 其中0～2行：初始的形状将在这里形成然后下落，这三行用户不可见；3～22行：游戏显示区域；23行，其标记已到屏幕底部。
 */
function addEventLoad(func){
    var oldload=window.onload;
    if(typeof window.onload!='function'){
        window.onload=func;
    }else {
        window.onload=function(){
            oldload();
            func();
        }
    }
}
function State(r0,c0,r1,c1,r2,c2,r3,c3){//r、c都是偏移量，相对于当前位置的偏移量
    this.r0=r0;
    this.c0=c0;
    this.r1=r1;
    this.c1=c1;
    this.r2=r2;
    this.c2=c2;
    this.r3=r3;
    this.c3=c3;
}
function O(){

}