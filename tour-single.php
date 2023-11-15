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
        inventario.all_year,
        GROUP_CONCAT(DISTINCT dias.number ORDER BY dias.number ASC) AS days_numbers,
        GROUP_CONCAT(DISTINCT dias.title_day ORDER BY dias.number ASC) AS days_titles,
        GROUP_CONCAT(DISTINCT dias.description_day ORDER BY dias.number ASC) AS days_descriptions,
        GROUP_CONCAT(DISTINCT dias.image_path ORDER BY dias.number ASC) AS days_image_paths
    FROM tour
    LEFT JOIN inventario ON tour.id = inventario.tour_id
    LEFT JOIN dias ON tour.id = dias.tour_id
    WHERE tour.id = {$id}
    GROUP BY tour.id;
    ";

    $result = mysqli_query($connection, $query);
    if (!$result) {
        die('Query Failed' . mysqli_error($connection));
    }

    if ($row = mysqli_fetch_array($result)) {
        // Extract days information into arrays
        $days_numbers = explode(',', $row['days_numbers']);
        $days_titles = explode(',', $row['days_titles']);
        $days_descriptions = explode(',', $row['days_descriptions']);
        $days_image_paths = explode(',', $row['days_image_paths']); // Obtener rutas de imagen

        // Create the days array
        $days = array();
        for ($i = 0; $i < count($days_numbers); $i++) {
            $days[] = array(
                'number' => $days_numbers[$i],
                'title' => $days_titles[$i],
                'description' => $days_descriptions[$i],
                'image_path' => $days_image_paths[$i] // Agregar rutas de imagen
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
            'all_year' => $row['all_year'], // Nuevo campo all_year
            'price_visible' => $row['price_visible'], // Nuevo campo price_visible
            'discount' => $row['discount'], // Nuevo campo discount
            'discount_visible' => $row['discount_visible'], // Nuevo campo discount_visible
            'days' => $days, // Include days as an array with image paths
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
