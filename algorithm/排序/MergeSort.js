/**
 * Created by Administrator on 2017/3/23 0023.
 * 对一个无序的数组进行归并排序，将数组分成多个小数组，知道数组中最多只有2个元素，在子数组内进行排序，然后合并
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
function mergeArray(arr,first,mid,last){
    var i=0,j=0;
    var k=first;
    var arr1=arr.slice(first,mid+1);
    var arr2=arr.slice(mid+1,last+1);
    while(i<arr1.length&&j<arr2.length){
        if(arr1[i]<arr2[j]){
            arr[k++]=arr1[i];
            i++;
        }else{
            arr[k++]=arr2[j];
            j++;
        }
    }

    while (i<arr1.length){
        arr[k++]=arr1[i++];
    }
    while (j<arr2.length){
        arr[k++]=arr2[j++];
    }
}
function mergeSort(arr,first,last){
    var mid=parseInt((first+last)/2);
    if(first<last){
        mergeSort(arr,first,mid);
        mergeSort(arr,mid+1,last);
        mergeArray(arr,first,mid,last);
    }
}
function main(){
    var arr=readLine().split(' ');
    arr=arr.map(function(item){
        return +item;
    });
    console.log(arr);
    mergeSort(arr,0,arr.length-1);
    console.log(arr);
}