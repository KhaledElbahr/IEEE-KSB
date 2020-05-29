<?php


    

            if (isset($_SERVER['HTTP_ORIGIN'])) {
                header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
                header('Access-Control-Allow-Credentials: true');
                header('Access-Control-Max-Age: 86400');    
            }


            if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

                if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

                if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                    header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

                exit(0);
            }

           
            ini_set("display_errors",1);

            require('connect.php');
            require('validation.php');
            require('vendor/autoload.php');
            use \Firebase\JWT\JWT;


            

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
            
        $request = json_decode(file_get_contents("php://input"));



        if(!empty($request->email) && !empty($request->password))
        {


            $requestedemail = validEmail($request->email);
            $requestpassword = $request->password;
            $hashedpass = sha1($requestpassword);



            $sql = "SELECT * FROM admin where email = ? ";


            $statement = $con->prepare($sql);
            $statement->execute(array($requestedemail));
            $result = $statement->fetchAll();

            $count = $statement->rowCount();

            if($count > 0)
            {
                $name = $result[0]['name'];
                $email = $result[0]['email'];
                $password = $result[0]['password'];


                if($hashedpass == $password)
                {


                    $iss = "localhost";
                    $aud = "admin";
                    $iat = time();
                    $nbf = $iat + 10;
                    $exp = $iat + 60;
                    $admin_arr_data= array(

                        'id' => $result[0]['id'],
                        'name' => $result[0]['name'],
                        'email' => $result[0]['email'],
                        'password' => $result[0]['password']
                    );

                    $secret_key = "mm309on";

                    $token = array(
                        "iss" => $iss,
                        "aud" => $aud,
                        "iat" => $iat,
                        "nbf" => $nbf,
                        "exp" => $exp,
                        "data" => $admin_arr_data
                            );

                            $jwt = JWT::encode($token,$secret_key);


                    http_response_code(200);
                    echo json_encode(array(
                        "status" => "success",
                        "jwt" => $jwt,
                        "message" => "logged in successfully"
                    ));
                }
                else
                {

                    echo json_encode(array(
                        "status" => "error",
                        "message" => "invalid credentials"
                    ));
                }
            }
            else
            {
                echo json_encode(array(
                    "status" => "error",
                    "message" => "invalid credentials"
                ));
            }
        }

        else
        {
            http_response_code(404);
                echo json_encode(array(
                    "status" => "error",
                    "message" => "no data"
                ));
        }
    }
    else
        {
            http_response_code(404);
                echo json_encode(array(
                    "status" => "error",
                    "message" => "you cannot enter without a form"
                ));
        }


