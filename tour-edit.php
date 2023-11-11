<?php
include('database.php');

if (isset($_POST['id'])) {
    $tourId = $_POST['id'];
    $title = $_POST['title'];
    $description = $_POST['description'];
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


    // Verifica si se ha subido una nueva imagen tour
    if (isset($_FILES['previewImage']) && $_FILES['previewImage']['size'] > 0) {
        $image = $_FILES['previewImage'];
        $image_name = $image['name'];
        // Reemplaza los espacios por guiones bajos en el nombre del archivo
        $image_name = str_replace(' ', '_', $image_name);
        $image_tmp = $image['tmp_name'];
        $image_path = 'imgs/' . $image_name;

        if (move_uploaded_file($image_tmp, $image_path)) {
            // Actualiza la imagen del tour solo si se ha subido una nueva
            $query_update_image = "UPDATE tour SET image_path = '$image_path' WHERE id = $tourId";
            $result_update_image = mysqli_query($connection, $query_update_image);

            if (!$result_update_image) {
                die('Query Failed: ' . mysqli_error($connection));
            }
        } else {
            echo "Image upload failed";
        }
    }

    // Realiza la actualización de los campos del tour (sin incluir la imagen)
    $query_update_tour = "UPDATE tour SET title = '$title', description = '$description', price = '$price', group_size = '$group_size', duration = '$duration', date_departure = '$date_departure', region = '$region' WHERE id = $tourId";
    $result_update_tour = mysqli_query($connection, $query_update_tour);

    // Realiza la actualización de los campos de la tabla 'inventario'
    $query_update_inventario = "UPDATE inventario SET pax = '$pax', include = '$include', not_include = '$not_include', single_supplement = '$single_supplement' WHERE tour_id = $tourId";
    $result_update_inventario = mysqli_query($connection, $query_update_inventario);


   // Process and update the days in the 'dias' table
$jsonDays = $_POST['days'];
$days = json_decode($jsonDays, true); // Decode the JSON into an associative array

// Debug the received days data
echo "Received Days Data:<pre>";
var_dump($days);
echo "</pre>";

// Retrieve existing days' information before deletion
$select_existing_days_query = "SELECT number, title_day, description_day, image_path FROM dias WHERE tour_id = $tourId";
$result_existing_days = mysqli_query($connection, $select_existing_days_query);

$existing_days = [];
if ($result_existing_days) {
    while ($row = mysqli_fetch_assoc($result_existing_days)) {
        $existing_days[$row['number']] = [
            'title_day' => $row['title_day'],
            'description_day' => $row['description_day'],
            'image_path' => $row['image_path']
        ];
    }
} else {
    $response['error'] = "Failed to retrieve existing days: " . mysqli_error($connection);
    echo json_encode($response);
    exit;
}

// Debug existing days before deletion
echo "Existing Days Before Deletion:<pre>";
var_dump($existing_days);
echo "</pre>";

// Then, delete existing days associated with the tour
$delete_existing_days_query = "DELETE FROM dias WHERE tour_id = $tourId";
$result_delete_existing_days = mysqli_query($connection, $delete_existing_days_query);

if (!$result_delete_existing_days) {
    $response['error'] = "Failed to delete existing days: " . mysqli_error($connection);
    echo json_encode($response);
    exit;
}

// Retrieve existing days' information after deletion
$select_existing_days_query = "SELECT number, title_day, description_day, image_path FROM dias WHERE tour_id = $tourId";
$result_existing_days = mysqli_query($connection, $select_existing_days_query);

$existing_days = [];
if ($result_existing_days) {
    while ($row = mysqli_fetch_assoc($result_existing_days)) {
        $existing_days[$row['number']] = [
            'title_day' => $row['title_day'],
            'description_day' => $row['description_day'],
            'image_path' => $row['image_path']
        ];
    }
} else {
    $response['error'] = "Failed to retrieve existing days: " . mysqli_error($connection);
    echo json_encode($response);
    exit;
}

// Debug existing days after deletion
echo "Existing Days After Deletion:<pre>";
var_dump($existing_days);
echo "</pre>";

// Then, insert the new days and update existing days
foreach ($days as $day) {
    $number_day = $day['number'];
    $title_day = $day['title'];
    $description_day = $day['description'];

    // Check if the day exists in the database
    if (isset($existing_days[$number_day])) {
        $existing_image_path = $existing_days[$number_day]['image_path'];

        // Debug existing image path
        echo "Existing Image Path for Day $number_day: $existing_image_path<br>";

        // Check if a new image is uploaded for the day
        $dayImagePath = isset($_FILES['dayImage' . $number_day]) && $_FILES['dayImage' . $number_day]['size'] > 0
            ? uploadImage($_FILES['dayImage' . $number_day], 'day_' . $tourId . '_' . $number_day, 'imgs/')
            : $existing_image_path; // Retain the existing image path if no new image is uploaded

        // Debug new image path
        echo "New Image Path for Day $number_day: $dayImagePath<br>";

        // Update the existing day information
        $update_day_query = "UPDATE dias SET title_day = '$title_day', description_day = '$description_day', image_path = '$dayImagePath' WHERE tour_id = '$tourId' AND number = '$number_day'";
        $result_update_day = mysqli_query($connection, $update_day_query);

        if (!$result_update_day) {
            $response['error'] = "Failed to update existing days: " . mysqli_error($connection);
            echo json_encode($response);
            exit;
        }
    } else {
        // Day doesn't exist, insert the new day
        $imagePath = isset($_FILES['dayImage' . $number_day]) && $_FILES['dayImage' . $number_day]['size'] > 0
            ? uploadImage($_FILES['dayImage' . $number_day], 'day_' . $tourId . '_' . $number_day, 'imgs/')
            : ''; // Empty string if no new image

        // Debug new day information
        echo "New Day Information for Day $number_day:<pre>";
        var_dump([
            'title_day' => $title_day,
            'description_day' => $description_day,
            'image_path' => $imagePath
        ]);
        echo "</pre>";

        $insert_day_query = "INSERT INTO dias (tour_id, number, title_day, description_day, image_path) VALUES ('$tourId', '$number_day', '$title_day', '$description_day', '$imagePath')";
        $result_insert_day = mysqli_query($connection, $insert_day_query);

        if (!$result_insert_day) {
            $response['error'] = "Failed to insert new days: " . mysqli_error($connection);
            echo json_encode($response);
            exit;
        }
    }
}

// Debug final existing days
echo "Final Existing Days:<pre>";
var_dump($existing_days);
echo "</pre>";

$response['message'] = "Tour Updated Successfully";
echo json_encode($response);
}
?>