<?php
include('database.php');

$query = "SELECT 
    tour.*, 
    inventario.pax, 
    inventario.include, 
    inventario.not_include, 
    inventario.single_supplement, 
    dias.number, 
    dias.title_day, 
    dias.description_day
FROM tour
LEFT JOIN inventario ON tour.id = inventario.tour_id
LEFT JOIN dias ON tour.id = dias.tour_id";
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
    'image_path' => $row['image_path'],
    'pax' => $row['pax'],
    'include' => $row['include'],
    'not_include' => $row['not_include'],
    'single_supplement' => $row['single_supplement'],
    'number_day' => $row['number'],
    'title_day' => $row['title_day'],
    'description_day' => $row['description_day']
  );
}

$jsonstring = json_encode($json);
echo $jsonstring;
?>
