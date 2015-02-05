var deflist = [];
var words = [];
var poslist = [];
var exlist = [];
var counter;
$(document).ready(function () {
	$("#enter").click(function () {
		deflist = [];
		words = [];
		poslist = [];
		exlist = [];
		counter = 0;
		var text = $("#text").val();	
		words = text.split(/\s+/g);
		for(var i = 0; i < words.length; i++) {
			if(words[i].length < 2) {
				words.splice(i, 1);
			}
		}
		deflist = [];
		console.log(words);
		counter = 0;
		for(var i = 0; i < words.length; i++) {
			w = words[i];
			console.log(w);
			var url = "http://api.wordnik.com:80/v4/word.json/"+w+"/definitions?limit=1&includeRelated=false&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
			console.log(url);
			addDef(url, i);
		}
	});
});

function addDef(url, i) {
	jQuery.getJSON(url, function (data, status, jq) {							
		console.log(data);
		var definition;
		var pos;
		var example;
		try {
			definition = data[0].text;
			pos = data[0].partOfSpeech;
		}
		catch (e) {
			definition = "DEFINITION NOT FOUND";
			pos = "PART OF SPEECH NOT FOUND";
		}
		try {
			example = data[0].exampleUses[0].text;
			if(typeof example === undefined) {
				example = "EXAMPLE NOT GIVEN";
			}
		}
		catch (e) {
			example = "EXAMPLE NOT FOUND";	
		}
		deflist[i] = definition;
		poslist[i] = pos;
		exlist[i] = example;
		++counter;
		if(counter == words.length) {
			addTerms();
		}
		console.log("deflist["+i+"] = "+deflist);
	});
}

function addTerms() {
	for(var i = 0; i < words.length; i++) {
		var row = document.createElement("tr");
		var wordbox = document.createElement("th");
		wordbox.textContent = words[i];
		var defbox = document.createElement("td");
		defbox.textContent = deflist[i];
		var posbox = document.createElement("td");
		posbox.textContent = poslist[i];
		var exbox = document.createElement("td");
		exbox.textContent = exlist[i];
		row.appendChild(wordbox);
		row.appendChild(posbox);
		row.appendChild(defbox);
		row.appendChild(exbox);
		$("#chart").append(row);
	}
}