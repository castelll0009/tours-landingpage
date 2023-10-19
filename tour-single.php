<?php
include('database.php');

if (isset($_POST['id'])) {
    $id = mysqli_real_escape_string($connection, $_POST['id']);
    
    $query = "SELECT * FROM tour WHERE id = {$id}";

    $result = mysqli_query($connection, $query);
    if (!$result) {
        die('Query Failed'. mysqli_error($connection));
    }

    if ($row = mysqli_fetch_array($result)) {
        $json = array(
            'title' => $row['title'],
            'description' => $row['description'],
            'price' => $row['price'],
            'group_size' => $row['group_size'],
            'duration' => $row['duration'],
            'date_departure' => $row['date_departure'],
            'region' => $row['region'],
            'image_path' => $row['image_path'], // Add image_path to the JSON response
            'id' => $row['id']
        );
    } else {
        // Handle the case where no record is found, for example, set $json to an empty object.
        $json = array();
    }

    // Set the Content-Type header to indicate that the response is in JSON format.
    header('Content-Type: application/json');
    echo json_encode($json);
}
?>
