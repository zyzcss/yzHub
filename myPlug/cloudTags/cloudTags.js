 /* 
            fallLength:焦距 越大则越远
         */
        function tags({
            fallLength=300,
            fontSize=15,
            speedX=1,
            speedY=1,
            }={}){
            /* 
                container:外层容器
                tags:所有标签 放进一个数组中
                cX:圆心x
                cY:圆心y
                eX:容器的左间距 算上滚动条
                eY:容器的上间距 算上滚动条
                angleX:
                angleY:
                arr:存放tag类的容器
             */
            let container=document.querySelector(".tagBall"),
                tags=[...container.querySelectorAll(".tag")],
                R=container.offsetWidth>container.offsetHeight?container.offsetHeight/2:container.offsetWidth/2,
                cX=container.offsetWidth/2,
                cY=container.offsetHeight/2,
                eX=container.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft,
                eY=container.offsetTop + document.body.scrollTop + document.documentElement.scrollTop,
                angleX=Math.PI/R,
                angleY=Math.PI/R,
                speedx=speedX/10000,
                speedy=speedY/10000,
                arr=[];
            /* 
                标签类
             */
            class Tag{
                /* 
                    ele:标签对象
                    x:x轴
                    y:y轴
                    z:虚拟的z轴 根据z列出方程来控制近大远小
                 */
                constructor(ele,x,y,z){
                    this.ele=ele;
                    this.x=x;
                    this.y=y;
                    this.z=z;
                }
                /* 
                    每次改变xyz后可以通过move刷新页面中的效果
                 */
                move(){
                    /* 
                        scale:关于字体大小与层次的方程
                        alpha:透明度的方程
                     */
                    let scale=fallLength/(fallLength-this.z),
                        alpha=(this.z+R)/(2*R),
                        ele=this.ele;
                    ele.style.fontSize=fontSize*scale+"px";
                    ele.style.opacity=alpha+0.5;
                    ele.style.zIndex=parseInt(scale*100);
                    ele.style.left=this.x+cX-ele.offsetWidth/2+"px";
                    ele.style.top=this.y+cX-ele.offsetHeight/2+"px";
                }
            }
            /* 
                初始化
             */
            function init(){
                if(document.all){
                    window.style='.tag{display: block;position: absolute;left: 0px;top: 0px;color: #000;text-decoration: none;font-family: "微软雅黑";font-weight: bold;white-space:nowrap;}'; 
                    document.createStyleSheet("javascript:style"); 
                }else{
                    let style = document.createElement('style'); 
                    style.type = 'text/css'; 
                    style.innerHTML='.tag{display: block;position: absolute;left: 0px;top: 0px;color: #000;text-decoration: none;font-family: "微软雅黑";font-weight: bold;white-space:nowrap;}'; 
                    document.getElementsByTagName('HEAD').item(0).appendChild(style); 
                } 
                let len=tags.length,
                    j=0;
                for(let i of tags){
                    /* 
                        空间坐标系的x,y,z坐标
                            x = r * sinθ * cosΦ;   
                            y = r * sinθ * sinΦ;  
                            z = r * cosθ;
                        θ与Φ的公式如下
                            θ = arccos(((2 * i) - 1) / len - 1);
                            Φ = θ * sqrt(len * π);
                        旋转公式如下x1,y1新坐标
                            x1 = cosθ * x - sinθ * y;
                            y1 = cosθ * y + sinθ * x;
                        θ=>a,Φ=>b
                        x,y,z套公式可得
                     */
                    let k=(2*(j+++1)-1)/len - 1,
                        a=Math.acos(k),
                        b=a*Math.sqrt(len*Math.PI),
                        x=R*Math.sin(a)*Math.cos(b),
                        y=R*Math.sin(a)*Math.sin(b),
                        z=R*Math.cos(a),
                        tag=new Tag(i,x,y,z);
                    //由于颜色是固定的 所以并不在move方法里设置
                    i.style.color="rgb("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+")";;
                    arr.push(tag);
                    tag.move(); 
                }
            }
            /* 
                鼠标移动时更改方向和速度
             */
            container.addEventListener("mousemove",function(event){
                let x = event.clientX - eX - cX;
                let y = event.clientY - eY - cY;
                angleY = x*speedx;
                angleX = y*speedy;
            })
            /* 
                x轴旋转 竖着转 且改变z 
                y = ycosθ - zsinθ;
                z = ysinθ + zcosθ;
             */
            function rotateX() {
                let cos = Math.cos(angleX),
                    sin = Math.sin(angleX);
                arr.forEach(function(tag) {
                    let y = tag.y * cos - tag.z * sin,
                        z = tag.z * cos + tag.y * sin;
                    tag.y = y;
                    tag.z = z;
                })
            };
            /* 
                绕y轴旋转  横着转 且改变z 
                x = xcosθ - zsinθ;
                z = xsinθ + zcosθ;
             */
            function rotateY() {
                let cos = Math.cos(angleY),
                    sin = Math.sin(angleY);
                arr.forEach(function(tag) {
                    let x = tag.x * cos - tag.z * sin,
                        z = tag.z * cos + tag.x * sin;
                    tag.x = x;
                    tag.z = z;
                })
            };
            /* 
                使用requestAnimationFrame代替定时器
             */
            function animate(){
                rotateX();
                rotateY();
                arr.forEach(function(tag){
                    tag.move();
                });
                window.requestAnimationFrame(animate);
            }
            init();
            window.requestAnimationFrame(animate);
        }   
        