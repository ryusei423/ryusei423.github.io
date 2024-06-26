
//一言丁真 鉴定为:js

function SetTitle(){
	var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
	httpRequest.open('POST', 'https://v1.hitokoto.cn?c=a&c=b', true); //第二步：打开连接/***发送json格式文件必须设置请求头 ；如下 - */
	httpRequest.setRequestHeader("Content-type", "application/json");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）var obj = { name: 'zhansgan', age: 18 };
	
	//这个设置参数的方法不知道为什么没有用 直接写在链接里了
	const obj = {
	   c: 'j'
	}
	
	httpRequest.send(JSON.stringify(obj));//发送请求 将json写入send中
	/**
	 * 获取数据后的处理程序
	 */
	httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
	  if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
		var json = httpRequest.responseText;//获取到服务端返回的数据
		console.log(json);
		var dataObj = eval("(" + json + ")");  // 转换为json对象
		var hitokoto_ = dataObj.hitokoto;
		var from_ = dataObj.from
		document.getElementById("logo-little").innerHTML = hitokoto_;
		document.getElementById("logo-from").innerHTML = "--- " + from_;
	}
	
	
};
}