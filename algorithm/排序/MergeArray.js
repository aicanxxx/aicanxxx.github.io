/**
 * Created by Administrator on 2017/3/22 0022.
 * 合并两个有序数组
 */

function mergeArray(arr1,arr2){
    var arr=[];//返回的合并后的数组
    var i=0,j=0;

    while(i<arr1.length&&j<arr2.length){
        if(arr1[i]<arr2[j]){
            arr[i+j]=arr1[i];
            i++;
        }else{
            arr[i+j]=arr2[j];
            j++;
        }
    }
    while (i<arr1.length){
        arr[j+i]=arr1[i++];
    }
    while (j<arr2.length){
        arr[i+j]=arr2[j++];
    }
    return arr;
}
function initial(){
    var a=[2,3,4,5];
    var b=[6,7,8,11,14];
    //var c=[];
    var c= mergeArray(a,b);
}
window.onload=initial();