getTime();
getTemp();
getCoords();

function getTime() 
{
	var curTime = document.getElementById("clock");
	curTime.innerHTML = new Date().toLocaleTimeString();
	setTimeout(getTime, 1000);
}



function getTemp() 
{
	$.getJSON("https://api.forecast.io/forecast/7837f416ef960406bf88e82aa9861d88/35.300399,-120.662362?callback=?", displayTemp);
}

function displayTemp(data)
{
	console.log(data);
	$("#forecastLabel").html(data.daily.summary);
	$("#forecastIcon").attr("src", "images/" + data.daily.icon + ".png")

	var array = data.daily.data;
	var length = array.length;

	var maxTemp = array[0].temperatureMax;

	for (var i = 1; i < length; i++)
	{
		if (array[i].temperatureMax > maxTemp)
		{
			maxTemp = array[i].temperatureMax;
		}
	}

	if (maxTemp < 60)
	{
		$("body").addClass("cold");
	}
	if (maxTemp >= 60 && maxTemp < 70)
	{
		$("body").addClass("chilly");
	}
	if (maxTemp >= 70 && maxTemp < 80)
	{
		$("body").addClass("nice");
	}
	if (maxTemp >= 80 && maxTemp < 90)
	{
		$("body").addClass("warm");
	}
	if (maxTemp >= 90)
	{
		$("body").addClass("hot");
	}
}

function getCoords() 
{
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(getPosition, showError);
    } 
    else 
    {	
        $("#locationLabel").html("Geolocation is not supported by this browser.");
    }
}

function getPosition(data)
{
	
	$.getJSON("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + data.coords.latitude 
		+"," + data.coords.longitude + "&sensor=true", displayCity);

}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            $("#locationLabel").html("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            $("#locationLabel").html("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            $("#locationLabel").html("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            $("#locationLabel").html("An unknown error occurred.");
            break;
    }
}

function displayCity(data)
{
	console.log(data);
	$("#locationLabel").html(data.results[0].address_components[2].long_name);
}

function showAlarmPopup()
{
	$("#mask").removeClass("hide");
	$("#popup").removeClass("hide");

}

function hideAlarmPopup()
{
	$("#mask").addClass("hide");
	$("#popup").addClass("hide");
}

function insertAlarm(hours, mins, ampm, alarmName)
{
	var divElem = $('<div></div>');
	divElem.addClass("flexable");

	divElem.append("<div class=\"" + name + "\">" + alarmName +"</div>");
	divElem.append("<div class=\"" + name + "\">" + hours + " : " + mins + ampm + "</div>");
	$("#alarms").append(divElem);

	console.log("check");
}

function addAlarm()
{
	var hours = $("#hours option:selected").text(); 
	var mins = $("#mins option:selected").text();
	var ampm = $("#ampm option:selected").text();
	var alarmName = $("#alarmName").val();

	insertAlarm(hours, mins, ampm, alarmName);
	hideAlarmPopup();
}

