<?php
include('database.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Initialize an array to store error messages
    $response = array();

    // Ensure that required fields are provided
    $requiredFields = ['title', 'description', 'price', 'group_size', 'duration', 'date_departure', 'region', 'image', 'pax', 'include', 'not_include', 'single_supplement', 'days'];

    foreach ($requiredFields as $field) {
        if (empty($_POST[$field])) {
            $response['error'] = "Missing or empty field: $field";
            echo json_encode($response);
            exit;
        }
    }

    $tour_title = $_POST['title'];
    $tour_description = $_POST['description'];
    $price = $_POST['price'];
    $group_size = $_POST['group_size'];
    $duration = $_POST['duration'];
    $date_departure = $_POST['date_departure'];
    $region = $_POST['region'];

    // Inventory fields
    $pax = $_POST['pax'];
    $include = $_POST['include'];
    $not_include = $_POST['not_include'];
    $single_supplement = $_POST['single_supplement'];

    // Handle image upload
    $image = $_FILES['image'];
    $image_name = $image['name'];
    $image_tmp = $image['tmp_name'];
    $image_path = 'imgs/' . $image_name;

    if (move_uploaded_file($image_tmp, $image_path)) {
        // Image moved successfully, now insert other data into the database
        $query = "INSERT INTO tour (title, description, price, group_size, duration, date_departure, region, image_path) VALUES ('$tour_title', '$tour_description', '$price', '$group_size', '$duration', '$date_departure', '$region', '$image_path')";

        $result = mysqli_query($connection, $query);

        if ($result) {
            // Obtain the ID of the new tour inserted
            $new_tour_id = mysqli_insert_id($connection);

            // Insert data into the 'inventory' table
            $query_inventario = "INSERT INTO inventario (tour_id, pax, include, not_include, single_supplement) VALUES ('$new_tour_id', '$pax', '$include', '$not_include', '$single_supplement')";

            $result_inventario = mysqli_query($connection, $query_inventario);

            if ($result_inventario) {
                // Process and add the days to the 'dias' table
                $jsonDays = $_POST['days'];
                $days = json_decode($jsonDays, true); // Decode the JSON into an associative array

                foreach ($days as $day) {
                    $number_day = $day['number'];
                    $title_day = $day['title'];
                    $description_day = $day['description'];

                    // Print the values to the screen for debugging
                    echo "AQUIIIINumber: $number_day, Title: $title_day, Description: $description_day\n";

                    // You should check if the day already exists and update it, or insert a new one if it doesn't exist.
                    $query_dias = "INSERT INTO dias (tour_id, number, title_day, description_day) VALUES ('$new_tour_id', '$number_day', '$title_day', '$description_day') ON DUPLICATE KEY UPDATE title_day = VALUES(title_day), description_day = VALUES(description_day)";

                    $result_dias = mysqli_query($connection, $query_dias);

                    if (!$result_dias) {
                        // Handle errors if necessary
                        $response['error'] = "Failed to insert/update data into dias table";
                        echo json_encode($response);
                        exit;
                    }
                }

                $response['message'] = "Tour Added Successfully";
                echo json_encode($response);
            } else {
                $response['error'] = "Failed to insert data into inventory table";
                echo json_encode($response);
            }
        } else {
            $response['error'] = "Failed to insert data into the tour table";
            echo json_encode($response);
        }
    } else {
        $response['error'] = "Image upload failed";
        echo json_encode($response);
    }
}
?>
