/**
 * Created by Administrator on 2017/3/24.
 */
/**
 * Created by Administrator on 2017/3/23.
 */
/*牛牛有两个字符串（可能包含空格）,牛牛想找出其中最长的公共连续子串,希望你能帮助他,并输出其长度。
 输入描述:输入为两行字符串（可能包含空格），长度均小于等于50.
 输出描述:输出为一个整数，表示最长公共连续子串的长度。
 输入例子:
 abcde
 abgde
 输出例子:
 2
 */
var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});
var n = -1;// 初始状态为负数，表示还没开始读取
var ans = 0;
var cur_line = 0;
var line1='';
var line2='';
rl.on('line', function(line){ // javascript每行数据的回调接口
    // 数据读取
    if(cur_line==0){
        line1 = line.trim();
    }else if(cur_line==1) {
        line2 = line.trim();
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
/*第二种输入方式process.stdin
process.stdin.resume();//回复输入流
process.stdin.setEncoding('ascii');

var input_stdin = "";//输入的全部数据
var input_stdin_array = "";//输入的每行数据以数组形式存在
var input_currentline = 0;//输入的行数

process.stdin.on('data', function (data) {//接收输入的数据
    input_stdin += data;
    if(data.slice(0,-1)==''){
        process.stdin.emit('end');//输入空的回车结束输入
    }
});

process.stdin.on('end', function () {//end触发
    input_stdin_array = input_stdin.split("\n");
    main();//对输入进行操作
});

function readLine() {
    return input_stdin_array[input_currentline++];//读取每一行的数据
}*/
