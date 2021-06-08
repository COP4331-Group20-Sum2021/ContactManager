function uploadFile() {
    var files = document.getElementById("file").files;
    
    if(files.length > 0 ){
        
		var formData = new FormData();
        formData.append("file", files[0]);
        
        var xhttp = new XMLHttpRequest();
        
        // Set POST method and ajax file path
        xhttp.open("POST", "LAMPAPI/OCR.php", true);
        
        // call on request changes state
        xhttp.onreadystatechange = function() {
			
			if (this.readyState == 4 && this.status == 200) {
				var response = this.responseText;
				
				// Holds an array with the text scanned.
				var myObj = JSON.parse(response);
				
				// Creates an object with potential contactData
				var processedResults = createContactObject(myObj);
				console.log(processedResults);
				
				// Fill up the form with the data extracted from the business card
				updateFields(processedResults);
			}
		};
        
        // Send request with data
        xhttp.send(formData);
        
        }
		else
		{
            alert("Please select a file");
        }
        
}

function createContactObject(textArray) {
	
	var fname = "";
	var lname = "";
	var phone = "";
	var email = "";
	var descr = "OCR-Scan: ";
	
	// Try to use the scanned info to build the userdata.
	for (let i = 0; i < textArray.length; i++){
		
		if (isPhonenumber(textArray[i])){
			phone = textArray[i];
			continue;
		}
		
		if (isName(textArray[i])){
			fname = textArray[i].split(" ")[0];
			lname = textArray[i].split(" ")[1];
			continue;
		}
		
		if (isEmail(textArray[i])){
			email = textArray[i];
			continue;
		}
		// If it's not any of them, we just throw it here for the user to sort it.
		descr += textArray[i] + " ";
		
	}
	
	var obj = {fname: fname, lname: lname, phone: phone, email: email, descr: descr.replace(/\n/g, " ")};
	return obj;

}

function isPhonenumber(currentString){
	
	let amtDigits = 0;
	for (let i = 0; i < currentString.length; i++){
		let currentChar = currentString.charAt(i);
		if (currentChar >= '0' && currentChar <= '9') {
			amtDigits++;
		}
	}
	// Let's say we got a partial phone lol, I'll consider it as a phone number.
	if (amtDigits >= 6)
		return true;
	return false;
	
}

function isName(currentString){
	return currentString.split(" ").length > 1 && !(currentString.includes("@"));
}

function isEmail(currentString){
	return currentString.includes("@");
}

function updateFields(usrObj){
	// document.getElementById("description").style.visibility = 'visible';
	// document.getElementById("firstName").type = 'text';
	// document.getElementById("lastName").type = 'text';
	// document.getElementById("email").type = 'text';
	// document.getElementById("phone").type = 'text';
	document.getElementById('description').value = usrObj.descr;
	document.getElementById("firstName").value = usrObj.fname;
	document.getElementById("lastName").value = usrObj.lname;
	document.getElementById("phone").value = usrObj.phone;
	document.getElementById("email").value = usrObj.email;
}

// Add Contact to Database using API.
// Receives the userid of the person
function ocrContact(userid){
	var fname = document.getElementById("firstName").value;
    var lname = document.getElementById("lastName").value;
	var email = document.getElementById("email").value;
	var phone = document.getElementById("phone").value;
	var desc = document.getElementById("description").value.replace(/\n/g, " ");;
	
	var jsonPayload = JSON.stringify({ "firstname": fname, "lastname" : lname , "phone" : phone, "email" : email, "description": desc, "userid":userid});
	
	var xhr = new XMLHttpRequest();
	
	xhr.open("POST", "LAMPAPI/insertcontact.php", true);
	
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
				console.log(jsonObject);
				alert(xhr.responseText);
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

