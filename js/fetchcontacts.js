function getContacts(userid){
	var jsonPayload = JSON.stringify({ "userid": userid});
	
	var xhr = new XMLHttpRequest();
	
	xhr.open("POST", "LAMPAPI/fetch.php", true);
	
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	var result;
    // Send Payload and act on response.
	try
	{
		// Wait for response.
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				// JsonObject holds an object in the format: {results: [], error: "" }
				var jsonObject = JSON.parse(xhr.responseText);
				// Here we return an array with all the results
				var results = jsonObject.results;
				
				// For each result alert their data and "create a new row"
				for (var i = 0; i < results.length; i++){
					// {{insert code to create a new row based on the information}}
					// fields of results[i] => 'id', 'firstname', 'lastname', 'userid', 'phone', 'email', 'description' 
					createRow(results[i]);
				}
			}
		};
		// Send the payload.
		xhr.send(jsonPayload);
	}
	catch(err)
	{
        // Send a register error.
		console.log(err.message);
	}
}

// Simple example using paragraphs
function createRow(userData){
	var para = document.createElement("p");
	var node = document.createTextNode("Firstname: " + userData.firstname + " Lastname: " + userData.lastname);
	para.appendChild(node);

	var element = document.getElementById("div1");
	element.appendChild(para);
}