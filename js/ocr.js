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
            console.log(response);
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

