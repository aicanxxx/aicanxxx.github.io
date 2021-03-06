/**
 * Created by Administrator on 2017/4/19 0019.
 * 其中0～2行：初始的形状将在这里形成然后下落，这三行用户不可见；3～22行：游戏显示区域；23行，其标记已到屏幕底部。
 */
function addEventLoad(func){
    var oldload=window.onload;
    if(typeof window.onload!='function'){
        window.onload=func;
    }else {
        window.onload=function(){
            oldload();
            func();
        }
    }
}
var tetrisGame={
    area:[],
    nextTab:[],
    Column:10,
    Row:18,
    curBlocks:null,
    nextBlocks:null,
    beforeBlocks:null,
    highScore:0,
    score:0,
    end:0,
    isOver:0,
    Wall:[],
    createTable:function(){
        if(!document.getElementById('table'))return false;
        var table=document.getElementById('table');
        for(let i=0;i<this.Row;i++){//i是行，j是列
            this.area[i]=[];
            this.Wall[i]=[];//初始化Wall为二维数组
            var tabr=document.createElement('tr');
            for(let j=0;j<this.Column;j++){
                var tabd=document.createElement('td');
                tabr.appendChild(tabd);
                this.area[i][j]=tabd;
                this.Wall[i][j]=0;
            }
            table.appendChild(tabr);
        }
        this.createNextTab();
        for(let i=0;i<3;i++){
            for(let j=0;j<this.Column;j++){
                this.area[i][j].style.display='none';
            }
        }
    },
    createNextTab:function(){
        if(!document.getElementById('next'))return false;
        var next=document.getElementById('next');
        for(let i=0;i<4;i++){//i是行，j是列
            this.nextTab[i]=[];
            //this.Wall[i]=[];//初始化Wall为二维数组
            var tabr=document.createElement('tr');
            for(let j=0;j<4;j++){
                var tabd=document.createElement('td');
                tabr.appendChild(tabd);
                this.nextTab[i][j]=tabd;
                //this.Wall[i][j]=0;
            }
            next.appendChild(tabr);
        }
    },
    addClick:function(){
        function addId(eleId,func){
            if(!document.getElementById(eleId))return false;
            var ele=document.getElementById(eleId);
            ele.onclick=function(){
                func();
            }
        }
        function gameBegin(){
            tetrisGame.play();
        }
        function gameOver(){
            tetrisGame.end=1;
            tetrisGame.isOver=1;
        }

        addId('begin',gameBegin);
        addId('end',gameOver);

    },
    showScore:function(){
        if(!document.getElementById('curScore'))return false;
        if(!document.getElementById('highScore'))return false;
        var curScore=document.getElementById('curScore');
        var highScore=document.getElementById('highScore');
        curScore.innerHTML='Score：'+this.score;
        highScore.innerHTML='HighScore：'+this.highScore;
    },
    createShapes:function(){
        var r1=Math.floor(Math.random()*7);
        var r2=Math.floor(Math.random()*5);
        var newBlock;
        switch (r1){
            case 0:newBlock = new I();break;
            case 1:newBlock = new J();break;
            case 2:newBlock = new L();break;
            case 3:newBlock = new O();break;
            case 4:newBlock = new S();break;
            case 5:newBlock = new T();break;
            case 6:newBlock = new Z();break;
        }
        newBlock.color=newBlock.color[r2];
        return newBlock;
    },
    /*getCoordinate:function(){
        for(let i=0;i<4;i++){
            this.curCoordinate[i]=[this.curBlocks.row+this.curBlocks.state[this.curBlocks.curState]['x'+i],
                                   this.curBlocks.col+this.curBlocks.state[this.curBlocks.curState]['y'+i]];
        }
    },*/
    moveL:function(){
        /*var y=0,minval=0;
        this.curBlocks.moveLeft();
        for(let i=0;i<this.curBlocks.gCoordinate.length;i++) {
            y=this.curBlocks.col+this.curBlocks.state[this.curBlocks.curState]['y'+i];
            minval=y<minval?y:minval;
        }
        if(minval<0){
            this.curBlocks.col=this.curBlocks.col+(0-minval);
        }
        for(let i=0;i<this.curBlocks.gCoordinate.length;i++){
            this.curBlocks.gCoordinate[i]=[this.curBlocks.row+this.curBlocks.state[this.curBlocks.curState]['x'+i],
                this.curBlocks.col+this.curBlocks.state[this.curBlocks.curState]['y'+i]];
        }*/
        this.beforeBlocks=this.curBlocks;
        this.curBlocks.moveLeft();
        if(this.isHit()){
            this.curBlocks=this.beforeBlocks;
            this.curBlocks.moveRight();//列数还原
        }else{
            this.isIn();
            for(let i=0;i<this.curBlocks.gCoordinate.length;i++){
                this.curBlocks.gCoordinate[i]=[this.curBlocks.row+this.curBlocks.state[this.curBlocks.curState]['x'+i],
                    this.curBlocks.col+this.curBlocks.state[this.curBlocks.curState]['y'+i]];
            }
        }
    },
    moveR:function(){
        /*var y=0,maxval=0;
        this.curBlocks.moveRight();
        for(let i=0;i<this.curBlocks.gCoordinate.length;i++) {
            y=this.curBlocks.col+this.curBlocks.state[this.curBlocks.curState]['y'+i];
            maxval=y>maxval?y:maxval;
        }
        if(maxval>9){
            this.curBlocks.col=this.curBlocks.col-(maxval-9);
        }
        for(let i=0;i<this.curBlocks.gCoordinate.length;i++){
            this.curBlocks.gCoordinate[i]=[this.curBlocks.row+this.curBlocks.state[this.curBlocks.curState]['x'+i],
                this.curBlocks.col+this.curBlocks.state[this.curBlocks.curState]['y'+i]];
        }*/
        this.beforeBlocks=this.curBlocks;
        this.curBlocks.moveRight();
        if(this.isHit()){
            this.curBlocks=this.beforeBlocks;
            this.curBlocks.moveLeft();//列数还原
        }else{
            this.isIn();
            for(let i=0;i<this.curBlocks.gCoordinate.length;i++){
                this.curBlocks.gCoordinate[i]=[this.curBlocks.row+this.curBlocks.state[this.curBlocks.curState]['x'+i],
                    this.curBlocks.col+this.curBlocks.state[this.curBlocks.curState]['y'+i]];
            }
        }

    },
    moveD:function(){
        var x=0,y=0, maxrow=0,p=0;
        this.beforeBlocks=this.curBlocks;
        this.curBlocks.drop();

        //是否碰撞
        if(this.isHit()){
            this.curBlocks=this.beforeBlocks;
            this.curBlocks.row--;
        }else{
            for(let i=0;i<this.curBlocks.gCoordinate.length;i++){
                this.curBlocks.gCoordinate[i]=[this.curBlocks.row+this.curBlocks.state[this.curBlocks.curState]['x'+i],
                    this.curBlocks.col+this.curBlocks.state[this.curBlocks.curState]['y'+i]];
            }
        }
    },
    changeBlock:function(){
        this.beforeBlocks=this.curBlocks;
        this.curBlocks.change();
        this.isIn();
        if(this.isHit()){
            this.curBlocks=this.beforeBlocks;
        }else{
            for(let i=0;i<this.curBlocks.gCoordinate.length;i++){
                this.curBlocks.gCoordinate[i]=[this.curBlocks.row+this.curBlocks.state[this.curBlocks.curState]['x'+i],
                    this.curBlocks.col+this.curBlocks.state[this.curBlocks.curState]['y'+i]];
            }
        }

    },
    gotoEnd:function(){
        var dist=[],max_row=[],x=0;
        var temp;
        for(let j=0;j<this.curBlocks.gCoordinate.length;j++){
            max_row[j]=this.Row;
            for(let i=0;i<18;i++){
                if(this.Wall[i][this.curBlocks.gCoordinate[j][1]]){
                    max_row[j]=i;//如果方块上有值
                    break;
                }
            }
            dist[j]=max_row[j]-this.curBlocks.gCoordinate[j][0];
        }
        temp=dist[0];
        for(let i=1;i<dist.length;i++){
            if(temp>dist[i]){
                temp=dist[i];
                x=i;//求出距离最小的下标
            }
        }
        this.curBlocks.row += dist[x]-1;
        for(let i=0;i<this.curBlocks.gCoordinate.length;i++){
            this.curBlocks.gCoordinate[i]=[this.curBlocks.row+this.curBlocks.state[this.curBlocks.curState]['x'+i],
                this.curBlocks.col+this.curBlocks.state[this.curBlocks.curState]['y'+i]];
        }
        this.end=1;
    },
    moveBlocks:function(keyCode){
        if(!this.end){
            switch(keyCode){
                case 37:
                    this.clearBlocks();
                    this.moveL();
                    this.printBlocks();
                    break;//left
                case 38:
                    this.clearBlocks();
                    this.changeBlock();
                    this.printBlocks();
                    break;//up
                case 39:
                    this.clearBlocks();
                    this.moveR();
                    this.printBlocks();
                    break;//right
                case 40:
                    this.clearBlocks();
                    this.gotoEnd();//测试
                    this.printBlocks();
                    break;//down
            }
        }
    },
    isHit:function(){
        var x=0,y=0;
        for(let i=0;i<this.curBlocks.gCoordinate.length;i++){
            x=this.curBlocks.row+this.curBlocks.state[this.curBlocks.curState]['x'+i];
            y=this.curBlocks.col+this.curBlocks.state[this.curBlocks.curState]['y'+i];
            if(this.Wall[x][y]){
                return true;//碰撞
            }
        }
        return false;
    },
    isIn:function(){
        var y=0,minval=0,maxval=0;
        for(let i=0;i<this.curBlocks.gCoordinate.length;i++) {
            y=this.curBlocks.col+this.curBlocks.state[this.curBlocks.curState]['y'+i];
            minval=y<minval?y:minval;
            maxval=y>maxval?y:maxval;
        }
        if(minval<0){
            this.curBlocks.col=this.curBlocks.col+(0-minval);
        }
        if(maxval>9){
            this.curBlocks.col=this.curBlocks.col-(maxval-9);
        }
    },
    init:function(){
        this.curBlocks=this.createShapes();
        this.createTable();
        this.showScore();
        this.addClick();
    },
    play:function(){

        this.printBlocks();
        this.nextBlocks=this.createShapes();
        this.printNextBlocks();
        this.keyPress();
        var timer=setInterval(function(){
            if(tetrisGame.end){
                clearInterval(timer);
                tetrisGame.curBlocks=tetrisGame.nextBlocks;
                tetrisGame.clearNextBlocks();
                tetrisGame.end=0;
                if(tetrisGame.isOver){
                    tetrisGame.isOver=0;
                    tetrisGame.clearAll();
                    alert("Game Over");
                }else{
                    tetrisGame.play();
                }
            }else{
                tetrisGame.clearBlocks();
                tetrisGame.moveD();
                tetrisGame.printBlocks();
            }

        },1000);
    },
    keyPress:function(){
        document.onkeydown=function(e){
            if(e && (e.keyCode>=37&&e.keyCode<=40)){
               tetrisGame.moveBlocks(e.keyCode);
            }
        };
    },
    isDelete:function(){
        var num=0,row=0,x=0;
        for(let i=this.Row-1;i>3;i--){//当i=3的时候游戏已经结束
            num=0;
            for(let j=0;j<this.Column;j++){
                if(this.Wall[i][j]==0){
                    break;
                }else{
                    num++;
                }
            }
            if(num==10){
                row=i;
                break;
            }
        }
        if(row){
            for(let i=3;i<this.Row;i++){//当i=3的时候游戏已经结束
                for(let j=0;j<this.Column;j++){
                    if(this.Wall[i][j]){
                        x=i;//求出有值的最小行数
                        break;
                    }
                }
                if(x){
                    break;
                }
            }
            for(let k=row;k>=x;k--){
                for(let j=0;j<this.Column;j++){
                    this.Wall[k][j]=this.Wall[k-1][j];//再将上一行的往下移
                    this.area[k][j].style.backgroundColor=this.area[k-1][j].style.backgroundColor;
                }
            }
            this.score++;
            this.highScore=this.highScore>this.score?this.highScore:this.score;
           /* }else{
                for(let k=0;k<row.length;k++){
                    for(let j=0;j<this.Column;j++){
                        this.Wall[row[k]][j]=0;
                        this.area[row[k]][j].style.backgroundColor='#fff';//先将能消除的删掉

                    }
                }
                for(let k=row[0];k>=x;k--){
                    for(let i=1;i<row.length;i++){
                        if(k-1==row[i]){//判断下一行是否已经消除
                            break;
                        }
                    }
                    for(let j=0;j<this.Column;j++){
                        this.Wall[k][j]=this.Wall[k-1][j];//再将上一行的往下移
                        this.area[k][j].style.backgroundColor=this.area[k-1][j].style.backgroundColor;
                    }
                }
            }*/
            return true;
        }else{
            return false;
        }

    },
    isGameOver:function(){
        //var num=0;
        for(let i=0;i<this.Column;i++){//当i=0的时候游戏已经结束
            if(this.Wall[3][i]==1){
                //setTimeout(function(){
                tetrisGame.isOver=1;
                this.score=0;
                this.showScore();
                break;
               // },2000);
            }
        }
    },

    printBlocks:function(){
        //判断是否为前3行
        if(this.curBlocks.row<3){
            this.curBlocks.row=3;
            while(this.isHit()){
                this.curBlocks.row--;
            }
        }
        var x=0,y=0;
        for(let i=0;i<this.curBlocks.gCoordinate.length;i++){
            x=this.curBlocks.row+this.curBlocks.state[this.curBlocks.curState]['x'+i];
            y=this.curBlocks.col+this.curBlocks.state[this.curBlocks.curState]['y'+i];
            if(x>=this.Row-1){//判断是否到达底部
                this.end=1;
            }else{
                if(this.Wall[x+1][y]){//判断是否碰撞
                    this.end=1;
                }
            }
            this.curBlocks.gCoordinate[i]=[x,y];
        }
        for(let i=0;i<this.curBlocks.gCoordinate.length;i++){
            this.area[this.curBlocks.gCoordinate[i][0]][this.curBlocks.gCoordinate[i][1]].style.backgroundColor=this.curBlocks.color;
        }
        //将已停止下落的方块加入已有方块中
        if(this.end==1){
            for(let i=0;i<this.curBlocks.gCoordinate.length;i++){
                x=this.curBlocks.row+this.curBlocks.state[this.curBlocks.curState]['x'+i];
                y=this.curBlocks.col+this.curBlocks.state[this.curBlocks.curState]['y'+i];
                this.Wall[x][y]=1;
            }
            while(this.isDelete()){
                this.showScore();
            }
            this.isGameOver();

        }
    },
    printNextBlocks:function(){
        var x=0,y=0;
        for(let i=0;i<this.nextBlocks.gCoordinate.length;i++){
            x=this.nextBlocks.state[this.nextBlocks.curState]['x'+i];
            y=this.nextBlocks.state[this.nextBlocks.curState]['y'+i];
            this.nextTab[x][y].style.backgroundColor=this.nextBlocks.color;
        }
    },
    clearBlocks:function(){
        for(let i=0;i<this.curBlocks.gCoordinate.length;i++){
            this.area[this.curBlocks.gCoordinate[i][0]][this.curBlocks.gCoordinate[i][1]].style.backgroundColor='#fff';
        }
    },
    clearNextBlocks:function(){
        for(let i=0;i<this.nextBlocks.gCoordinate.length;i++){
            this.nextTab[this.nextBlocks.state[this.nextBlocks.curState]['x'+i]][this.nextBlocks.state[this.nextBlocks.curState]['y'+i]].style.backgroundColor='#fff';
        }
    },
    clearAll:function(){
        for(let i=0;i<this.Row;i++){//i是行，j是列
            for(let j=0;j<this.Column;j++){
                this.area[i][j].style.backgroundColor='#fff';
                this.Wall[i][j]=0;
            }
        }
    }


};




function Shapes(row,col){
    this.state=[];//是存放四个小方块相对第一个小方块的偏移坐标
    this.row=row;//row和col是4*4的基准坐标，以第一个小方块为准
    this.col=col;
    this.color=["#FFAEC9", "#B5E61D", "#99D9EA", "#C8BFE7", "#B97A57"];
    this.gCoordinate=[];//4个小方块的坐标
    this.curState=0;//默认为第一个形状的偏移量state[0]

    if(!Shapes.prototype.change){
        Shapes.prototype.change=function(){
            if(this.curState+1==this.state.length){
                this.curState=0;
            }else{
                this.curState++;
            }
            //this.isIn();
            /*for(let i=0;i<this.gCoordinate.length;i++){
                this.gCoordinate[i]=[this.row+this.state[this.curState]['x'+i],this.col+this.state[this.curState]['y'+i]];
            }*/
        }
    }

    if(!Shapes.prototype.drop){
        Shapes.prototype.drop=function(){
            this.row++;
            /*for(let i=0;i<this.gCoordinate.length;i++){
                this.gCoordinate[i]=[this.row+this.state[this.curState]['x'+i],this.col+this.state[this.curState]['y'+i]];
            }*/
        }
    }
    if(!Shapes.prototype.moveLeft){
        Shapes.prototype.moveLeft=function(){
            this.col--;
        }
    }
    if(!Shapes.prototype.moveRight){
        Shapes.prototype.moveRight=function(){
            this.col++;
            /*this.isIn();
            for(let i=0;i<this.gCoordinate.length;i++){
                this.gCoordinate[i]=[this.row+this.state[this.curState]['x'+i],this.col+this.state[this.curState]['y'+i]];
            }*/
        }
    }
    /*if(!Shapes.prototype.isIn){
        Shapes.prototype.isIn=function(){
            var y=0, maxval=0,minval=0;
            //右边界,col值
            for(let i=0;i<this.gCoordinate.length;i++){
                y=this.col+this.state[this.curState]['y'+i];
                maxval=y>maxval?y:maxval;
            }
            if(maxval>9){
                this.col=this.col-(maxval-9);
            }
            //左边界
            for(let i=0;i<this.gCoordinate.length;i++) {
                y=this.col+this.state[this.curState]['y'+i];
                minval=y<minval?y:minval;
            }
            if(minval<0){
                this.col=this.col+(0-minval);
            }
        }
    }*/

}
/*function ActivityBlock(row,col){//4*4方块

    if(!ActivityBlock.prototype.drop){
        ActivityBlock.prototype.drop=function(){
            this.row++;
        }
    }
    if(!ActivityBlock.prototype.moveLeft){
        ActivityBlock.prototype.moveLeft=function(){
            this.col--;
        }
    }
    if(!ActivityBlock.prototype.drop){
        ActivityBlock.prototype.drop=function(){
            this.col++;
        }
    }
}*/

function inheritPrototype(child,parent){//寄生组合式继承
    var F=function(){};
    F.prototype=parent.prototype;
    child.prototype=new F();
    child.prototype.constructor=child;
}
function State(r0,c0,r1,c1,r2,c2,r3,c3){//r、c都是偏移量，相对于当前位置的偏移量
    this.x0=r0;
    this.y0=c0;
    this.x1=r1;
    this.y1=c1;
    this.x2=r2;
    this.y2=c2;
    this.x3=r3;
    this.y3=c3;
}
function I(){
    Shapes.call(this,0,3);//类继承，在（0,3）处生成4*4矩阵
    if(!Shapes.prototype.isPrototypeOf(I.prototype)){
        //inheritPrototype(I,Shapes);
        Object.setPrototypeOf(I.prototype,Shapes.prototype);
    }
    this.state[0]=new State(0,0,0,1,0,2,0,3);
    this.state[1]=new State(0,0,1,0,2,0,3,0);
    //初始化第一个形状
    for(let i=0;i<4;i++){
        this.gCoordinate[i]=[this.row+this.state[0]['x'+i],this.col+this.state[0]['y'+i]];
    }
}
function J(){
    Shapes.call(this,0,3);//类继承，在（0,3）处生成4*4矩阵
    if(!J.prototype.isPrototypeOf(Shapes.prototype)){
        //inheritPrototype(J,Shapes);//继承出现问题
        Object.setPrototypeOf(J.prototype,Shapes.prototype);
    }

    this.state[0]=new State(0,1,1,1,2,0,2,1);
    this.state[1]=new State(0,0,1,0,1,1,1,2);
    this.state[2]=new State(0,1,0,2,1,1,2,1);
    this.state[3]=new State(1,0,1,1,1,2,2,2);
    //初始化第一个形状
    for(let i=0;i<4;i++){
        this.gCoordinate[i]=[this.row+this.state[0]['x'+i],this.col+this.state[0]['y'+i]];
    }
}
function L(){
    Shapes.call(this,0,3);//类继承，在（0,3）处生成4*4矩阵
    if(!L.prototype.isPrototypeOf(Shapes.prototype)){
        //inheritPrototype(L,Shapes);
        Object.setPrototypeOf(L.prototype,Shapes.prototype);
    }
    this.state[0]=new State(0,1,1,1,2,1,2,2);
    this.state[1]=new State(1,0,2,0,1,1,1,2);
    this.state[2]=new State(0,0,0,1,1,1,2,1);
    this.state[3]=new State(0,2,1,0,1,1,1,2);
    //初始化第一个形状
    for(let i=0;i<4;i++){
        this.gCoordinate[i]=[this.row+this.state[0]['x'+i],this.col+this.state[0]['y'+i]];
    }
}
function O(){
    Shapes.call(this,0,3);//类继承，在（0,3）处生成4*4矩阵
    if(!O.prototype.isPrototypeOf(Shapes.prototype)){
        //inheritPrototype(O,Shapes);
        Object.setPrototypeOf(O.prototype,Shapes.prototype);
    }
    this.state[0]=new State(0,0,0,1,1,0,1,1);
    //初始化第一个形状
    for(let i=0;i<4;i++){
        this.gCoordinate[i]=[this.row+this.state[0]['x'+i],this.col+this.state[0]['y'+i]];
    }
}
function S(){
    Shapes.call(this,0,3);//类继承，在（0,3）处生成4*4矩阵
    if(!S.prototype.isPrototypeOf(Shapes.prototype)){
        //inheritPrototype(S,Shapes);
        Object.setPrototypeOf(S.prototype,Shapes.prototype);
    }
    this.state[0]=new State(0,0,1,0,1,1,2,1);
    this.state[1]=new State(0,1,0,2,1,0,1,1);
    //初始化第一个形状
    for(let i=0;i<4;i++){
        this.gCoordinate[i]=[this.row+this.state[0]['x'+i],this.col+this.state[0]['y'+i]];
    }
}
function T(){
    Shapes.call(this,0,3);//类继承，在（0,3）处生成4*4矩阵
    if(!T.prototype.isPrototypeOf(Shapes.prototype)){
        //inheritPrototype(T,Shapes);
        Object.setPrototypeOf(T.prototype,Shapes.prototype);
    }
    this.state[0]=new State(0,1,1,0,1,1,1,2);
    this.state[1]=new State(0,1,1,1,1,2,2,1);
    this.state[2]=new State(1,0,1,1,1,2,2,1);
    this.state[3]=new State(0,1,1,0,1,1,2,1);
    //初始化第一个形状
    for(let i=0;i<4;i++){
        this.gCoordinate[i]=[this.row+this.state[0]['x'+i],this.col+this.state[0]['y'+i]];
    }
}
function Z(){
    Shapes.call(this,0,3);//类继承，在（0,3）处生成4*4矩阵
    if(!Z.prototype.isPrototypeOf(Shapes.prototype)){
        //inheritPrototype(Z,Shapes);
        Object.setPrototypeOf(Z.prototype,Shapes.prototype);
    }
    this.state[0]=new State(0,1,1,0,1,1,2,0);
    this.state[1]=new State(0,0,0,1,1,1,1,2);
    //初始化第一个形状
    for(let i=0;i<4;i++){
        this.gCoordinate[i]=[this.row+this.state[0]['x'+i],this.col+this.state[0]['y'+i]];
    }
}
window.onload=function(){
    tetrisGame.init();
}

//addEventLoad(tetrisGame.init);