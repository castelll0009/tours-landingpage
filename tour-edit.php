<?php
include('database.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Initialize an array to store the response
    $response = array();

    // Ensure that required fields are provided
    $requiredFields = ['id', 'title', 'description', 'price', 'group_size', 'duration', 'date_departure', 'region', 'image', 'pax', 'include', 'not_include', 'single_supplement', 'days'];

    foreach ($requiredFields as $field) {
        if (empty($_POST[$field])) {
            $response['error'] = "Missing or empty field: $field";
            echo json_encode($response);
            exit;
        }
    }

    $tour_id = $_POST['id']; // The ID of the tour to update

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

    // Handle image update (if a new image is provided)
    if (!empty($_FILES['image']['name'])) {
        $image = $_FILES['image'];
        $image_name = $image['name'];
        $image_tmp = $image['tmp_name'];
        $image_path = 'imgs/' . $image_name;

        if (move_uploaded_file($image_tmp, $image_path)) {
            // Update the 'tour' table with the new image path and other fields
            $update_tour_query = "UPDATE tour SET 
                title = '$tour_title',
                description = '$tour_description',
                price = '$price',
                group_size = '$group_size',
                duration = '$duration',
                date_departure = '$date_departure',
                region = '$region',
                image_path = '$image_path'
                WHERE tour_id = $tour_id";

            $result_update_tour = mysqli_query($connection, $update_tour_query);

            if (!$result_update_tour) {
                $response['error'] = "Failed to update the tour: " . mysqli_error($connection);
                echo json_encode($response);
                exit;
            }
        } else {
            $response['error'] = "Image upload failed";
            echo json_encode($response);
            exit;
        }
    }

// Process and update the days in the 'dias' table
$jsonDays = $_POST['days'];
$days = json_decode($jsonDays, true); // Decode the JSON into an associative array

foreach ($days as $day) {
    $number_day = $day['number'];
    $title_day = $day['title'];
    $description_day = $day['description'];

    // Check if the day already exists for the tour
    $day_exists_query = "SELECT * FROM dias WHERE tour_id = $tour_id AND number = $number_day";
    $result_day_exists = mysqli_query($connection, $day_exists_query);

    if (mysqli_num_rows($result_day_exists) > 0) {
        // Day exists, update it
        $update_day_query = "UPDATE dias SET title_day = '$title_day', description_day = '$description_day' WHERE tour_id = $tour_id AND number = $number_day";
        $result_update_day = mysqli_query($connection, $update_day_query);
    } else {
        // Day doesn't exist, insert a new record
        $insert_day_query = "INSERT INTO dias (tour_id, number, title_day, description_day) VALUES ('$tour_id', '$number_day', '$title_day', '$description_day')";
        $result_insert_day = mysqli_query($connection, $insert_day_query);
    }
}

$response['message'] = "Tour Updated Successfully";
echo json_encode($response);

}
?>
