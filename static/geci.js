var lrc = "";
function getLRC() {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "static/bgm.lrc",false);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            lrc = ajax.responseText;
            //console.log(lrc);
        }
    };
    ajax.send(null);
}
getLRC();


var oLRC = {
    ti: "", //歌曲名
    ar: "", //演唱者
    al: "", //专辑名
    by: "", //歌词制作人
    offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
    ms: [] //歌词数组{t:时间,c:歌词}
};

function createLrcObj(lrc) {
	if(lrc.length==0) return;
    var lrcs = lrc.split('\n');//用回车拆分成数组
    for(var i in lrcs) {//遍历歌词数组
    	lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
        var t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]"));//取[]间的内容
        var s = t.split(":");//分离:前后文字
        if(isNaN(parseInt(s[0]))) { //不是数值
            for (var i in oLRC) {
                if (i != "ms" && i == s[0].toLowerCase()) {
                    oLRC[i] = s[1];
                }
            }
        }else { //是数值
            var arr = lrcs[i].match(/\[(\d+:.+?)\]/g);//提取时间字段，可能有多个
            var start = 0;
            for(var k in arr){
                start += arr[k].length; //计算歌词位置
            }
            var content = lrcs[i].substring(start);//获取歌词内容
            for (var k in arr){
                var t = arr[k].substring(1, arr[k].length-1);//取[]间的内容
                var s = t.split(":");//分离:前后文字
                oLRC.ms.push({//对象{t:时间,c:歌词}加入ms数组
                    t: (parseFloat(s[0])*60+parseFloat(s[1])).toFixed(3),
                    c: content
                });
            }
        }
    }
    oLRC.ms.sort(function (a, b) {//按时间顺序排序
        return a.t-b.t;
    });
    
    // for(var i in oLRC){ //查看解析结果
        // console.log(i,":",oLRC[i]);
    // }
}

createLrcObj(lrc);


var timestamp = Date.now();

function showLRC() {

	
	//console.log((Date.now() - timestamp) / 1000);
	var runingtime = (Date.now() - timestamp) / 1000;
	var s="";
	for(var i in oLRC.ms){
		//console.log(oLRC.ms[i].t);
		var cur = oLRC.ms[i].t;
		//var next = oLRC.ms[i+1].t;
		if( cur < runingtime ){
			s = oLRC.ms[i].c;	
		}
	}
	document.getElementById("logo-little").innerHTML = s;
	document.getElementById("logo-from").innerHTML = "";

}



function GCstart(){
	timestamp = Date.now();
	document.getElementById("logo-from").innerHTML = "";
	setInterval("showLRC()","200");
}