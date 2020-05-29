<?php 

    require('access-control.php');
    require('connect.php');
    require('validation.php');


    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata))
    {
        $request = json_decode($postdata);



        $title = validString($request->title);
        $initdate = $request->date;
        $link = validUrl($request->link);
        $description = validString($request->description);


        $date = date($initdate);

        $date_arr = explode("-", $date);

        $yr = $date_arr[0];


        $sql = "SELECT years.id from years WHERE years.year = ?";

        $statement = $con->prepare($sql);
        $statement->execute(array($yr));
        $resultyear = $statement->fetchColumn();

        $year_id = $resultyear;



        $sql = "INSERT INTO articles(
                                        title,
                                        date,
                                        link,
                                        description,
                                        year_id)
                                
                                    VALUES(?,?,?,?,?)";


        $statement = $con->prepare($sql);
        $statement->execute(array($title,$initdate,$link,$description,$year_id));

        $response = array(
        "status" => "success",
        "error" => false,
        "message" => "article inserted successfully",
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
