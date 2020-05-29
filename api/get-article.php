<?php

        require('access-control.php');
        require('connect.php');

        $id = $_GET['id'];

        $articles = array();


        $sql = "SELECT * FROM articles WHERE id = ? LIMIT 1 ";


        $statement = $con->prepare($sql);
        $statement->execute(array($id));
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
                        $articles[$cr]['link'] = $row['link'];
                        $articles[$cr]['description'] = $row['description'];
                        $articles[$cr]['image'] = $row['image'];
                        $cr++;
                }

                echo json_encode($articles[0]);
        }

        else
        {
                $response = array(
                        "status" => "error",
                        "error" => true,
                        "message" => "no article found",
                    );


                    echo json_encode($response);
        }
