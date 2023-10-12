<?php




$connection = mysqli_connect(
  'localhost', 'root', 'password', 'caracara_db'
);

//for testing connection
if($connection) {
 echo 'database is connected';
}

// $host = '162.241.61.135'; // Puede ser una dirección IP o un nombre de dominio
// $database = 'caracar1_caracara_db';
// $username = 'caracar1_castell';
// $password = 'castell1997';
?>
