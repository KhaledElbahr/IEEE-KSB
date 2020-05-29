<?php
               
               
               
               
                require('access-control.php');
                require('connect.php');
                require('validation.php');

                $postdata = file_get_contents("php://input");


                if(isset($postdata) && !empty($postdata))
                {
                    $request = json_decode($postdata);

                    $id = $_GET['id'];
                    $title = validString($request->title);
                    $date = isDate($request->date);
                    $link = validUrl($request->link);
                    $description = validString($request->description);


                    $sql = "UPDATE articles SET 
                                                        title = ?,
                                                        date = ?,
                                                        link = ?,
                                                        description = ?
                                                        WHERE id = ? LIMIT 1";

                                $statement = $con->prepare($sql);
                                $statement->execute(array($title,$date,$link,$description,$id));


                                $response = array(
                                    "status" => "success",
                                    "error" => false,
                                    "message" => "File updated successfully",
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

        