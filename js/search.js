//根据元素的id获取元素
var getDOM = function (id) {
    return document.getElementById(id);
}
//相比于element.onclick=function(){},它可以给一个元素绑定多个事件
var addEvent = function (id, event, fn) {   //处理浏览器的兼容性
    var el = getDOM(id)||document;
    if(el.addEventListener){             //addEventListener适用于非IE浏览器
        el.addEventListener(event, fn, false);
    }else if(el.attachEvent){            //attachEvent适用于IE浏览器
        el.attachEvent('on'+event,fn);
    }
}
var getElementLeft = function (element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current!=null){
        actualLeft +=current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}
var getElementTop = function (element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current!=null){
        actualTop +=current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}
var ajaxGet = function (url, callback) {
    var _xhr = null;
    if(window.XMLHttpRequest){     //在非IE浏览器下使用XMLHttpRequest
        _xhr = new window.XMLHttpRequest();
    }else if(window.ActiveXObject){    //在IE浏览器下使用ActiveXObject
        _xhr = new ActiveXObject('Msxml2.XMLHTTP');
    }
    _xhr.onreadystatechange = function () {
        if(_xhr.readyState == 4 && _xhr.status == 200){
            //当readyState==4并且status==200时，表示服务器正确响应并返回信息
            callback(JSON.parse(_xhr.responseText));    //responseText：作为响应主体被返回的文本
            //JSON.parse()的作用是把字符串转化为JS可以识别的对象
        }
    }
    _xhr.open('get', url, false);  //要使用Ajax技术，第三个参数必须设置为false,表示异步
    _xhr.send(null);
}
//为JS动态生成的网页元素添加事件时，通常要使用事件代理来实现
var delegateEvent = function (target, event,fn) {
    addEvent(document,event,function (e) {
        if(e.target.nodeName == target.toUpperCase()){
            fn.call(e.target);
        }
    });
}
//匹配函数
var seqSearch = function (arr,urls,data) {
    var html ='';
    var tags = eval('/('+data+')/i');
    for(var i = 0; i<arr.length;i++){
        var matches = tags.exec(arr[i]);
        if(matches){
            var index = matches.index;     //匹配项在字符串中的位置
            var input = matches.input;     //应用正则表达式的字符串
            html += '<li title ='+urls[i]+'>'+input.slice(0,index)+'<span style="color: red "> '+data+'</span>'+input.slice(index+data.length)+'</li>';
        }
    }
    if(html){
        return html;
    }
    else{
        alert('没有找到搜索结果，请重新输入');
    }
}

addEvent('search','click',function (e) {
    e.preventDefault();
    getDOM('search-box').style.display = 'block';
    var _dom = getDOM('search-suggest');
    addEvent('search_input', 'keyup', function () {
        var searchText = getDOM('search_input').value;
        ajaxGet('https://annlzl.github.io/myBlog/search.json', function (data) {
            var names=[];
            var urls=[];
            if(data.code==0){
                for(var element in data.data){
                    var item=data.data[element];
                    names.push(item.title);
                    urls.push(item.url);
                }
            }
            var html = seqSearch(names,urls,searchText);
            getDOM('search-result').innerHTML = html;
            _dom.style.width = getDOM('search-form').width;
            _dom.style.top = getElementTop(getDOM('search-form'))+getDOM('search-form').height+'px';
            _dom.style.left = getElementLeft(getDOM('search-form'))+'px';
            // _dom.style.position = 'absolute';
            _dom.style.display = 'block';
        });
    });
    addEvent('search_input','keyup',function (e) {
        if(e.keyCode == 13){
            getDOM('search-result').querySelector('li').click();
        }
    });
    // var li = getDOM('search-result').querySelectorAll('li');
    // console.log(li);
    // delegateEvent('li', 'click', function () {
    //     var url = this.getAttribute('title');
    //     location.href = 'myBlog'+url;
    //
    // });
    // addEvent(document,'click',function () {
    //     _dom.style.display = 'none';
    // });
    addEvent('close','click',function () {
        getDOM('search-box').style.display = 'none';
    })
});
delegateEvent('li', 'click', function () {
    var url = this.getAttribute('title');
    location.href = 'myBlog'+url;
});
