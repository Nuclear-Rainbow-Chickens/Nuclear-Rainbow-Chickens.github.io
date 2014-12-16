var lat = 0;
var long = 0;
function getCoords() {
	ipCheck();
	if(navigator.geolocation) {
		htmlgeo();
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
			jQuery.getJSON("http://www.geoplugin.net/json.gp", function (datab) {
				lat = datab.geoplugin_latitude;
				long = datab.geoplugin_longitude;
			});
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
		navigator.geolocation.watchPosition(positiveCallback, function () {}, {enableHighAccuracy: true});
	}
	else {
		navigator.geolocation.getCurrentPosition(positiveCallback, function () {});
	}
}

function positiveCallback(pos) {
	lat = pos.coords.latitude;
	long = pos.coords.longitude;
	printResults(true);
}

function printResults(a) {
	if(lat != 0 && long != 0 && !a) {
		return null;
	}
	else {
		document.getElementById("txt").innerHTML = "Latitude: "+lat + "\n" + "Longitude: " + long;
		if(detectmob() && a) {
			document.getElementById("mobile").innerHTML = "YOU\'RE ON MOBILE, RUN AROUND IN CIRCLES AND SEE WHAT HAPPENS!" ;	
		}
		else if(detectmob() && !a) {
			document.getElementById("mobile").innerHTML = "ON MOBILE BUT DENIED ACCESS TO GPS" ;
		}
		else if(!a) {
			document.getElementById("mobile").innerHTML = "DESKTOP/LAPTOP DENIED LOCATION SERVICES";
		}
		else {
			document.getElementById("mobile").innerHTML = "DESKTOP/LAPTOP";
		}
	}
}