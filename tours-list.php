<?php
include('database.php');

$query = "SELECT * from tour"; // Make sure the table is named "tour" in your database
$result = mysqli_query($connection, $query);

if (!$result) {
  die('Query Failed: ' . mysqli_error($connection));
}

$json = array();
while ($row = mysqli_fetch_array($result)) {
  $json[] = array(
    'id' => $row['id'],
    'title' => $row['title'],
    'description' => $row['description'],
    'price' => $row['price'],
    'group_size' => $row['group_size'],
    'duration' => $row['duration'],
    'date_departure' => $row['date_departure'],
    'region' => $row['region'],
    'image_path' => $row['image_path'] // Add the image_path to the JSON data
  );
}

$jsonstring = json_encode($json);
echo $jsonstring;
?>
