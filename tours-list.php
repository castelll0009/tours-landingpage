<?php
include('database.php');

$query = "SELECT tour.*, inventario.include, inventario.not_include, inventario.single_supplement, dias.number, dias.title_day, dias.description_day
          FROM tour
          LEFT JOIN inventario ON tour.inventory_id = inventario.id
          LEFT JOIN dias ON inventario.dias_id = dias.id";
$result = mysqli_query($connection, $query);

if (!$result) {
  die('Query Failed: ' . mysqli_error($connection));
}

$json = array();
while ($row = mysqli_fetch_array($result)) {
  $json[] = array(
    'id' => $row['id'],
    'title' => $row['title'],
    'description' => $row['description'],
    'price' => $row['price'],
    'group_size' => $row['group_size'],
    'duration' => $row['duration'],
    'date_departure' => $row['date_departure'],
    'region' => $row['region'],
    'image_path' => $row['image_path'],
    'include' => $row['include'], // Nuevo campo Include de la tabla inventario
    'not_include' => $row['not_include'], // Nuevo campo Not Include de la tabla inventario
    'single_supplement' => $row['single_supplement'], // Nuevo campo Single Supplement de la tabla inventario
    'number' => $row['number'], // Nuevo campo Number de la tabla dias
    'title_day' => $row['title_day'], // Nuevo campo Title de la tabla dias
    'description_day' => $row['description_day'] // Nuevo campo Description de la tabla dias
  );
}

$jsonstring = json_encode($json);
echo $jsonstring;
?>
