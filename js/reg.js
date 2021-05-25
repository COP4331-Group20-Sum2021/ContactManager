// Get url and extension.
var urlBase = 'http://cop4331-group20.ddns.net/LAMPAPI';
var extension = 'php';




function doRegister()
{
	userId = 0;

    // Get entrys from the webpage.
	var uname = document.getElementById("username").value;
	var pword = document.getElementById("password").value;
    var fname = document.getElementById("firstname").value;
    var lname = document.getElementById("lastname").value;
    //	var hash = md5( password );
	
    // Get error message.
	document.getElementById("loginResult").innerHTML = "";

    // Store the values in the jsonPayload.
    //	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = '{"login" : "' + uname + '", "password" : "' + pword + '", "firstname" : "' + fname + '", "lastname" "' + lname + '"}';
	var url = urlBase + '/register.' + extension;

    // Create an HTTPRequest.
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    // Check state and send payload.
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if(userId < 1)
				{		
					document.getElementById("loginResult").innerHTML = jsonObject.error;
					return;
				}

				saveCookie();
	
				window.location.href = "contacts.html";
				
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
        // Send a register error.
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime() + (minutes * 60 * 1000));	
	document.cookie = "firstName=" + fName + ",lastName=" + lName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if(tokens[0] == "firstName")
		{
			firstName = tokens[1];
		}
		else if(tokens[0] == "lastName")
		{
			lastName = tokens[1];
		}
		else if(tokens[0] == "userId")
		{
			userId = parseInt(tokens[1].trim());
		}
	}
	
	if(userId < 0)
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}