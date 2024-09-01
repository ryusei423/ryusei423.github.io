function SetHitokoto(callback){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'https://international.v1.hitokoto.cn?c=a&c=b', true);
    httpRequest.setRequestHeader("Content-type", "application/json");

    const obj = { c: 'j' };
    httpRequest.send(JSON.stringify(obj));

    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText;
            var dataObj = JSON.parse(json);
            var hitokoto_ = dataObj.hitokoto;
            var from_ = dataObj.from;
            document.getElementById("yiyan").innerHTML = hitokoto_;
            document.getElementById("yiyan_1").innerHTML = "--- " + from_;
        }
		
		//告诉回调函数请求的状态
		if (typeof callback === 'function') {
			callback(httpRequest.readyState == 4 && httpRequest.status == 200);
        }
    };
}
