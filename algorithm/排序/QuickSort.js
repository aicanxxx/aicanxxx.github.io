/**
 * Created by Administrator on 2017/3/30 0030.
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
function quickSort1(arr,left,right){//方法1：基准值为数组的第一个数
    var i=left;//从左边向右遍历,初始值为0
    var j=right;//从右边向左遍历，初始值为n-1
    var temp=arr[i];//基准值为数组的第一个数，左边为小于temp的值，右边为大于temp的值
    while (i!=j){
        while (arr[j]>=temp&&(i<j))j--;
        //此时arr[j]小于temp，则需将arr[j]移到左边
        if(i<j)arr[i++]=arr[j];
        while (arr[i]<=temp&&(i<j))i++;
        //此时arr[i]大于temp，则需将arr[i]移到左边
        if(i<j)arr[j--]=arr[i];
    }
    //当i与j重合后，arr[j]的值已经被移走了
    arr[i]=temp;//arr[j]=temp;
    //由于i=j;arr[i]之前的是小于基准值，arr[i]之后的值为大于基准值,不需对arr[i]进行排序
    if(left<i-1)quickSort1(arr,left,i-1);//截取数组0~i-1的i个数
    if(right>i+1)quickSort1(arr,i+1,right);//截取数组i+1~n-1的n-i-1个数
}
function quickSort2(arr,left,right){//方法2：基准值为数组左、中、右三个值中的中间值
    var mid=parseInt((left+right)/2);
    var temp;//基准值为数组左、中、右三个值中的中间值，左边为小于temp的值，右边为大于temp的值
    //进行比较交换,使arr[left]值为三个值得中间值
    if(arr[left]>arr[mid]){//交换后arr[left]<arr[mid]
        temp=arr[mid];
        arr[mid]=arr[left];
        arr[left]=temp;
    }
    if(arr[right]>arr[mid]){//交换后arr[right]<arr[mid]
        temp=arr[mid];
        arr[mid]=arr[right];
        arr[right]=temp;
    }
    if(arr[left]<arr[right]){//交换后arr[left]>arr[right]
        temp=arr[right];
        arr[right]=arr[left];
        arr[left]=temp;
    }

    //此时arr[left]的值为中间值
    var i=left;//从左边向右遍历,初始值为0
    var j=right;//从右边向左遍历，初始值为n-1
    temp=arr[i];

    while (i!=j){
        while (arr[j]>=temp&&(i<j))j--;
        //此时arr[j]小于temp，则需将arr[j]移到左边
        if(i<j)arr[i++]=arr[j];
        while (arr[i]<=temp&&(i<j))i++;
        //此时arr[i]大于temp，则需将arr[i]移到左边
        if(i<j)arr[j--]=arr[i];
    }
    //当i与j重合后，arr[j]的值已经被移走了
    arr[i]=temp;//arr[j]=temp;
    //由于i=j;arr[i]之前的是小于基准值，arr[i]之后的值为大于基准值,不需对arr[i]进行排序
    if(left<i-1)quickSort2(arr,left,i-1);//截取数组0~i-1的i个数
    if(right>i+1)quickSort2(arr,i+1,right);//截取数组i+1~n-1的n-i-1个数
}
function main(){
    var arr=readLine().split(' ');
    arr=arr.map(function(item){
        return +item;
    });
    console.log(arr);
    //quickSort1(arr,0,arr.length-1);
    quickSort2(arr,0,arr.length-1);
    console.log(arr);
}