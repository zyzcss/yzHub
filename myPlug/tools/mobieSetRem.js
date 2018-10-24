//移动端rem设置
function setRem(desW){
    //desW 移动端设计稿宽度 常见750
    //加上meta保持缩放
    //<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    //css 1rem = 100px
    var winW = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = winW/desW * 100 + 'px';
}