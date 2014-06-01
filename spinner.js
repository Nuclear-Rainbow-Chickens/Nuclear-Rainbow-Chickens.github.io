document.write("<h1>Welcome to Spinner Probability Simulator!</h1>");
document.write('<p>Debug Mode?<input type="checkbox" id="debug"></p> </br>');
document.write("<p>Name of the section:</p>");
document.write('<input type="text" id="name">');
document.write("<p>Numeric Value:</p>");
document.write('<input type="number" id="num" min="1" max="1000" step="1"> </br>');
document.write('<input type="button" id="enter" value="Add Section" onclick="add()"> </br>');
document.write('<p>How many times do you want to spin? <input type="number" min="1" id="repeat"></p>');
document.write('<input type="button" id="spin" value="Click here to spin when you are done!" onclick="spin()">');
      
var values = [];
var sections = [];
var chosen=[];
var total = 0;
var debug = document.getElementById("debug");
      
function add()
{
   	var box = document.getElementById("name");
   	var num = document.getElementById("num");
   	sections.push(box.value);
   	if(debug.checked == true) 
   	{
      document.body.innerHTML += "<p>values.length is " + values.length + " </p>";
      document.body.innerHTML += "<p>num.value is " + num.value + " </p>";
      document.body.innerHTML += "<p>Sections array contains  " + sections.toString() + " </p>";
   	}
 	total = values.length + Number(num.value);
   	if(debug.checked == true) 
    {
   		document.body.innerHTML += "<p>total is " +total+ " </p>";
 	}
    for(var i = 0; i < num.value; i += 1)
    {
      	if(debug.checked == true) 
      	{
      		document.body.innerHTML += "<p>pushing box.value is " + box.value + " </p>";
      	}
      	values.push(box.value);
    }
    document.body.innerHTML += "<p>Added section " +box.value+ " with value of: " +num.value +"</p>";
    document.getElementById("total").innerHTML = "The current total number of sections is: " +values.length;
}
      
function spin() 
{
	var repeat = document.getElementById("repeat");
	if(debug.checked == true)
	{
		document.body.innerHTML += "<p>Array Values are:" +values.toString()+ "</p>";
	}
	for(var x = 0; x < repeat.value; x++)
    {
       var selected = (Math.round(Math.random() * values.length) - 1 );
       if(selected < 1)
       {
       	selected = 0;
       }
       if(debug.checked == true)
       {
       	document.body.innerHTML += "<p>Selected Value is: " +selected+ "</p>";
       }
       chosen.push(values[selected]);
    }
    document.getElementById("total").innerHTML = "The Spinner Chose: " +chosen.toString()+ '<input type="button" value="Click here to sort!" id="sort" onclick="sort()">';
}

function search(section) 
{
	var count = 0;
	for (var i = 0; i < chosen.length; i++) 
	{
		if (chosen[i] === section) 
		{
			count++;
		}
	}
   	return count;
}

function sort()
{
	var tempstring = "";
	for(var z = 0; z < sections.length; z++)
	{
		tempstring += sections[z]+ " appears " +search(sections[z])+ " times or about " +(Math.round((search(sections[z]) / chosen.length) * 10000) / 100)+ " % of the time or " +search(sections[z])+ "/" +chosen.length+ " of the time. \n";
	}
	window.alert(tempstring);
}
			



