<?php
// Configuración de la base de datos

$connection = mysqli_connect(
    '162.241.61.135', 'caracar1_castell', 'castell1997', 'caracar1_caracara_db'
  ); 
  
// $host = '162.241.61.135'; // Puede ser una dirección IP o un nombre de dominio
// $database = 'caracar1_caracara_db';
// $username = 'caracar1_castell';
// $password = 'castell1997';

// // Crear una conexión a la base de datos
// $connection = mysqli_connect($host, $username, $password, $database);
// if (!$connection) {
//     die('Error de conexión: ' . mysqli_connect_error());
// } else {
//     echo 'Database is connected';
// }

// try {
//     // Crear una conexión PDO a la base de datos
//     $pdo = new PDO("mysql:host=$host;dbname=$database", $username, $password);

//     // Configurar PDO para mostrar errores
//     $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//     // Verificar la conexión exitosa y mostrar una alerta
//     if ($pdo) {
//         echo '<script>alert("Conexión exitosa a la base de datos");</script>';
//     }

//     // Realizar consultas a la base de datos aquí
//     // Ejemplo: $result = $pdo->query("SELECT * FROM tabla");

//     // Cerrar la conexión cuando hayas terminado
//     $pdo = null;
// } catch (PDOException $e) {
//     // En caso de un error, muestra el mensaje de error y una alerta de falla
//     echo "Error de conexión: " . $e->getMessage();
//     echo '<script>alert("Error de conexión a la base de datos");</script>';
// }
?>
