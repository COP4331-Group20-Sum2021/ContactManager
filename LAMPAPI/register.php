<?php
    // get the json sent from frontend
    $inData = getRequestInfo();

    // create a var for the login
    $username = $inData["login"];
    
    // connect to data base
    $conn = new mysqli("localhost", "dbuser", getenv("SQL_PW"), "ContactManager");
    if($conn->connect_error) {
        // if error, return it to front end
        returnWithError($conn->connect_error);
    } else {
        // existing user check
        // creates an sql statement that will get all users that have the login that was sent to this end point
        // if thise statement returns a result, then a user with that login already exists, and another will not be created 
        $eustmt = $conn->prepare("SELECT password FROM users WHERE login=?");
        $eustmt->bind_param("s", $username);
        $eustmt->execute();
        $euresult = $eustmt->get_result();

        if ($eurow = $euresult->fetch_assoc()) {
            // if there was a result, return with error, cannot have more than one user with the same login
            returnWithError("Username already in use.");
        } else {
            // create new user
            // creates a new sql statement to inster the new user into the data base
            $addstmt = $conn->prepare("INSERT INTO users (login, password, firstname, lastname) VALUES (?, ?, ?, ?)");
            $addstmt->bind_param("ssss", $username, $inData["password"], $inData["firstname"], $inData["lastname"]);
            $addstmt->execute();

            // blindly returns with a success condition (THIS IS BAD AND WILL BE ADDRESSED EVENTUALLY)
            returnWithSuccess();

            $addstmt->close();
        }

        $eustmt->close();
    }
    $conn->close();

    // helper function to get the input from front end and decode the json to a named array
    function getRequestInfo() {
        return json_decode(file_get_contents('php://input'), true);
    }

    // helper function to return the given object back to the front end, specifying the type as json. it is assumed $obj is already a json string
    function sendResultInfoAsJson($obj) {
        header('Content-type: application/json');
        echo $obj;
    }

    // helper function to send back an error with the specified message
    function returnWithError($err) {
        sendResultInfoAsJson('{"status": "error", "message": "' . $err . '"}');
    }

    // function to return a success state
    function returnWithSuccess() {
        sendResultInfoAsJson('{"status": "success", "message": "Register succeeded."}');
    }
?>