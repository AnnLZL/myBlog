// 侧边栏滚动效果
//当滚动条上下滚动时，侧边栏随之滚动
//----------------------侧边栏响应滚动条的滑动效果----------------//
var divTop=120;
var pageContentsTop = $('#cr').offset().top;     //pageContents距离文档的位移
$(window).scroll(function(){
    var offsettop ;      //侧边栏的marginTop
    windowScrollTop = $(window).scrollTop();     //滚动条的垂直位置(滚动时一直在获取)
    if($(window).width()>=950){
        if(windowScrollTop<=pageContentsTop){
            offsettop = divTop + 'px';

        }
        else {
            offsettop = divTop + (windowScrollTop - pageContentsTop) + 'px';
        }
        $('#sidebar').animate({marginTop:offsettop},{duration:1200,queue:false});
    }
});

$(window).on("resize",function(){
    if($(window).width()<950){
        $('#sidebar').css({marginTop:divTop});
    }
   else{
        $(window).scroll();
    }
});

// 导航栏的明暗切换效果
// 当滚动条滚到pageContents页面时，将导航栏切换为navbar-default
$(window).scroll(function () {
    var nav = $('nav');
    if(windowScrollTop < pageContentsTop){
       if(nav.hasClass('navbar-defaule')){
           nav.removeClass('navbar-default');
       }
       nav.addClass('navbar-inverse');
    }
    else{
        if(nav.hasClass('navbar-inverse')){
            nav.removeClass('navbar-inverse');
        }
        nav.addClass('navbar-default');
    }
});

//滑过post区域的效果
//曲线阴影，原理：一个图形，带有一个主投影，在其下面有一个带有圆角的图形，它也拥有自己的阴影效果。
//再让这俩个图形发生一个重叠，露出下面带圆角图形的阴影。
$('.post').hover (function () {
    $(this).addClass('effect');
},function () {
    $(this).removeClass('effect');
});

// //计数跳动
// $('div.cell').on('mouseenter',function(){
//
//     var $details=$(this).find('span');
//     if(!$details.hasClass('animation')){
//         $details.addClass('animation');
//     }
//     else {
//         var el= $details,
//             newone = el.clone(true);
//         el.before(newone);
//         $(this).find("." + el.attr("class") + ":last").remove();
//
//     }
//
// });



