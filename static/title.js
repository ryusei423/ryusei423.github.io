
var sw = true;

function switchvar(){
	sw = !sw;
	if(sw == true){
		document.title = "✧SKYDOME✧";
	}
	else{
		document.title = "✦SKYDOME✦";
	}
}

setInterval("switchvar()","1000");
