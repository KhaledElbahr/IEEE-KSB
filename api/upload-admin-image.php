<?php

        require('access-control.php');
        require('connect.php');

        $id = $_GET['id'];

if(isset($_FILES['myFile']) && $id != null){

  $name = $_FILES['myFile']['name'];
  $target_dir = "../src/assets/images/";
  $target_file = $target_dir . basename($_FILES["myFile"]["name"]);

  // Select file type
  $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

  // Valid file extensions
  $extensions_arr = array("jpg","jpeg","png","gif");

  // Check extension
  if( in_array($imageFileType,$extensions_arr) ){

     $sql = "UPDATE admin SET image = ? WHERE id = ? LIMIT 1";

                    $statement = $con->prepare($sql);
                    $statement->execute(array($name,$id));

                    // Upload file
                    move_uploaded_file($_FILES['myFile']['tmp_name'],$target_dir.$name);


                    $response = array(
                        "status" => "success",
                        "error" => false,
                        "message" => "File uploaded successfully",
                    );


                    echo json_encode($response);
                }

                else
                {
                    $response = array(
                        "status" => "error",
                        "error" => true,
                        "message" => "wrong extension !"
                    );

                    echo json_encode($response);
                }
        }


        else
        {
                $response = array(
                        "status" => "error",
                        "error" => true,
                        "message" => "error occured !"
                    );

                    echo json_encode($response);
        }


?>
