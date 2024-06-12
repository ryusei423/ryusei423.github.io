
var sw = true;

function titlebar(){
	if(sw == true){
		document.title = "✧SKYDOME✧";
	}
	else{
		document.title = "✦SKYDOME✦";
	}
}

function switchvar(){
	sw = !sw;
}

setInterval("switchvar()","1000");
titlebar();
setInterval("titlebar()","10");