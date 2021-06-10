var urlBase = 'http://cop4331-group20.ddns.net/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

// =============================================================================
// Register:
// =============================================================================
function doRegister()
{
    // Get entries from the webpage.
    var fname = document.getElementById("firstname").value;
    var lname = document.getElementById("lastname").value;
	var uname = document.getElementById("username").value;
	var pword = document.getElementById("password").value;
	var retype = document.getElementById("passwordRetype").value;
	var hash = md5(pword);
	
    // Set error message to the empty string.
	document.getElementById("registerResult").innerHTML = "";
	
	if (validRegister(fname, lname, uname, pword, retype))
		return;

    // Store the values in the jsonPayload.
	var jsonPayload = JSON.stringify({ "login": uname, "password" : hash , "firstname" : fname, "lastname" : lname });
	var url = urlBase + '/register.' + extension;

    // Create an HTTPRequest.
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    // Send Payload and act on response.
	try
	{
		// Wait for response.
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				// Parse the response.
				var jsonObject = JSON.parse(xhr.responseText);

				// If server sends an error response, throw an error.
				// Otherwise save a cookie and redirect.
				if (jsonObject.status == "error")
				{
					document.getElementById("registerResult").innerHTML = jsonObject.message;

					if(jsonObject.message == "Username already in use.")
						document.getElementById("username").classList.add('error');
				}
				else
				{
					saveCookie();
					window.location.href = "index.html";
					document.getElementById("username").classList.remove('error');
				}
			}
		};
		// Send the payload.
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		if(jsonObject.message == "Username already in use.")
						document.getElementById("username").classList.add('error');

        // Send a register error.
		document.getElementById("registerResult").innerHTML = err;
	}
}

function validRegister(fname, lname, uname, pword, retype)
{
	if (fname == undefined || fname == "" || lname == undefined || lname == "" ||
		uname == undefined || uname == "" || pword == undefined || pword == "" || retype == undefined || retype == "")
	{
		document.getElementById("firstname").classList.add('error');
		document.getElementById("lastname").classList.add('error');
		document.getElementById("username").classList.add('error');
		document.getElementById("password").classList.add('error');
		document.getElementById("passwordRetype").classList.add('error');

		document.getElementById("registerResult").innerHTML = "Field Missing. Please try again.";
		return 1;
	}
	else if (pword.localeCompare(retype) != 0)
	{
		document.getElementById("password").classList.add('error');
		document.getElementById("passwordRetype").classList.add('error');

		document.getElementById("firstname").classList.remove('error');
		document.getElementById("lastname").classList.remove('error');
		document.getElementById("username").classList.remove('error');

		document.getElementById("registerResult").innerHTML = "Passwords do not match. Please try again.";
		return 1;
	}
	else
	{
		document.getElementById("firstname").classList.remove('error');
		document.getElementById("lastname").classList.remove('error');
		document.getElementById("username").classList.remove('error');
		document.getElementById("password").classList.remove('error');
		document.getElementById("passwordRetype").classList.remove('error');
		return 0;
	}
}

// =============================================================================
// Login:
// =============================================================================
function doLogin()
{	
	// Get entrys from the webpage.
	var login = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var hash = md5(password);
	// Set error message to the empty string.
	document.getElementById("loginResult").innerHTML = "";

	if (validLogin(login, password))
		return;

	// Store the values in the jsonPayload.
	var jsonPayload = JSON.stringify({ "login" : login, "password" : hash});
	var url = urlBase + '/Login.' + extension;

	// Create an HTTPRequest.
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	// Send Payload and act on response.
	try
	{
		// Wait for response.
		xhr.onreadystatechange = function()
		{

			if (this.readyState == 4 && this.status == 200) 
			{
				// Parse the response.
				var jsonObject = JSON.parse( xhr.responseText );
				
				// If server sends an error response, throw an error.
				// Otherwise save a cookie and redirect.
				if (jsonObject.id < 1)
				{
					document.getElementById("loginResult").innerHTML = jsonObject.error;

					if(jsonObject.error == "Invalid user name.")
						document.getElementById("username").classList.add('error');
					
					if(jsonObject.error == "Invalid password.")
						document.getElementById("password").classList.add('error');
				}
				else
				{
					userId = jsonObject.id; // Nathan: The api returns an 'id' in the json.
					firstName = jsonObject.firstName;
					lastName = jsonObject.lastName;
					saveCookie();
					window.location.href = "contacts.html";
					document.getElementById("username").classList.remove('error');
					document.getElementById("password").classList.remove('error');
				}
			}
		};
		// Send the payload.
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		// Send a login error.
		document.getElementById("loginResult").innerHTML = err;

		if(jsonObject.error == "Invalid user name.")
						document.getElementById("username").classList.add('error');
					
		if(jsonObject.error == "Invalid password.")
			document.getElementById("password").classList.add('error');
	}
}

function validLogin(login, password)
{
	if (login == undefined || login == "" || password == undefined || password == "")
	{
		document.getElementById("loginResult").innerHTML = "Field Missing. Please try again.";
		document.getElementById("username").classList.add('error');
		document.getElementById("password").classList.add('error');
		
		return 1;
	}
	else
	{
		document.getElementById("username").classList.remove('error');
		document.getElementById("password").classList.remove('error');
		return 0;
	}
}

// =============================================================================
// Cookie Management:
// =============================================================================
function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime() + (minutes * 60 * 1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for (var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if (tokens[0] == "firstName")
		{
			firstName = tokens[1];
		}
		else if (tokens[0] == "lastName")
		{
			lastName = tokens[1];
		}
		else if (tokens[0] == "userId")
		{
			userId = parseInt(tokens[1].trim());
		}
	}
	
	if (userId < 0)
	{
		window.location.href = "index.html";
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

