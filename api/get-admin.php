<?php

        require('access-control.php');
        require('connect.php');

        $id = $_GET['id'];
        $admin = array();


        $sql = "SELECT * FROM admin WHERE id = ? LIMIT 1 ";


        $statement = $con->prepare($sql);
        $statement->execute(array($id));
        $result = $statement->fetchAll();
        $count = $statement->rowCount();


        if( $count > 0 )
        {

            $cr = 0;

        foreach($result as $row)
        {
            $admin[$cr]['id'] = $row['id'];
            $admin[$cr]['name'] = $row['name'];
            $admin[$cr]['email'] = $row['email'];
            $admin[$cr]['committee'] = (object) array('commit_id' => (int) $row['commit_id'], 'commit_name' => $row['name']);
            $admin[$cr]['role'] = (object) array('role_id' => (int) $row['role_id'], 'role_name' => $row['name']);
            $admin[$cr]['image'] = $row['image'];
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