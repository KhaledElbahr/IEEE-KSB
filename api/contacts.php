<?php



    require('access-control.php');
    require('connect.php');
    require('validation.php');

    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata))
    {
        $request = json_decode($postdata);



        $name = validString($request->name);
        $email = validEmail($request->email);
        $phone = validNumber($request->phone);
        $message = validString($request->comment);



        $sql = "INSERT INTO contacts(name,email,phone,message) VALUES(?,?,?,?)";

        $statement = $con->prepare($sql);

        $statement->execute(array($name,$email,$phone,$message));

        $response = array(
            "status" => "success",
            "error" => false,
            "message" => "your feedback has been sent!"
        );


        echo json_encode($response);


    }

    else
    {

        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "no data sent!"
        );
        echo json_encode($response);
    }
