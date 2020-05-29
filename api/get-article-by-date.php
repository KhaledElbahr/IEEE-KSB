<?php

        require('access-control.php');
        require('connect.php');
        require('validation.php');

     
        $year = $_GET['year'];

        if(isset($year) && !empty($year))
        {

                        $dates = [];


                        $sql = "SELECT articles.*,years.id as year_id, years.year as year FROM articles 
                        INNER JOIN years on articles.year_id = years.id 
                        where year(date) = years.year 
                        and years.id = ?";
                        $statement = $con->prepare($sql);
                        $statement->execute(array($year));
                        $result = $statement->fetchAll();

                        $cr = 0;

                        foreach($result as $row)
                        {
                                $dates[$cr]['id'] = $row['id'];
                                $dates[$cr]['title'] = $row['title'];
                                $dates[$cr]['date'] = $row['date'];
                                $dates[$cr]['time'] = $row['time'];
                                $dates[$cr]['link'] = $row['link'];
                                $dates[$cr]['image'] = $row['image'];
                                $dates[$cr]['description'] = $row['description'];
                                $cr++;
                                
                        }


                        echo json_encode($dates);

        }


        else
        {
                $response = array(
                        "status" => "error",
                        "error" => true,
                        "message" => "No year sent!"
                    );

                    echo json_encode($response);
        }


