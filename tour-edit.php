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
    $all_year = isset($_POST['all_year']) ? $_POST['all_year'] : 0; // Nueva variable
    
    // Campos de la tabla 'tour'
    $price_visible = isset($_POST['price_visible']) ? $_POST['price_visible'] : 0;
    $discount = $_POST['discount'];
    $discount_visible = isset($_POST['discount_visible']) ? $_POST['discount_visible'] : 0;
      
    // Verifica si se ha subido una nueva imagen tour
    if (isset($_FILES['previewImage']) && $_FILES['previewImage']['size'] > 0) {
        // ... (código existente para manejar la imagen)
    }
    
    // Realiza la actualización de los campos del tour (sin incluir la imagen)
    $query_update_tour = "UPDATE tour SET title = '$title', description = '$description', price = '$price', group_size = '$group_size', duration = '$duration', date_departure = '$date_departure', region = '$region', price_visible = '$price_visible', discount = '$discount', discount_visible = '$discount_visible' WHERE id = $tourId";
    $result_update_tour = mysqli_query($connection, $query_update_tour);
    
    // Realiza la actualización de los campos de la tabla 'inventario'
    $query_update_inventario = "UPDATE inventario SET pax = '$pax', include = '$include', not_include = '$not_include', single_supplement = '$single_supplement', all_year = '$all_year' WHERE tour_id = $tourId";
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
        $image_path_day = $day['image_path'];
        $existing_image_path = $image_path_day;
        echo "FUERA Existing Image Path for Day $number_day: $existing_image_path<br>";
        // Check if the day exists in the database
            // Agrega var_dump para imprimir información de depuración

            $existing_image_path = $image_path_day;
            
            // Debug existing image path
            echo "Existing Image Path for Day $number_day: $existing_image_path<br>";
            
            // Check if a new image is uploaded for the day
            if(isset($_FILES['dayImage' . $number_day]) && $_FILES['dayImage' . $number_day]['size'] > 0){
                
                // Handle image upload for the day
                $day_image = $_FILES['dayImage' . $number_day];
                if (!empty($day_image)) {
                    $day_image_name = $day_image['name'];
                    $day_image_tmp = $day_image['tmp_name'];
                    $day_image_path = 'imgs/' . $day_image_name;
                    
                    // Print the day image path before saving
                    print("Day $number_day Image Path: $day_image_path<br>");
                    
                    if (move_uploaded_file($day_image_tmp, $day_image_path)) {
                        // Image for the day moved successfully
                        $image_day = $day_image_path;
                    } else {
                        echo json_encode(["error" => "Day $number_day image upload failed"]);
                    }
                }
                
                $query_dias = "INSERT INTO dias (tour_id, number, title_day, description_day, image_path) VALUES ('$tourId', '$number_day', '$title_day', '$description_day', '$image_day')";
                $result_dias = mysqli_query($connection, $query_dias);
                
                if (!$result_dias) {
                    // Handle errors if necessary
                }
            }else{
                //ya hay imagen o se quiere conservar la imagen anterior entonces solo se actualizan los datos y se pone la ruta image_path ya existente
                
                // Update the existing day information
                $query_dias = "INSERT INTO dias (tour_id, number, title_day, description_day, image_path) VALUES ('$tourId', '$number_day', '$title_day', '$description_day', '$existing_image_path')";
                $result_dias = mysqli_query($connection, $query_dias);
                
                if (!$result_dias) {
                    // Handle errors if necessary
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