<?php

    require('access-control.php');
    require('connect.php');
    require('validation.php');

    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata))
    {
        $request = json_decode($postdata);



        $arab_name = isArabic($request->arab_name);
        $eng_name = isEnglish($request->eng_name);
        $age = $request->age;
        $commit_name = $request->committee;
        $role = $request->role;
        $linked = $request->linkedIn;
        $gmail = $request->gmail;




        $sql = "INSERT INTO volunteers(
                                        arab_name,
                                        eng_name,
                                        age,
                                        commit_id,
                                        role_id,
                                        linkedIn,
                                        gmail )

                                    VALUES(?,?,?,?,?,?,?)";


                    $statement = $con->prepare($sql);
                    $statement->execute(array($arab_name,$eng_name,$age,$commit_name,$role,$linked,$gmail));

                    $response = array(
                    "status" => "success",
                    "error" => false,
                    "message" => "data inserted successfully",

                    );

        echo json_encode($response);

    }

    else
    {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "No file was sent!"
        );
        echo json_encode($response);
    }




