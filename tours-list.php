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
    GROUP_CONCAT(DISTINCT dias.description_day) AS days_descriptions,
    MAX(inventario.pax) AS pax,
    MAX(inventario.include) AS include,
    MAX(inventario.not_include) AS not_include,
    MAX(inventario.single_supplement) AS single_supplement
FROM tour
LEFT JOIN dias ON tour.id = dias.tour_id
LEFT JOIN inventario ON tour.id = inventario.tour_id
GROUP BY tour.id, tour.title, tour.description, tour.price, tour.group_size, tour.duration, tour.date_departure, tour.region, tour.image_path;";

$result = mysqli_query($connection, $query);

if (!$result) {
  die('Query Failed: ' . mysqli_error($connection));
}

$json = array();
while ($row = mysqli_fetch_array($result)) {
    $daysNumbers = empty($row['days_numbers']) ? array() : explode(',', $row['days_numbers']);
    $daysTitles = empty($row['days_titles']) ? array() : explode(',', $row['days_titles']);
    $daysDescriptions = empty($row['days_descriptions']) ? array() : explode(',', $row['days_descriptions']);

    $json[] = array(
        'id' => $row['tour_id'],
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
        'days' => array(
            'numbers' => $daysNumbers,
            'titles' => $daysTitles,
            'descriptions' => $daysDescriptions
        )
    );
}


$jsonstring = json_encode($json);
echo $jsonstring;
?>
