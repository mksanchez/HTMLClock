redirect_init();

function redirect_init()
{
	console.log("check");

	var params = {}, 
		queryString = location.hash.substring(1),
    	regex = /([^&=]+)=([^&]*)/g, m;

    if (location.search && location.search.indexOf("error") <= 1)
    {
	    console.log("failure");
	    window.close();
  	}	
	else
	{
		while (m = regex.exec(queryString)) 
		{
	  		params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
		}
		alert("WHADDUP " + params.account_username);
		window.close();
		
	}

	

}