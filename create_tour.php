<?php
// Configuración de la base de datos
include 'conexion.php';

try {
    // Crear una conexión PDO a la base de datos
    $pdo = new PDO("mysql:host=$host;dbname=$database", $username, $password);

    // Configurar PDO para mostrar errores
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Recuperar datos del formulario
    $title = $_POST['title'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $group_size = $_POST['group_size'];
    $duration = $_POST['duration'];
    $date_departure = $_POST['date_departure'];

    // Preparar la consulta SQL para insertar un nuevo tour
    $query = "INSERT INTO tour (title, description, price, group_size, duration, date_departure) 
              VALUES (:title, :description, :price, :group_size, :duration, :date_departure)";
    
    // Preparar la sentencia PDO
    $statement = $pdo->prepare($query);

    // Vincular parámetros
    $statement->bindParam(':title', $title);
    $statement->bindParam(':description', $description);
    $statement->bindParam(':price', $price);
    $statement->bindParam(':group_size', $group_size);
    $statement->bindParam(':duration', $duration);
    $statement->bindParam(':date_departure', $date_departure);

    // Ejecutar la consulta
    $statement->execute();

    // Redirigir al usuario a la lista de tours o a la página de éxito
    header("Location: lista_tours.php");
    exit();
} catch (PDOException $e) {
    // En caso de un error, muestra el mensaje de error
    echo "Error de conexión: " . $e->getMessage();
}
?>
