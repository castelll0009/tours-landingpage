<?php
include('database.php');

if (isset($_POST['id'])) {
    $id = mysqli_real_escape_string($connection, $_POST['id']);
    
    $query = "SELECT 
    tour.*, 
    inventario.pax, 
    inventario.include, 
    inventario.not_include, 
    inventario.single_supplement, 
    GROUP_CONCAT(DISTINCT dias.number ORDER BY dias.number ASC) AS days_numbers,
    GROUP_CONCAT(DISTINCT dias.title_day ORDER BY dias.number ASC) AS days_titles,
    GROUP_CONCAT(DISTINCT dias.description_day ORDER BY dias.number ASC) AS days_descriptions
FROM tour
LEFT JOIN inventario ON tour.id = inventario.tour_id
LEFT JOIN dias ON tour.id = dias.tour_id
WHERE tour.id = {$id}
GROUP BY tour.id;
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
