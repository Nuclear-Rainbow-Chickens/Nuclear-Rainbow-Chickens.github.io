
var selectedpart = "";
var selectedpartslot = "";
var doc = loadXMLDoc("motherboards.xml");


function show(name) {
	var obj = document.getElementById(name);
	obj.style.display = "block";
}

function hide(name) {
	var obj = document.getElementById(name);
	obj.style.display = "none";
}

function create(obj) {
	u.getUnity().SendMessage("Control","Create",obj);
}

function swap(check, name) {
	if(document.getElementById(check).checked == false) {
		hide(name);
	}
	else {
		show(name)
	}
}
function componentclick(obj) {
	selectedpart = obj.value;
	selectedpartslot = obj.parentNode.parentNode.parentNode.childNodes[1].textContent.trim();
}
function portclick(obj) {
	if(obj.name == selectedpartslot) {
		obj.value = selectedpart;
		selectedpart = "";
		selectedpartslot = "";
	}
	else {
		document.getElementById("message").textContent = "Wrong Part";
		obj.value = obj.name;
	}
}
function motherclick(obj) {
	createmotherboard(obj.id);
}
function createmotherboard(a) {
	var b;
	for(var i = 0; i < doc.getElementsById("name").length; i++) {
		if(doc.getElementsById("name")[i].nodeValue == a) {
			b = doc.getElementsById("name")[i];
			break;
		}
	}
	
}
function loadXMLDoc(filename) {
	if (window.XMLHttpRequest) {
		xhttp=new XMLHttpRequest();
 	}
	xhttp.open("GET",filename,false);
	xhttp.send();
	return xhttp.responseXML;
}

