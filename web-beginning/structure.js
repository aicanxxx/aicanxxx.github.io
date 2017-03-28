/**
 * Created by Administrator on 2016/10/28.
 */
/*
* 用于存储数据结构类型，比如栈、队列、链表等*/

/*
* 栈：后进先出
* function Stack(){}
* 创建空栈：var stack=new Stack();*/
function Stack(){//创建一个Stack的对象
    var items=[];
    this.push= function(element){//添加一个或几个元素到栈顶
        items.push(element);
    };
    this.pop=function(){//移除并返回栈顶的元素
        return items.pop();
    };
    this.peek= function(){//返回栈顶的元素
        return items[items.length-1];
    };
    this.isEmpty=function(){//是否为空，若为空为true
        return items.length==0;
    };
    this.clear=function(){//移除所有元素
        items=[];
    };
    this.size=function(){//返回栈里元素个数
        return items.length;
    };
    this.print=function(){//将元素输出在控制台
        console.log(items.toString());
    }
}

/*
* 十进制转换成其他任意进制
* function baseConverter(decNumber,base){}
* decNumber:需要转换的十进制数
* base:转换的进制*/
function baseConverter(decNumber,base){
    var remStack=new Stack();
    var rem,baseString='';
    var digits='0123456789ABCDEF';
    while(decNumber>0){
        rem=Math.floor(decNumber%base);
        remStack.push(rem);
        decNumber=Math.floor(decNumber/base);
    }
    while(!remStack.isEmpty()){
        baseString +=digits[remStack.pop()];
    }
    return baseString;
}

/*队列：先进先出
* function Queue(){}
* 创建空队列：var queue=new Queue()*/
function Queue(){
    var items=[];
    this.enqueue= function(element){//向队列尾部添加一个（多个）新的元素
        items.push(element);
    };
    this.dequeue=function(){//移除并返回队列的第一项
        return items.shift();
    };
    this.front=function(){//返回队列中第一个元素
        return items[0];
    };
    this.isEmpty=function(){//是否为空，若为空为true
        return items.length==0;
    };
    this.size=function(){//返回队列元素个数
        return items.length;
    };
    this.print=function(){//将元素输出在控制台
        console.log(items.toString());
    }
}

/*
 * 循环队列--击鼓传花
 * 某一时刻传花停止，这个时候花在谁手里，谁就退出游戏，直至只剩一个孩子（胜者）
 * function hotPotato(nameList,num){}*/
function hotPotato(nameList,num){
    var queue=new Queue();
    for(var i=0;i<nameList.length;i++){
        queue.enqueue(nameList[i]);
    }
    var eliminated='';
    while (queue.size()>1){
        for (i=0;i<num;i++){
            queue.enqueue(queue.dequeue());//从队列开头移到队列末尾
        }
        eliminated=queue.dequeue();
        console.log(eliminated);
    }
    return queue.dequeue();
}
/*
* 优先队列：优先级高，排在队列前面，优先级高低0-10
* function PriorityQueue(){}
* 创建：var priorityQueue=new priorityQueue();*/
function PriorityQueue(){
    var items=[];
    function QueueElement(element,priority){//创建一个队列节点，包含元素和优先级
        this.element=element;
        this.priority=priority;
    }
    this.enqueue= function(element,priority){//添加元素
        var queueElement=new QueueElement(element,priority);
        if(this.isEmpty()){
            items.push(queueElement);
        }else{
            var added=false;
            for(var i=0;i<items.length;i++){
                if(queueElement.priority<items[i].priority){
                    items.splice(i,0,queueElement);
                    added=true;
                    break;
                }
            }
            if(!added){
                items.push(queueElement);
            }
        }
    }
}

/*
* 单向链表
* function LinkedList(){}
* 创建空链表：var linkedList=new function LinkedList();*/
function LinkedList(){
    var Node=function(element){
        this.element=element;
        this.next=null;
    };
    var length=0;
    var head=null;
    this.append= function (element) {//向列表尾部添加一个或多个新的项，可以输入数组
        var node=new Node(element);
        var current;
        if(head==null){
            head=node;
        }else{
            current=head;
            while (current.next){
                current=current.next;
            }
            current.next=node;
        }
        length++;
    };
    this.insert=function(position,element){//向列表特定位置插入一个新的项
        if(position>=0&&position<=length){
            var node=new Node(element);
            var current=head;
            var previous,index=0;
            if (position===0){
                node.next=current;
                head=node;
            }else {
                while (index++<position){
                    previous=current;
                    current=current.next;
                }
                node.next =current;
                previous.next=node;
            }
            length++;
            return true;
        }else {
            return false;
        }
    };
    this.removeAt=function(position){//从列表特定位置移除一项
        if(position>-1&&position<length){
            var current=head;
            var previous,index=0;
            if(position===0){
                head=current.next;
            }else {
                while (index++<position){
                    previous=current;
                    current=current.next;
                }
                //将previous与current的下一项连接起来，跳过current
                previous.next=current.next;
            }
            length--;
            return current.element;
        }else {
            return null;
        }
    };
    this.indexOf=function(element){//返回元素在列表中的索引，如果没有则返回-1
        var current=head;
        var index=-1;
        while(current){
            index++;
            if(element===current.element){
                return index;
            }
            current=current.next;
        }
        return -1;
    };
    this.remove=function(element){//从列表中移除一项
        var index=this.indexOf(element)
        return this.removeAt(index);
    };
    this.isEmpty=function(){//链表是否为空，若是为true，否则false
        return length===0;
    };
    this.size=function(){//返回链表中元素个数
        return length;
    };
    this.toString=function(){//由于列表中使用了Node类，需重写toString，让其只输出元素的值以‘，’隔开组成的字符串
        var current=head;
        /*var string='';
        while (current){
            string=current.element;
            current=current.next;
        }
        return string;*/
        var arr=[];
        while (current){
            arr.push(current.element);
            current=current.next;
        }
        return arr.join();
    };
    this.getHead=function(){//返回的是头部的类型，即Node对象
        return head;
    };
    this.print=function(){//打印列表的值
        var string=this.toString();
        console.log(string);
    };
}

/*
 * 双向链表：一个指针指向下一个元素，一个指针指向上一个元素
 * 迭代方法：从头到尾或者从尾到头
 * function DoublyLinkedList(){}*/
function DoublyLinkedList(){
    var Node=function(element){
        this.element=element;
        this.next=null;
        this.prev=null;
    };
    var length=0;
    var head=null;
    var tail=null;
    this.append= function (element) {//向列表尾部添加一个或多个新的项，可以输入数组
        var node=new Node(element);
        var current;
        if(head==null){
            head=node;
            tail=node;
        }else{
            current=tail;
            current.next=node;
            node.prev=current;
            tail=node;
        }
        length++;
    };
    this.insert=function(position,element){//向列表特定位置插入一个新的项
        if(position>=0&&position<=length){
            var node=new Node(element);
            var current=head;
            var previous,index=0;
            if (position===0){
                if(head==null){
                    head=node;
                    tail=node;
                }else {
                    node.next=current;
                    current.prev=node;
                    head=node;
                }
            }else if (position===length){
                current=tail;
                current.next=node;
                node.prev=current;
                tail=node;
            }else{
                while (index++<position){
                    previous=current;
                    current=current.next;
                }
                node.next =current;
                current.prev=node;
                node.prev=previous;
                previous.next=node;
            }
            length++;
            return true;
        }else {
            return false;
        }
    };
    this.removeAt=function(position){//从列表特定位置移除一项
        if(position>-1&&position<length){
            var current=head;
            var previous,index=0;
            if(position===0){
                head=current.next;
                if(length===1){
                    tail=null
                }else {
                    head.prev=null;
                }
            }else if (position===length-1){
                current=tail;
                tail=current.prev;
                tail.next=null;
            } else {
                while (index++<position){
                    previous=current;
                    current=current.next;
                }
                //将previous与current的下一项连接起来，跳过current
                previous.next=current.next;
                current.next.prev=previous;
            }
            length--;
            return current.element;
        }else {
            return null;
        }
    };
    this.indexOf=function(element){//返回元素在列表中的索引，如果没有则返回-1
        var current=head;
        var index=-1;
        while(current){
            index++;
            if(element===current.element){
                return index;
            }
            current=current.next;
        }
        return -1;
    };
    this.remove=function(element){//从列表中移除一项
        var index=this.indexOf(element);
        return this.removeAt(index);
    };
    this.isEmpty=function(){//链表是否为空，若是为true，否则false
        return length===0;
    };
    this.size=function(){//返回链表中元素个数
        return length;
    };
    this.toString=function(){//由于列表中使用了Node类，需重写toString，让其只输出元素的值以‘，’隔开组成的字符串
        var current=head;
        /*var string='';
         while (current){
         string +=current.element;
         current=current.next;
         }
         return string;*/
        var arr=[];
        while (current){
            arr.push(current.element);
            current=current.next;
        }
        return arr.join();
    };
    this.getHead=function(){//返回的是头部的类型，即Node对象
        return head;
    }
    this.print=function(){//打印列表的值
        var string=this.toString();
        console.log(string);
    };
}
/*
* 集合:一组无序且唯一的项，以[值，值]的形式存储
* function Set(){}
* 使用对象创建set类而不是数组，是因为对象不允许有两个相同的属性*/
function Set(){
    var items={};
    this.has= function (value) {
        return items.hasOwnProperty(value);
    };
    this.add=function (value){
        if(!this.has(value)){
            items[value]=value;
            return true;
        }
        return false;
    };
    this.remove=function(value){
        if(this.has(value)){
            delete items[value];
            return true;
        }
        return false
    };
    this.clear= function () {
        items={};
    };
    this.size=function(){
        var count=0;
        for(var prop in items){
            if(items.hasOwnProperty(prop)){
                ++count;
            }
        }
        return count;
    };
    this.values = function() {
        var keys = [];
        for (var key in items) {
            if(items.hasOwnProperty(key)){
                keys.push(key);
            }
        }
        return keys;
    };
    this.union = function(otherSet) {//并集
        //初始化一个新集合，用于表示并集。
        var unionSet = new Set();
        //将当前集合转换为数组，并依次添加进unionSet
        var values = this.values();
        for (var i=0; i < values.length; i++) {
            unionSet.add(values[i]);
        }
        //将其它集合转换为数组，依次添加进unionSet。
        //循环中的add方法保证了不会有重复元素的出现
        values = otherSet.values();
        for (i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }

        return unionSet;
    };
    this.intersection = function(otherSet) {//交集
        //初始化一个新集合，用于表示交集。
        var interSectionSet = new Set();
        //将当前集合转换为数组
        var values = this.values();
        //遍历数组，如果另外一个集合也有该元素，则interSectionSet加入该元素。
        for (var i = 0; i < values.length; i++) {

            if (otherSet.has(values[i])) {
                interSectionSet.add(values[i])
            }
        }
        return interSectionSet;
    };
    this.difference = function(otherSet) {//差集：两个集合不相同的元素
        //初始化一个新集合，用于表示差集。
        var differenceSet = new Set();
        //将当前集合转换为数组
        var values = this.values();
        //遍历数组，如果另外一个集合没有该元素，则differenceSet加入该元素。
        for (var i = 0; i < values.length; i++) {

            if (!otherSet.has(values[i])) {
                differenceSet.add(values[i])
            }
        }
        return differenceSet;
    };
    this.subset = function(otherSet) {//子集,otherSet为父集
        // 第一个判定,如果该集合长度大于otherSet的长度
        // 则直接返回false
        if (this.size() > otherSet.size()) {
            return false;
        } else {
            // 将当前集合转换为数组
            var values = this.values();

            for (var i = 0; i < values.length; i++) {

                if (!otherSet.has(values[i])) {
                    // 第二个判定。只要有一个元素不在otherSet中
                    // 那么则可以直接判定不是子集，返回false
                    return false;
                }
            }
            return true;
        }
    };
}

/*
* 字典：以[键，值]的形式存储一组不重复的元素
* function Dictionary(){}*/
function Dictionary(){
    var items={};
    this.set=function(key,value){//向字典中添加新元素
        items[key]=value;
    };
    this.remove= function(key){//通过使用键值来从字典中移除键值对应的数据值
        if(this.has(key)){
            delete items[key];
            return true;
        }
        return false;
    };
    this.has=function(key){//如果某个键值存在于这个字典中，则返回true，反之则返回false
        return items.hasOwnProperty(key);
    };
    this.get=function(key){//通过键值查找特定的数值并返回
        if(this.has(key)){
            return items[key];
        }
        return undefined;
    };
    this.clear=function(){//将这个字典中的所有元素全部删除
        items={};
    };
    this.size=function(){//返回字典所包含元素的数量。与数组的length属性类似
        var count=0;
        for(var p in items){
            if(this.has(p)){
                ++count;
            }
        }
        return count;
    };
    this.keys=function(){//将字典所包含的所有键名以数组形式返回
        var keys=[];
        for(var p in items){
            if(this.has(p)){
                keys.push(p);
            }
        }
        return keys;
    };
    this.values=function(){//将字典所包含的所有数值以数组形式返回
        var values=[];
        for(var p in items){
            if(this.has(p)){
                values.push(items[p]);
            }
        }
        return values;
    };
}

/*
* 散列表：使用散列函数，给定一个键值，能快速返回值在表中的地址。
* 散列函数：将键值与唯一的存储地址对应起来，不需要进行键值的比较
* 这里散列函数选取为简单的将每个键值中的每个字母的ASCII值相加*/
function HashTable(){
    var table={};
    var loseloseHashCode= function (key) {//散列函数，私有方法
        var hash=0;
        for(var i=0;i<key.length;i++){
            hash +=key.charCodeAt(i);
        }
        return hash%37;//为得到比较小的数值，我们会使用hash值和一个任意数做除法的余数（ mod）。
    };
    this.put=function(key,value){//向散列表增加一个新的项（也能更新散列表）
        var position=loseloseHashCode(key);
        table[position]=value;
        console.log(position+'-'+key);
    };
    this.remove=function(key){//根据键值从散列表中移除值
        table[loseloseHashCode(key)]=undefined;
    };
    this.get= function(key){//返回根据键值检索到的特定的值
        return table[loseloseHashCode(key)];
    };
}