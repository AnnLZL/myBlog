//typewriter
//
function initArray(n) {
    this.length = n;
    for(var i=0;i<n;i++){
        this[i]='';
    }
}

var x = 0;
var current = 0;
var speed1 = 70;   //打字速度
var speed2 = 2000;  //句间停顿

typeText = new initArray(2);
typeText[0] = 'Welcome to my blog!';
typeText[1] = 'May you walk into the world with courage, then come back with a pure heart as before.';

//打字函数
//每次多获取一个待打出的字符串的值，输出，覆盖原来输出的内容即可
function typewriter() {
    var text = typeText[current];
    document.getElementById('typewriter').innerHTML = text.substring(0,x++) + '_';
    if(x==text.length+1){
        x = 0;
        current++;
        if(current>1){
            current = 0;
        }
        setTimeout('typewriter()',speed2);
    }
    else{
        setTimeout('typewriter()',speed1);
    }
}

window.onload = function () {
    typewriter();
}















