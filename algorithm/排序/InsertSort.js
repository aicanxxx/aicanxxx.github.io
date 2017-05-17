/**
 * Created by Administrator on 2017/3/30 0030.
 */
var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});

rl.on('line', function(line){ // javascript每行数据的回调接口
    // 数据读取
    var token=line.split(' ');
    token=token.map(function(term){
        return +term;
    });
    binaryInsertSort(token);
    console.log(token);

});

function straightInsertSort(arr) {
    if(1>=arr.length)return;
    for(var i=1;i<arr.length;i++){//i~n-1是未排序部分
        var t=arr[i];
       for(var j=i-1;j>=0;j--){//0~i-1s=是已排序部分
           if(t<arr[j]){
               arr[j+1]=arr[j];//将大于t的数一个一个往后移
               arr[j]=t;
           }else{
               break;
           }
       }
    }
}
function binaryInsertSort(arr) {
    if(1>=arr.length)return;
    for(var i=1;i<arr.length;i++){//i~n-1是未排序部分
        var left=0,right=i-1;
        var mid=parseInt((left+right)/2);
        var j=0;
        var t=arr[i];
        while (left<=right){//当left=right时，执行下面操作会导致left>right，跳出循环
            if(t>arr[mid]){
                left=mid+1;
            } else{
                right=mid-1;
            }
            mid=parseInt((left+right)/2);
        }//此时，t要插入到left的位置
        if(left>right){
            j=left;
        }
        for(var k=i;k>j;k--){
            arr[k]=arr[k-1];
        }
        arr[j]=t;
    }
}

