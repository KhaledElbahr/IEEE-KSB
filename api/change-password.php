<?php


    require('access-control.php');
    require('connect.php');
    require('validation.php');

    $postdata = file_get_contents("php://input");


    if(isset($postdata) && !empty($postdata))
    {
        $request = json_decode($postdata);

        $oldpass = $request->oldPass;
        $newpass = $request->newPass;
        $confirm = $request->confirmPass;


        $oldhash = sha1($oldpass);


        $sql = "SELECT admin.*,teams.id as commit_id,roles.id as role_id , roles.role , teams.name as committee FROM admin
                                            INNER JOIN teams
                                            on admin.commit_id = teams.id
                                            INNER JOIN roles
                                            on admin.role_id = roles.id";

    $statement = $con->prepare($sql);
    $statement->execute();
    $result = $statement->fetchAll();


    $password = $result[0]['password'];

        if($oldhash == $password)
        {



            $newhash = sha1($newpass);



            $sql = "UPDATE admin SET password = ?";

                    $statement = $con->prepare($sql);
                    $statement->execute(array($newhash));


                    $response = array(
                        "status" => "success",
                        "error" => false,
                        "message" => "password changed successfully",
                    );


                    echo json_encode($response);

        }
        else
        {
            $response = (array(
                    "status" => "error",
                    "error" => true,
                    "message" => "wrong old password !"
                        ));

                    echo json_encode($response);
        }

    }

    else
        {
            $response = (array(
                    "status" => "error",
                    "error" => true,
                    "message" => "no data sent !"
                        ));

                    echo json_encode($response);
        }


