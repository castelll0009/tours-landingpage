<?php
// Incluye el archivo de conexión
include 'conexion.php';

try {
    // Realiza una consulta SQL para obtener todos los tours
    $query = "SELECT * FROM tour";
    $statement = $pdo->query($query);

    if ($statement->rowCount() > 0) {
        // Si hay tours, crea una tabla para mostrarlos
        echo '<table class="table table-striped">';
        echo '<thead><tr><th>Título</th><th>Descripción</th><th>Precio</th><th>Tamaño del Grupo</th><th>Duración</th><th>Fecha de Salida</th></tr></thead>';
        echo '<tbody>';
        
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            echo '<tr>';
            echo '<td>' . $row['title'] . '</td>';
            echo '<td>' . $row['description'] . '</td>';
            echo '<td>' . $row['price'] . '</td>';
            echo '<td>' . $row['group_size'] . '</td>';
            echo '<td>' . $row['duration'] . '</td>';
            echo '<td>' . $row['date_departure'] . '</td>';
            echo '</tr>';
        }

        echo '</tbody>';
        echo '</table>';
    } else {
        // Si no hay tours, muestra un mensaje
        echo '<p>No se encontraron tours.</p>';
    }
} catch (PDOException $e) {
    // En caso de un error, muestra el mensaje de error
    echo "Error de conexión: " . $e->getMessage();
}
?>
