init({"client-id": "3fe42c931f674a9", "type": "token",
		"callback_function"});

var obj;

function init(obj)
{
	obj = this.obj;
}

function login()
{
		window.open(
			"https://api.imgur.com/oauth2/authorize?client_id=obj.client-id&response_type=obj.type",
			"AWWWW YEAH");
}