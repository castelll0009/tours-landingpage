<?php
include('database.php');

if (isset($_POST['id'])) {
    $id = mysqli_real_escape_string($connection, $_POST['id']);
    
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
    GROUP_CONCAT(DISTINCT inventario.pax) AS pax,
    GROUP_CONCAT(DISTINCT inventario.include) AS include,
    GROUP_CONCAT(DISTINCT inventario.not_include) AS not_include,
    GROUP_CONCAT(DISTINCT inventario.single_supplement) AS single_supplement,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'number', dias.number,
            'title', dias.title_day,
            'description', dias.description_day
        )
        ORDER BY dias.number ASC
    ) AS days
FROM tour
LEFT JOIN inventario ON tour.id = inventario.tour_id
LEFT JOIN dias ON tour.id = dias.tour_id
GROUP BY tour.id, tour.title, tour.description, tour.price, tour.group_size, tour.duration, tour.date_departure, tour.region, tour.image_path;
;
";

    $result = mysqli_query($connection, $query);
    if (!$result) {
        die('Query Failed'. mysqli_error($connection));
    }

    if ($row = mysqli_fetch_array($result)) {
        // Extract days information into arrays
        $days_numbers = explode(',', $row['days_numbers']);
        $days_titles = explode(',', $row['days_titles']);
        $days_descriptions = explode(',', $row['days_descriptions']);

        // Create the days array
        $days = array();
        for ($i = 0; $i < count($days_numbers); $i++) {
            $days[] = array(
                'number' => $days_numbers[$i],
                'title' => $days_titles[$i],
                'description' => $days_descriptions[$i]
            );
        }

        // Main JSON response including days as an array
        $json = array(
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
            'days' => $days, // Include days as an array
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
