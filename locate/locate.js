var lat = 0;
var long = 0;
function getCoords() {	
	if(navigator.geolocation) {
		htmlgeo();
	}
	else {
		ipCheck();	
	}
}

function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}
			
function ipCheck() {
	jQuery.getJSON("http://ip-api.com/json", function (data) {
		if(data.status != "fail") {
			lat = data.lat;
			long = data.lon;
		}
		else {
			lat = google.loader.ClientLocation.latitude;
			long = google.loader.ClientLocation.longitude;
			if(lat == null || long == null) {
				alert("ALL FAILSAFES ERRORED");
				return null;
			}
		}
		printResults(false);	
	});
}

function htmlgeo() {
	if(detectmob()) {
		navigator.geolocation.watchPosition(positiveCallback, ipCheck, {enableHighAccuracy: true});
	}
	else {
		navigator.geolocation.getCurrentPosition(positiveCallback, ipCheck, {enableHighAccuracy: true});
	}
}

function positiveCallback(pos) {
	lat = pos.coords.latitude;
	long = pos.coords.longitude;
	printResults(true);
}

function printResults(a) {
	document.getElementById("txt").innerHTML = "Latitude: "+lat + "\n" + "Longitude: " + long;
	if(detectmob() && a) {
		document.getElementById("mobile").innerHTML = "YOU\'RE ON MOBILE, RUN AROUND IN CIRCLES AND SEE WHAT HAPPENS!" ;	
	}
	else if(detectmob() && !a) {
		document.getElementById("mobile").innerHTML = "ON MOBILE BUT DENIED ACCESS TO GPS" ;
	}
	else {
		document.getElementById("mobile").innerHTML = "DESKTOP/LAPTOP";
	}
}