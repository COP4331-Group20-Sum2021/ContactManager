<?php
    require 'vendor/autoload.php';

    use Google\Cloud\Vision\V1\Feature\Type;
    use Google\Cloud\Vision\V1\ImageAnnotatorClient;
    use Google\Cloud\Vision\V1\Image;
  
    putenv('GOOGLE_APPLICATION_CREDENTIALS=/cred.json');

    function process($file){
        $client = new ImageAnnotatorClient();

        // Annotate an image, detecting faces.
        $annotation = $client->annotateImage(
            $file,
            [Type::TEXT_DETECTION]
        );


        $fullText = $annotation->getFullTextAnnotation()->getText();
        return $fullText;
    }

    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    //echo "$target_file";
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    // Check if image file is a actual image or fake image

    if(isset($_POST["submit"])) {
        $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
        if($check !== false) {
            echo "File is an image - " . $check["mime"] . ".<br><br>\r\n\r\n";
            $uploadOk = 1;
        } else {
            echo "File is not an image.";
            $uploadOk = 0;
        }
    }

    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif" ) {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.<br><br>\n";
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
        // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
            $file = fopen($target_file, 'r');
            $complete = process($file);
            echo "Text Found in the image: <br><br> $complete";
            $arr = explode("\n", $complete);
            //var_dump($arr);
            echo "<br><br>The file ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " has been uploaded.\n";
        } else {
            echo "Sorry, there was an error uploading your file.\n";
        }
    }
?>