# 标签云插件-使用说明
**使用须知**
本插件使用ES6语法编写，请务使用babel进行语法转换
**使用步骤**
1.在HTML中插入标签:如下
``` javascript
<div class="tagBall">
        <p class="tag" >我是标签</p>
		<span class="tag" >可以使用任意html标签</span>
		<span class="tag" >可以使用任意html标签</span>
<div class="tagBall">
```
2.导入cloudTags.js

``` xml
<script src="./cloudTags.js"></script>
```
3.调用函数
``` javascript
 tags();
 //自定义
 tags({fallLength:300,fontSize:20,speedX:2,speedY:1.5});
```
可以不输入参数，也支持自定义，自定时允许输入一个对象，属性列表如下
|属性名     |属性描述     | 默认值| 
| --- | --- |--- |
|   fallLength  |  球的焦点，越大则标签云的球越大   |  300  |    
|  fontSize   | 字体的大小，以这个作为标准变大变小    | 15   |    
|   speedX | 横向速度    | 1   |    
|   speedY  | 纵向速度    |  1  |    
**案例使用**
下载所有文件，查看index.html的内容
