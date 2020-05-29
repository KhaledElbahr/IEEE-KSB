<?php

    require('access-control.php');
    require('connect.php');
    require('validation.php');

    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata))
    {
        $request = json_decode($postdata);

        $id = $_GET['id'];
        $arab_name = isArabic($request->arab_name);
        $eng_name = isEnglish($request->eng_name);
        $age = $request->age;
        $commit_name = $request->committee;

        $role = $request->role;
        $linked = $request->linkedIn;
        $gmail = $request->gmail;

        $sql = "UPDATE volunteers SET
                                                arab_name = ?,
                                                eng_name = ?,
                                                age = ?,
                                                commit_id= ?,
                                                role_id = ?,
                                                linkedIn = ?,
                                                gmail= ?
                                                WHERE id = ? LIMIT 1";

                    $statement = $con->prepare($sql);
                    $statement->execute(array($arab_name,$eng_name,$age,$commit_name,$role,$linked,$gmail,$id));

                    $response = array(
                        "status" => "success",
                        "error" => false,
                        "message" => "data edited successfully",
                    );

                    echo json_encode($response);

    }

    else
    {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "no data !"
        );

        echo json_encode($response);
    }
