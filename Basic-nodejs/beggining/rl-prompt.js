/**
 * Created by Administrator on 2017/3/20 0020.
 */
/*var readline = require('readline');
var  rl = readline.createInterface(process.stdin, process.stdout);

//rl.setPrompt('Test> ');
//rl.prompt();

rl.on('line', function(line) {
    switch(line.trim()) {
        case 'copy':
            console.log("复制");
            break;
        case 'hello':
            console.log('world!');
            break;
        case 'close':
            rl.close();
            break;
        default:
            console.log('没有找到命令！');
            break;
    }
    //rl.prompt();
});

rl.on('close', function() {
    console.log('bye bye!');
    process.exit(0);
});
console.log('hello world');
console.log('debugger');*/
process.stdin.on('end', function() {
    process.stdout.write('end');
});

function gets(cb){
    process.stdin.setEncoding('utf8');
    //输入进入流模式（flowing-mode，默认关闭，需用resume开启），注意开启后将无法read到数据
    //见 https://github.com/nodejs/node-v0.x-archive/issues/5813
    process.stdin.resume();
    process.stdin.on('data', function(chunk) {
        console.log('start!');
        //去掉下一行可一直监听输入，即保持标准输入流为开启模式
        //process.stdin.pause();
        cb(chunk);
    });
    console.log('试着在键盘敲几个字然后按回车吧');
}

gets(function(reuslt){
    console.log("["+reuslt+"]");
    //process.stdin.emit('end'); //触发end事件
});