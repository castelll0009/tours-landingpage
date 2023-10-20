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

    // Campos de la tabla 'dias'
    $number_day = $_POST['number_day'];
    $title_day = $_POST['title_day'];
    $description_day = $_POST['description_day'];

    // Verifica si se ha subido una nueva imagen
    if ($_FILES['image']['size'] > 0) {
        $image = $_FILES['image'];
        $image_name = $image['name'];
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

    // Realiza la actualización de los campos de la tabla 'dias'
    $query_update_dias = "UPDATE dias SET number = '$number_day', title_day = '$title_day', description_day = '$description_day' WHERE tour_id = $tourId";
    $result_update_dias = mysqli_query($connection, $query_update_dias);

    if (!$result_update_tour || !$result_update_inventario || !$result_update_dias) {
        die('Query Failed: ' . mysqli_error($connection));
    }

    echo "Tour Updated Successfully";
}
?>
