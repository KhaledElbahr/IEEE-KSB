<?php

    require('access-control.php');
    require('connect.php');

    $admin = array();

    $sql = "SELECT admin.*,teams.id as commit_id,roles.id as role_id , roles.role , teams.name as committee FROM admin
                                            INNER JOIN teams
                                            on admin.commit_id = teams.id
                                            INNER JOIN roles
                                            on admin.role_id = roles.id";

    $statement = $con->prepare($sql);
    $statement->execute();
    $result = $statement->fetchAll();

    $count = $statement->rowCount();


    if( $count > 0 )
    {
        $cr = 0;
        $image = $result[0]['image'];
        // $image_src = "../src/assets/images/".;


        foreach($result as $row)
        {
            $admin[$cr]['id'] = $row['id'];
            $admin[$cr]['name'] = $row['name'];
            $admin[$cr]['email'] = $row['email'];
            $admin[$cr]['password'] = $row['password'];
            $admin[$cr]['committee'] = (object) array('id' => (int) $row['commit_id'], 'name' => $row['committee']);
            $admin[$cr]['role'] = (object) array('id' => (int) $row['role_id'], 'name' => $row['role']);
            $admin[$cr]['image'] = $image;
            $cr++;
        }

        echo json_encode($admin[0]);
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
