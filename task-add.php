<?php
include('database.php');

if (isset($_POST['title']) && isset($_POST['description'])) {
  $tour_title = $_POST['title'];
  $tour_description = $_POST['description'];

  // Asegúrate de modificar el nombre de la tabla y las columnas según tu base de datos
  $query = "INSERT INTO tour (title, description) VALUES ('$tour_title', '$tour_description')";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed: ' . mysqli_error($connection));
  }

  echo "Tour Added Successfully";
}
?>
