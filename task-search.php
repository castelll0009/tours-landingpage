<?php

include ('conexion.php');

$search = $_POST['search'];
if(!empty($search)) {
  $query = "SELECT * FROM tour WHERE title LIKE '$search%'";
  $result = mysqli_query($connection, $query);
  
  if(!$result) {
    die('Query Error' . mysqli_error($connection));
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
          'region' => $row['region']
      );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
  
}

?>
