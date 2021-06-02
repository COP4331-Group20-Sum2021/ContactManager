<?php
    // get the json sent from frontend
    $inData = getRequestInfo();

    // connect to data base
    $conn = new mysqli("localhost", "dbuser", getenv("SQL_PW"), "ContactManager");
    if ($conn->connect_error) {
        // if error, return it to front end
        returnWithError($conn->connect_error);
    } else {
        // creates an sql statement that gets all user info when their login and 
        // password match $inData["login"] and $inData["password"] respectively
        $stmt = $conn->prepare("SELECT id,firstname,lastname FROM users WHERE login=? AND password=?");
        $stmt->bind_param("ss", $inData["login"], $inData["password"]);

        // run the sql statement and get the results
        $stmt->execute();
        $result = $stmt->get_result();

        // check if there was a result row
        if ($row = $result->fetch_assoc()) {
            // if there was a result row, return the login info
            returnWithInfo($row['firstname'], $row['lastname'], $row['id']);
            // updates the last logged in date of the user
            $upstmt = $conn->prepare("UPDATE users SET datelastloggedin=CURRENT_TIMESTAMP WHERE id=?");
            $upstmt->bind_param("s", $row["id"]);
            $upstmt->execute();
        } else {
            // gets the user password for the given log in
            $stmt2 = $conn->prepare("SELECT password FROM users WHERE login=?");
            $stmt2->bind_param("s", $inData["login"]);
            $stmt2->execute();
            $result2 = $stmt2->get_result();

            if ($row2 = $result2->fetch_assoc()) {
                // if the second sql statement returned something, the login matched another login in the database, 
                // and therefore the password supplied didnt match with that login
                returnWithError("Invalid password.");
            } else {
                // if the second sql statement didnt return something, the login didnt match another login in the database
                returnWithError("Invalid user name.");
            }
            $stmt2->close();
        }

        $stmt->close();
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

    // helper function to return with an error state
    function returnWithError($err) {
        $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    // helper function to return with a login success
    function returnWithInfo($firstName, $lastName, $id) {
        $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
        sendResultInfoAsJson($retValue);
    }
?>
