/*
 * 运动的步骤
 * 1.闪的效果（瞬间宽高都变为0，scale，随机）
 * 2.图片从小变大，同时透明度从1变到0（必需是上一步效果走完了，它才会走这一步）
 * 3.图片旋转，同时透明度从0变为1,有层次感（[先远，再旋转，同时回到最初的位置]位移translate）（当所有图片透明度都变为0的时候，
 * 才走这一步）
 */

window.onload = function () {
    var btn = document.getElementById("pictures-btn");
    var imgs = document.querySelectorAll("#imgWrap img");
    var on = true;     //这个变量用来决定用户是否可以再次点击（true 代表可以点，false代表不可以点）

    //给btn添加点击事件
    btn.onclick = function () {
        if(!on){
            return;
        }
        on = false;

        var endNum = 0;    //运动完成的图片数量
        var allEnd = 0;    //用来判断所有的图片是否都运动完了
        for(var i=0;i<imgs.length;i++){
            (function (i) {
                setTimeout(function () {
                    montion(imgs[i],'10ms',function () {
                        this.style.transform = 'scale(0)';
                    },function () {
                        //第二个运动要在这里写
                        montion(this,'1s',function () {
                            this.style.transform = 'scale(1)';
                            this.style.opacity = 0;
                        },function () {
                            endNum++;    //只要有一张图片走完了，就让它加个1

                            if(endNum == imgs.length){
                                toBig();
                            }
                        })
                    });
                },Math.random()*1000);
            })(i)
        }
        function toBig() {
            //这个函数用来做第三个效果
            for(var i=0;i<imgs.length;i++){
                imgs[i].style.transition = '';
                //想要一个物体有css3当中的一些变化，那就需要给他一个初始值
                imgs[i].style.transform = 'rotateY(0deg) ' +
                    'translateZ(-'+Math.random()*500+'px)';

                //用这种方式去写是因为想要在循环里面找到i的值
                (function(i){
                    setTimeout(function () {
                        montion(imgs[i],'2s',function () {
                            this.style.opacity = 1;
                            this.style.transform =  'rotateY(-360deg) ' +
                                'translateZ(0px)';
                        },function () {
                            allEnd++;
                            if(allEnd == imgs.length){
                                //这个条件成立说明所有的图片都运动完了，然后就可以让用户再次点击了
                                on = true;   //当所有运动完了以后，用户才可以点
                            }
                        });
                    },Math.random()*1000);

                })(i);

            }
        };
    };

    //运动函数（运动的对象，运动的时间，运动的属性函数，运动完成后要做的事情）
    function montion(obj,time,doFn,callBack) {
        obj.style.transition = time;
        doFn.call(obj);   //调用函数，并把this的指向给obj

        var called = false;  //解决transitionend调用多次的bug（调用一次montion,只会有一个transitionend）

        obj.addEventListener('transitionend',function () {
            if(!called){
                callBack&&callBack.call(obj);
                called = true;
            }
        },false);
    }

};


