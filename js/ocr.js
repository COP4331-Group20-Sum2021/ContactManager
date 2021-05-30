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
	var descr = "Scanned with OCR: ";
	
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
		descr += textArray[i] + "\n";
		
	}
	
	var obj = {fname: fname, lname: lname, phone: phone, email: email, descr: descr};
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

