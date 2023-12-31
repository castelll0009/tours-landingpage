<?php
include('database.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recuperar el tourId del formulario
    $tourId = $_POST['tourId'];

    // Obtener el JSON de días enviado desde JavaScript
    $jsonDays = $_POST['days'];
    $days = json_decode($jsonDays, true); // Decodificar el JSON en un array asociativo

    // Insertar cada día en la tabla 'dias' asociándolo al tourId
    foreach ($days as $day) {
        $number_day = $day['number'];
        $title_day = $day['title'];
        $description_day = $day['description'];

        $query = "INSERT INTO dias (tour_id, number, title_day, description_day) VALUES ('$tourId', '$number_day', '$title_day', '$description_day')";
        $result = mysqli_query($connection, $query);

        if (!$result) {
            // Manejar errores si es necesario
        }
    }

    // Responder con un mensaje de éxito
    echo json_encode(["message" => "Tour and Days Added Successfully"]);
}
?>
