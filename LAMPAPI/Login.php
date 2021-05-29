<?php
    $inData = getRequestInfo();

    error_reporting(-1); // reports all errors
    ini_set("display_errors", "1"); // shows all errors
    ini_set("log_errors", 1);
    ini_set("error_log", "/tmp/php-error.log");

    $id = 0;
    $firstName = "";
    $lastName = "";

    $conn = new mysqli("localhost", "dbuser", getenv("SQL_PW"), "ContactManager");
    if($conn->connect_error) {
        returnWithError($conn->connect_error);
    } else {
        $stmt = $conn->prepare("SELECT id,firstname,lastname FROM users WHERE login=? AND password=?");
        $stmt->bind_param("ss", $inData["login"], $inData["password"]);
        $stmt->execute();
        $result = $stmt->get_result();

        if($row = $result->fetch_assoc()) {
            returnWithInfo($row['firstname'], $row['lastname'], $row['id']);
            $upstmt = $conn->prepare("UPDATE users SET datelastloggedin=CURRENT_TIMESTAMP WHERE id=?");
            $upstmt->bind_param("s", $inData["id"]);
            $upstmt->execute();
        } else {
            $stmt2 = $conn->prepare("SELECT password FROM users WHERE login=?");
            $stmt2->bind_param("s", $inData["login"]);
            $stmt2->execute();
            $result2 = $stmt2->get_result();

            if($row2 = $result2->fetch_assoc()) {
                returnWithError("Invalid password.");
            } else {
                returnWithError("Invalid user name.");
            }
            $stmt2->close();
        }

        $stmt->close();
        $conn->close();
    }

    function getRequestInfo() {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj) {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError($err) {
        $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    function returnWithInfo($firstName, $lastName, $id) {
        $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
        sendResultInfoAsJson($retValue);
    }
?>
