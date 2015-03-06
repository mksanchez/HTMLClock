init({"clientId": "3fe42c931f674a9", "type": "token",
		"callback_function":"http://ec2-54-148-209-181.us-west-2.compute.amazonaws.com/staging/lib/redirect.html"});

var jObj;

function init(obj)
{
	jObj = obj;
}

function login()
{
	console.log("login");
	window.open(
		"https://api.imgur.com/oauth2/authorize?client_id=" + jObj.clientId + "&response_type=" + jObj.type,
		"AWWWW YEAH");
}