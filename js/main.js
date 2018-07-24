// 侧边栏滚动效果
//当滚动条上下滚动时，侧边栏随之滚动
//----------------------侧边栏响应滚动条的滑动效果----------------//
var divTop=120;
var pageContentsTop = $('#cr').offset().top;     //pageContents距离文档的位移
$(window).scroll(function(){
    var offsettop ;      //侧边栏的marginTop
    var windowScrollTop = $(window).scrollTop();     //滚动条的垂直位置(滚动时一直在获取)
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
    if($(window).scrollTop() < pageContentsTop){
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

//点击向下的箭头时，缓慢向下滑
$('#scrollDown').bind('click',function () {
    $('html,body').animate({scrollTop:pageContentsTop},{duration:500,queue:false});
});

//回到顶部
//页面滚动事件
var rocket=$("#rocket");
$(window).scroll(function(){
    //获取窗口已滚动的高度
    var windowHeight = $(window).height();           //文档窗口高度
    var windowScrollTop = $(window).scrollTop();
    //如果大于1.4倍的窗口高度，就渐显出“回到顶部”，否则即隐藏
    if(windowScrollTop>windowHeight*1.4)
    {
        rocket.offset({top:windowScrollTop+windowHeight-80});
        rocket.fadeIn();
    }else{
        rocket.fadeOut();
    }
});
rocket.hover(function () {
    rocket.css("color", "#337ab7");
},function () {
    rocket.css("color", "#d3d3d3");
});
rocket.click(function(){
    //点击“回到顶部”，滚动到顶部，并带动画效果
    rocket.fadeIn();
    $("html,body").animate({scrollTop:0},500);
});
//回到顶部的小标签
$('[data-toggle="tooltip"]').tooltip();

//侧边栏效果
$('#js').click(function (e) {
  e.preventDefault();
  $('.post').fadeOut('fast');
  $('.js').fadeIn('fast');
  $('html,body').animate({scrollTop:pageContentsTop},{duration:500,queue:false});
});
$('#css').click(function (e) {
    e.preventDefault();
    $('.post').fadeOut('fast');
    $('.css').fadeIn('fast');
    $('html,body').animate({scrollTop:pageContentsTop},{duration:500,queue:false});
});
$('#allPost').click(function (e) {
    e.preventDefault();
    $('.post').fadeOut('fast').fadeIn('fast');
    $('html,body').animate({scrollTop:pageContentsTop},{duration:500,queue:false});
});
$('#algorithm').click(function (e) {
    e.preventDefault();
    $('.post').fadeOut('fast');
    $('.algorithm').fadeIn('fast');
    $('html,body').animate({scrollTop:pageContentsTop},{duration:500,queue:false});
});
