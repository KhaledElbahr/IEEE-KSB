
<?php 

    require('access-control.php');
    require('connect.php');

    $id = $_GET['id'];


    $sql = "SELECT * FROM articles WHERE id = ? LIMIT 1";


        $statement = $con->prepare($sql);
        $statement->execute(array($id));

        $count = $statement->rowCount();

        if($count > 0)
        {
            $delete = "DELETE FROM articles WHERE id = ? LIMIT 1";

            $statement = $con->prepare($delete);

            $statement->execute(array($id));

            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "article deleted successfully",
            );


            echo json_encode($response);
        }

        else
        {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "this article not found!"
            );
    
            echo json_encode($response);
        }




