<?php
include('database.php');

if (isset($_POST['id'])) {
    $tourId = $_POST['id'];
    
    $query = "SELECT * FROM tour WHERE id = $tourId";
    $result = mysqli_query($connection, $query);

    if (!$result) {
        die('Query Failed.');
    }

    $json = array();
    while ($row = mysqli_fetch_array($result)) {
        $json[] = array(
            'title' => $row['title'],
            'description' => $row['description'],
            'price' => $row['price'],
            'group_size' => $row['group_size'],
            'duration' => $row['duration'],
            'date_departure' => $row['date_departure'],
            'region' => $row['region'],
            'id' => $row['id']
        );
    }

    
}
$jsonstring = json_encode($json);
    echo $jsonstring;
?>
