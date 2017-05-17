/**
 * Created by Administrator on 2017/3/24.
 */
/*牛牛手里有N根木棒,分别编号为1~N,现在他从N根里想取出三根木棒，使得三根木棒构成一个三角形,你能计算出牛牛有多少种取法吗?(考虑两种取法中使用的木棒编号有一个不一样就认为是不同的取法)。
 输入描述:
 首先输入一个正整数N，接下来的一行共有N个正整数表示每个木棒的长度。
 N ≤ 50, 木棒的长度 ≤ 10000.
 输出描述:
 输出一个整数表示方法数。
 输入例子:
 5
 1 2 3 4 5
 输出例子:
 3*/
var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});
var n = -1;// 初始状态为负数，表示还没开始读取
var ans = 0;
var cur_line = 0;
rl.on('line', function(line){ // javascript每行数据的回调接口
    // 数据读取
    if(n<0){
        n = line.trim();
    }else {
        var token = line.split(' ');

    }
    if(line2.length!=0){
        findSubStr();
    }
    cur_line += 1;
    // 读取行数结束，如果确定只有一行额外的数据输入，也可以通过cur_line === 1来判断
    if ( cur_line==2) {
        // 重新初始化相关变量
        ans = 0;
        cur_line = 0;
        line1='';
        line2='';
    }
});

function findSubStr() {
    var index=0,i=0,ans=0,j=0;
    var str='';
    //index+1是搜索时的字符的个数
    while (i<line1.length){
        if(i<line1.length-index){
            str=line1.slice(i,i+index+1);
            if(line2.indexOf(str)==-1){
                i++;
                index=index>0?index--:0;
            }else{
                ans = (str.length > ans) ? str.length : ans;
                index++;
            }
        }else {
            break;
        }
    }
    console.log(ans);
}
