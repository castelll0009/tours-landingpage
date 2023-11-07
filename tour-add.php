<?php
include('database.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tour_title = $_POST['title'];
    $tour_description = $_POST['description'];
    $price = $_POST['price'];
    $group_size = $_POST['group_size'];
    $duration = $_POST['duration'];
    $date_departure = $_POST['date_departure'];
    $region = $_POST['region'];

    // Campos de la tabla 'inventario'
    $pax = $_POST['pax'];
    $include = $_POST['include'];
    $not_include = $_POST['not_include'];
    $single_supplement = $_POST['single_supplement'];

    // Handle image upload for the tour preview
    $image = $_FILES['previewImage'];
    $image_name = $image['name'];
    $image_tmp = $image['tmp_name'];
    $image_path = 'imgs/' . $image_name;

    if (move_uploaded_file($image_tmp, $image_path)) {
        // Image moved successfully, now insert other data into the database
        $query = "INSERT INTO tour (title, description, price, group_size, duration, date_departure, region, image_path) VALUES ('$tour_title', '$tour_description', '$price', '$group_size', '$duration', '$date_departure', '$region', '$image_path')";
        $result = mysqli_query($connection, $query);

        if ($result) {
            // Get the ID of the new tour inserted
            $new_tour_id = mysqli_insert_id($connection);

            // Insert data into the 'inventory' table
            $query_inventario = "INSERT INTO inventario (tour_id, pax, include, not_include, single_supplement) VALUES ('$new_tour_id', '$pax', '$include', '$not_include', '$single_supplement')";
            $result_inventario = mysqli_query($connection, $query_inventario);

            // Process and add the days to the 'dias' table
            $jsonDays = $_POST['days'];
            $days = json_decode($jsonDays, true); // Decode the JSON into an associative array

            foreach ($days as $day) {
                $number_day = $day['number'];
                $title_day = $day['title'];
                $description_day = $day['description'];
                $image_day = '';  // Initialize image_day variable

                // Handle image upload for the day
                $day_image = $_FILES['dayImage' . $number_day];
                if (!empty($day_image)) {
                    $day_image_name = $day_image['name'];
                    $day_image_tmp = $day_image['tmp_name'];
                    $day_image_path = 'imgs/' . $day_image_name;

                    // Print the day image path before saving
                    print("Day $number_day Image Path: $day_image_path<br>");

                    if (move_uploaded_file($day_image_tmp, $day_image_path)) {
                        // Image for the day moved successfully
                        $image_day = $day_image_path;
                    } else {
                        echo json_encode(["error" => "Day $number_day image upload failed"]);
                    }
                }

                $query_dias = "INSERT INTO dias (tour_id, number, title_day, description_day, image_path) VALUES ('$new_tour_id', '$number_day', '$title_day', '$description_day', '$image_day')";
                $result_dias = mysqli_query($connection, $query_dias);

                if (!$result_dias) {
                    // Handle errors if necessary
                }
            }

            if ($result_inventario) {
                echo json_encode(["message" => "Tour Added Successfully"]);
            } else {
                echo json_encode(["error" => "Failed to insert data into inventory table"]);
            }
        } else {
            echo json_encode(["error" => "Failed to insert data into the tour table"]);
        }
    } else {
        echo json_encode(["error" => "Image upload failed"]);
    }
}
?>
