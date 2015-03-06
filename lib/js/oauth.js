init({"client-id": "3fe42c931f674a9", "type": "token",
		"callback_function":""});

var jObj;

function init(obj)
{
	jObj = obj;
}

function login()
{
	console.log("login");
	window.open(
		"https://api.imgur.com/oauth2/authorize?client_id=" + jObj.client-id + "&response_type=" + jObj.type,
		"AWWWW YEAH");
}