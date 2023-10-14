<?php
include('database.php');

if (isset($_POST['title']) && isset($_POST['description'])) {
    $tourId = $_POST['id'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $group_size = $_POST['group_size'];
    $duration = $_POST['duration'];
    $date_departure = $_POST['date_departure'];
    $region = $_POST['region'];
    
    $query = "UPDATE tour SET title = '$title', description = '$description', price = '$price', group_size = '$group_size', duration = '$duration', date_departure = '$date_departure', region = '$region' WHERE id = $tourId";
    $result = mysqli_query($connection, $query);

    if (!$result) {
        die('Query Failed.');
    }

    echo "Tour Updated Successfully";
}
?>
