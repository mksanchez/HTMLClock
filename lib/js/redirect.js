redirect_init();

function redirect_init()
{
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
		window.close();
		while (m = regex.exec(queryString)) 
		{
	  		params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
		}
		console.log(params);
	}


}