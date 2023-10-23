<?php
include('database.php');

$query = "SELECT 
tour.id AS tour_id,
tour.title,
tour.description,
tour.price,
tour.group_size,
tour.duration,
tour.date_departure,
tour.region,
tour.image_path,
GROUP_CONCAT(DISTINCT dias.number) AS days_numbers,
GROUP_CONCAT(DISTINCT dias.title_day) AS days_titles,
GROUP_CONCAT(DISTINCT dias.description_day) AS days_descriptions
FROM tour
LEFT JOIN dias ON tour.id = dias.tour_id
GROUP BY tour.id, tour.title, tour.description, tour.price, tour.group_size, tour.duration, tour.date_departure, tour.region, tour.image_path;

";
$result = mysqli_query($connection, $query);

if (!$result) {
  die('Query Failed: ' . mysqli_error($connection));
}

$json = array();
while ($row = mysqli_fetch_array($result)) {
  $days = json_decode($row['days'], true); // Parse the 'days' JSON string
  $json[] = array(
      'id' => $row['tour_id'], // Use 'tour_id' instead of 'id'
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
      'days' => $days // Include 'days' as an array
  );
}

$jsonstring = json_encode($json);
echo $jsonstring;
?>
