<?php
include('database.php');

if (isset($_POST['title']) && isset($_POST['description'])) {
  $tour_title = $_POST['title'];
  $tour_description = $_POST['description'];
  $price = $_POST['price'];
  $group_size = $_POST['group_size'];
  $duration = $_POST['duration'];
  $date_departure = $_POST['date_departure'];
  $region = $_POST['region'];

  // Asegúrate de modificar el nombre de la tabla y las columnas según tu base de datos
  $query = "INSERT INTO tour (title, description, price, group_size, duration, date_departure, region) VALUES ('$tour_title', '$tour_description', '$price', '$group_size', '$duration', '$date_departure', '$region')";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed: ' . mysqli_error($connection));
  }

  echo "Tour Added Successfully";
}
?>
