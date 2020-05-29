<?php

        require('access-control.php');
        require('connect.php');

        $id = $_GET['id'];

        if(isset($_FILES['myFile']) && $id != null)
        {
        
                $name = $_FILES['myFile']['name'];
                $target_dir = "uploads/";
                $target_file = $target_dir . basename($_FILES["myFile"]["name"]);

                // Select file type
                $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

                // Valid file extensions
                $extensions_arr = array("jpg","jpeg","png","gif");

                // Check extension
                if( in_array($imageFileType,$extensions_arr) )
                {
                
                    // Convert to base64 
                    $image_base64 = base64_encode(file_get_contents($_FILES['myFile']['tmp_name']) );
                    $image = 'data:image/'.$imageFileType.';base64,'.$image_base64;



                    $sql = "UPDATE articles SET image = ? WHERE id = ? LIMIT 1";

                    $statement = $con->prepare($sql);
                    $statement->execute(array($image,$id));
                
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
        
