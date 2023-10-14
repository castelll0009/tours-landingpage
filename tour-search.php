<?php
include('database.php');

$search = $_POST['search'];
if (!empty($search)) {
    $query = "SELECT * FROM tour WHERE title LIKE '$search%'";
    $result = mysqli_query($connection, $query);

    if (!$result) {
        die('Query Error' . mysqli_error($connection));
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
            'image_path' => $row['image_path'], // Add image_path to the JSON response
            'id' => $row['id']
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
}
?>
