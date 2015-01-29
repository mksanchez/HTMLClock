function getTime() 
{
	var curTime = document.getElementById("clock");
	curTime.innerHTML = new Date().toLocaleTimeString();
	setTimeout(getTime, 1000);
}

getTime();

function getTemp() 
{
	$.getJSON("https://api.forecast.io/forecast/7837f416ef960406bf88e82aa9861d88/35.300399,-120.662362?callback=?", dailySummary);
}

function dailySummary(data)
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


getTemp();
