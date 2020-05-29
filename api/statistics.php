<?php

    require('access-control.php');

    require('connect.php');

    $contacts = array();

    $sql = "SELECT COUNT(id) AS count FROM `volunteers`";

    $statement = $con->prepare($sql);
    $statement->execute();
    $resultvolunteers = $statement->fetchColumn();



    $sql = "SELECT COUNT(id) AS count FROM `articles`";

    $statement = $con->prepare($sql);
    $statement->execute();
    $resultarticles = $statement->fetchColumn();





    $sql = "SELECT COUNT(id) AS count FROM `contacts`";

    $statement = $con->prepare($sql);
    $statement->execute();
    $resultcontact = $statement->fetchColumn();

 


    $sql = "SELECT COUNT(id),MONTHNAME(CURRENT_DATE) FROM `articles` WHERE MONTH(date) = MONTH(CURRENT_DATE)";

    $statement = $con->prepare($sql);
    $statement->execute();
    $resultarticlesmonth = $statement->fetchColumn();



    $sql = "SELECT MONTHNAME(CURRENT_DATE) FROM `articles` WHERE MONTH(date) = MONTH(CURRENT_DATE)";

    $statement = $con->prepare($sql);
    $statement->execute();
    $resultmonth = $statement->fetchColumn();






            $contacts['volunteers'] = (int) $resultvolunteers;
            $contacts['contacts'] = (int) $resultcontact;
            $contacts['articlesmonth'] = (object) array('count' => (int) $resultarticlesmonth , 'month' => $resultmonth);
            $contacts['articles'] = (int) $resultarticles;



        echo json_encode($contacts);

