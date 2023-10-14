<?php
include('database.php');

if (isset($_POST['title']) && isset($_POST['description'])) {
    $tourId = $_POST['id'];
    $title = $_POST['title'];
    $description = $_POST['description'];
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
    // Make sure to replace 'your_image_column_name' with the actual column name for the image path in your database
    $query = "UPDATE tour SET title = '$title', description = '$description', price = '$price', group_size = '$group_size', duration = '$duration', date_departure = '$date_departure', region = '$region', image_path = '$image_path' WHERE id = $tourId";
    
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
