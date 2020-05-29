<?php

        require('access-control.php');
        require('connect.php');

        $articles = array();

        $sql = "SELECT * FROM articles";

        $statement = $con->prepare($sql);
        $statement->execute();
        $result = $statement->fetchAll();

        $count = $statement->rowCount();


        if( $count > 0 )
        {
            $cr = 0;

            foreach($result as $row)
            {
                $articles[$cr]['id'] = $row['id'];
                $articles[$cr]['title'] = $row['title'];
                $articles[$cr]['date'] = $row['date'];
                $articles[$cr]['time'] = $row['time'];
                $articles[$cr]['link'] = $row['link'];
                $articles[$cr]['description'] = $row['description'];
                $articles[$cr]['image'] = $row['image'];
                $cr++;
            }

            echo json_encode($articles);
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
        


    


    

    




    




