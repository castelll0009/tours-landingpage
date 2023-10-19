<?php
include('database.php');

if (isset($_POST['id'])) {
    $tourId = $_POST['id'];
    
    $query = "DELETE FROM tour WHERE id = $tourId";
    $result = mysqli_query($connection, $query);

    if (!$result) {
        die('Query Failed.');
    }

    echo "Tour Deleted Successfully";
}
?>
