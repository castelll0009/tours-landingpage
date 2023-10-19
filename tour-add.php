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

    // Handle image upload
    $image = $_FILES['image'];
    $image_name = $image['name'];
    $image_tmp = $image['tmp_name'];
    $image_path = 'imgs/' . $image_name;

    if (move_uploaded_file($image_tmp, $image_path)) {
        // Image moved successfully, now insert other data into the database
        $query = "INSERT INTO tour (title, description, price, group_size, duration, date_departure, region, image_path) VALUES ('$tour_title', '$tour_description', '$price', '$group_size', '$duration', '$date_departure', '$region', '$image_path')";
        $result = mysqli_query($connection, $query);

        if (!$result) {
            die('Query Failed: ' . mysqli_error($connection));
        }

        echo "Tour Added Successfully";
    } else {
        echo "Image upload failed";
    }
}
?>
