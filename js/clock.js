getTime();
getTemp();
getCoords();
fillIn();
var numAlarm;



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

function insertAlarm(hours, mins, ampm, alarmName, id)
{
	console.log("insert");
	var numAlarm = id;
	var divElem = $("<div></div>");

	$(".noAlarms").addClass("hide");

	divElem.addClass("flexable");

	divElem.append("<div class=\"" + numAlarm + "\">" + alarmName +"</div>");
	divElem.append("<div class=\"" + numAlarm + "\">" + hours + " : " + mins + ampm + "</div>");
	divElem.append("<input type=\"button\" value=\"Delete Alarm\" class = \"" + numAlarm + " button\" onclick=\"deleteAlarm(this)\"/>");
	$("#alarms").append(divElem);

	
}

function addAlarm()
{
	var hours = $("#hours option:selected").text(); 
	var mins = $("#mins option:selected").text();
	var ampm = $("#ampm option:selected").text();
	var alarmName = $("#alarmName").val();

	console.log("add");

	var AlarmObject = Parse.Object.extend("Alarm");
	var alarmObject = new AlarmObject();
	alarmObject.save({"hours": hours, "mins": mins, "ampm": ampm, "alarmName": alarmName, "userID": userID}, {
		success: function(object) {
			hideAlarmPopup();
			insertAlarm(hours, mins, ampm, alarmName, object.id);
		}
	});

}

function getAllAlarms(userID)
{
	console.log("get Alarms");
	Parse.initialize("zItPQlahSwMhPzZgDXvCGGBAhmJhC8V6Qz9esGok", "uNREjZYFNB1oECctRsbqfaAB1uwhFYOugnrOv3xN");

	var AlarmObject = Parse.Object.extend("Alarm");
	var query = new Parse.Query(AlarmObject);
	query.find({
		success: function(results) {
			for (var i = 0; i < results.length; i++) {
				console.log(userID);
				if(results[i].get("userID") === userID)
				{
					insertAlarm(results[i].get("hours"), results[i].get("mins"), results[i].get("ampm"), results[i].get("alarmName"), results[i].id);
				}
				
			}
		}
	});

}

function deleteAlarm(num)
{
	var cName = $(num).attr("class").split(" ")[0];

	var AlarmObject = Parse.Object.extend("Alarm");
	var query = new Parse.Query(AlarmObject);
	query.get(cName, {
		success: function(object) {
			object.destroy({});
			$("." + cName).remove();
		}
	});



}

function fillIn()
{
	for(var i = 1; i <= 12; i++)
	{
		$("#hours").append("<option>" + i + "</option>");
	}

	for(var i = 0; i <= 9; i++)
	{
		$("#mins").append("<option>0" + i + "</option>");
	}

	for(var i = 10; i <= 60; i++)
	{
		$("#mins").append("<option>" + i + "</option>");
	}
}



