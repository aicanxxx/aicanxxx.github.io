### blog.html

准备写blog.html的时候，发现header部分和footer部分是一样的，并没有什么变化，就准备先重写index.html，将header部分和footer部分作为公共部分。

1.对于container部分，子元素blog-center和blog-aside两部分要并列显示，使用了float：left,但是此时脱离了文档流导致container部分的高度为0，那下面footer部分会被blog-center和blog-aside覆盖，故要让container部分的高度被其子元素撑开，有一种方式是在container部分加上overflow：hidden,

但是由于子div中的元素要求使用绝对定位在container的外边，故会被隐藏，行不通，另一种方法就是在container部分后面添加一个子div，只用来clear：both,这样就不会隐藏子div，也使container部分有了高度，不会覆盖footer部分。

2.对于number-list部分的效果，思考了半天好像没有找到用CSS能做出的效果，比如页面在1时，上一页和第一页处于无法点击状态，处于2时，又是可以点击的状态，还有当前页的颜色一直是紫色的，这个效果好像是用JS比较好做。故只做了单独的鼠标无法点击状态，以及鼠标覆盖上去的颜色改变。

3.使用两个<input>标签做了搜索框, 文本框和按钮之间有个间距不知道怎么去掉

<input>是内联块状元素(inline-block)，内联元素是当做字体来处理的，字体之间是有间隔的，所以内联元素之间也是有间隔的;将<input>父级字体(font-size)设为0px，可以消除间隔，但是重新设置内联元素<input>的字体大小。

4.文本框和按钮会上下错开，开始是因为没有给button设置value属性，使button里面没有文字的话他就会把元素底部和父元素的baseline对齐，加入value属性后，会对齐，但是改变字体大小时又会错开，故用float：left使其对齐。