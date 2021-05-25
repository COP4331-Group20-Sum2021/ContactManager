<?php
    $inData = getRequestInfo();

    $username = $inData["login"];
    $conn = new mysqli("localhost", "dbuser", getenv("SQL_PW"), "ContactManager");
    if($conn->connect_error) {
        returnWithError($conn->connect_error);
    } else {
        // existing user check
        $eustmt = $conn->prepare("SELECT password FROM users WHERE login=?");
        $eustmt->bind_param("s", $username);
        $eustmt->execute();
        $euresult = $eustmt->get_result();

        if ($eurow = $euresult->fetch_assoc()) {
            returnWithError("Username already in use.");
        } else {
            // create new user
            $addstmt = $conn->prepare("INSERT INTO users (login, password, firstname, lastname) VALUES (?, ?, ?, ?)");
            $addstmt->bind_param("ssss", $username, $inData["password"], $inData["firstname"], $inData["lastname"]);
            $addstmt->execute();

            returnWithSuccess();

            $addstmt->close();
        }

        $eustmt->close();
    }
    $conn->close();

    function getRequestInfo() {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj) {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError($err) {
        sendResultInfoAsJson('{"status": "error", "message": "' . $err . '"}');
    }

    function returnWithSuccess() {
        sendResultInfoAsJson('{"status": "success", "message": "Login succeeded."}');
    }
?>