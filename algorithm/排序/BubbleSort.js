/**
 * Created by Administrator on 2017/3/27 0027.
 */
process.stdin.resume();//回复输入流
process.stdin.setEncoding('utf8');

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
}
function bubbleSort(arr,n){
    var i=0;
    var temp;
    while (i<n){
        for (var j=n-2;j>=i;j--){
            if(arr[j+1]<arr[j]){
                temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;
            }
        }
        i++;
    }
}
function main(){
    var arr=readLine().split(' ');
    arr=arr.map(function(item){
        return +item;
    });
    console.log(arr);
    bubbleSort(arr,arr.length);
    console.log(arr);
}