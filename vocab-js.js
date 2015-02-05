var deflist = [];
var words = [];
var poslist = [];
var counter;
$(document).ready(function () {
	$("#enter").click(function () {
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
			var url = "http://api.wordnik.com:80/v4/word.json/"+w+"/definitions?limit=1&includeRelated=false&sourceDictionaries=webster&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
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
		try {
			definition = data[0].text;
			pos = data[0].partOfSpeech;
		}
		catch (e) {
			definition = "DEFINITION NOT FOUND";
			pos = "PART OF SPEECH NOT FOUND";
		}
		console.log("pos: "+pos);
		deflist[i] = definition;
		poslist[i] = pos;
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
		row.appendChild(wordbox);
		row.appendChild(posbox);
		row.appendChild(defbox);
		$("#chart").append(row);
	}
}