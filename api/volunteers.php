<?php
    require('access-control.php');
    require('connect.php');


    $volunteers = array();

    $sql = "SELECT volunteers.*,teams.id as commit_id,roles.id as role_id , roles.role , teams.name as committee FROM volunteers 
    INNER JOIN teams 
    on volunteers.commit_id = teams.id 
    INNER JOIN roles 
    on volunteers.role_id = roles.id";

    $statement = $con->prepare($sql);
    $statement->execute();
    $result = $statement->fetchAll();

    $count = $statement->rowCount();


    if( $count > 0 )
    {
        $cr = 0;

        foreach($result as $row)
        {
            $volunteers[$cr]['id'] = $row['id'];
            $volunteers[$cr]['arab_name'] = $row['arab_name'];
            $volunteers[$cr]['eng_name'] = $row['eng_name'];
            $volunteers[$cr]['age'] = $row['age'];
            $volunteers[$cr]['committee'] = (object) array('id' => (int) $row['commit_id'], 'name' => $row['committee']);
            $volunteers[$cr]['role'] = (object) array('id' => (int) $row['role_id'], 'name' => $row['role']);
            $volunteers[$cr]['image'] = $row['image'];
            $volunteers[$cr]['linkedIn'] = $row['linkedIn'];
            $volunteers[$cr]['gmail'] = $row['gmail'];
            $cr++;
        }
        
       echo json_encode($volunteers);
    }

    else
    {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "no data found"
        );

        echo json_encode($response);
    }