/*牛牛想在[a, b]区间内找到一些数满足可以被一个整数c整除,现在你需要帮助牛牛统计区间内一共有多少个这样的数满足条件？
 输入描述:
 首先输入两个整数a,b,（-5*10^8 ≤ a ≤ b ≤ 5*10^8)
 接着是一个正整数c（1 <= c <= 1000）
 输出描述:
 输出一个整数表示个数。
 输入例子:
 0 14 5
 输出例子:
 3*/
var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});

var ans = 0;
var cur_line = 0;
rl.on('line', function(line){ // javascript每行数据的回调接口
    // 数据读取
    var a=line.split(' ')[0];
    var b=line.split(' ')[1];
    var c=line.split(' ')[2];
    var min=parseInt(a/c);
    var max=parseInt(b/c);
    ans=min<=0?max-min+1:max-min;
    console.log(ans);

    cur_line += 1;
    // 读取行数结束，如果确定只有一行额外的数据输入，也可以通过cur_line === 1来判断
    if ( cur_line==1) {
        // 重新初始化相关变量
        ans = 0;
        cur_line = 0;
    }
});
