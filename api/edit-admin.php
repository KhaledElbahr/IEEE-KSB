<?php

    require('access-control.php');
    require('connect.php');
    require('validation.php');

    $postdata = file_get_contents("php://input");


    if(isset($postdata) && !empty($postdata))
    {
        $request = json_decode($postdata);

        $id = $_GET['id'];
        $name = $request->name;
        $email = $request->email;
        $role = $request->role;
        $commit_name = $request->committee;






                    $sql = "UPDATE admin SET 
                                            name = ?,
                                            email = ?,
                                            role_id = ?,
                                            commit_id = ?
                                            WHERE id = ? LIMIT 1";

                    $statement = $con->prepare($sql);
                    $statement->execute(array($name,$email,$role,$commit_name,$id));

                    $response = array(
                        "status" => "success",
                        "error" => false,
                        "message" => "your information edited successfully",
                    );

                    echo json_encode($response);  
        
    }


    else
    {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "no id sent",
        );

        echo json_encode($response);
    }



