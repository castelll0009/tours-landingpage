<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    // Verifica las credenciales del usuario (debes usar una base de datos para esto)
    if ($username === 'aaa' && $password === '111') {
        $_SESSION['user'] = $username;
        header('Location: admin_tour.php');
        exit();
    } else {
        $error = "Credenciales incorrectas. Inténtalo de nuevo.";
    }
}
?>


<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {font-family: Arial, Helvetica, sans-serif;}
form {border: 3px solid #f1f1f1;}

input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

img.avatar {
  width: 40%;
  border-radius: 50%;
}

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
     display: block;
     float: none;
  }
  .cancelbtn {
     width: 100%;
  }
}
</style>
</head>
<body>

<h2>Login Form</h2>
<?php if (isset($error)) { echo "<p>$error</p>"; } ?>
<form id="login-form" method="post" action="login.php">
  <!-- <div class="imgcontainer">
    <img src="img_avatar2.png" alt="Avatar" class="avatar">
  </div> -->
  
  <div class="container">
    <label for="username"><b>Username</b></label>
    <input type="text" id="username" placeholder="Enter Username" name="username" required>

    <label for="password"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" id="password" name="password" required>
        
    <button type="submit">Login</button>
    <!-- <label>
      <input type="checkbox"  checked="checked" name="remember"> Remember me
    </label> -->
  </div>

  <!-- <div class="container" style="background-color:#f1f1f1">
    <button type="button" class="cancelbtn">Cancel</button>
    <span class="psw">Forgot <a href="#">password?</a></span>
  </div> -->
</form>


    <!-- <script>
        // Agrega una función para manejar el envío del formulario y validar el inicio de sesión
        document.getElementById("login-form").addEventListener("submit", function(event) {
            event.preventDefault();
            
            // Aquí debes realizar la validación del nombre de usuario y contraseña
            // Por ejemplo:
            const username = document.getElementById("login_username").value;
            const password = document.getElementById("login_password").value;
            
            // Realiza la validación, por ejemplo, comparando con datos almacenados en una base de datos
            if (username === "josecara" && password === "12345_") {
                alert("Inicio de sesión exitoso");
                window.location.href = "admin_tours.html";
                // Aquí puedes redirigir al usuario a la página de inicio o realizar otras acciones
            } else {
                alert("Nombre de usuario o contraseña incorrectos");
                
            }
        });

          // Función para verificar si las credenciales son válidas (debes personalizar esta lógica)
    function isValidUser(username, password) {
        // Aquí debes implementar tu lógica de autenticación.
        // Por ejemplo, comparar con credenciales almacenadas en una base de datos o en una lista de usuarios permitidos.
        // Retorna true si las credenciales son válidas, de lo contrario, retorna false.
        return (username === "usuario" && password === "contrasena");
    }
    </script> -->
  </body>

</html>