<?php
    require 'vendor/autoload.php';

    use Google\Cloud\Vision\V1\Feature\Type;
    use Google\Cloud\Vision\V1\ImageAnnotatorClient;
    use Google\Cloud\Vision\V1\Image;

    putenv('GOOGLE_APPLICATION_CREDENTIALS=/cred.json');

    function process($file) {
        $client = new ImageAnnotatorClient();

        // Annotate an image, detecting text.
        $annotation = $client->annotateImage(
            $file,
            [Type::TEXT_DETECTION]
        );

        $fullText = $annotation->getFullTextAnnotation()->getText();
        return $fullText;
    }

    if(isset($_FILES['file']['name'])) {
        // file name
        $filename = $_FILES['file']['name'];

        // Location
        $location = 'uploads/'.$filename;

        // file extension
        $file_extension = pathinfo($location, PATHINFO_EXTENSION);
        $file_extension = strtolower($file_extension);

        // Valid extensions
        $valid_ext = array("pdf","doc","docx","jpg","png","jpeg");
        //echo $location;
        $response = 0;
        if(in_array($file_extension,$valid_ext)) {
            // Upload file
            if(move_uploaded_file($_FILES['file']['tmp_name'], $location)) {
                $file = fopen($location, 'r');
                $complete = process($file);
                //echo $complete;
                //$arr = explode("\n", $complete);
                returnWithInfo($complete);
            }
        }
    }

    function returnWithInfo($text) {
        $retValue = '{"text":' . $text . '}';
        sendResultInfoAsJson($retValue);
    }

    function sendResultInfoAsJson($obj) {
        header('Content-type: application/json');
        echo $obj;
    }
?>