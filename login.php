<?php
  session_start();

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $username = $_POST['username'];
      $password = $_POST['password'];
      
      // Verifica las credenciales del usuario (debes usar una base de datos para esto)
      if ($username === 'aaa' && $password === '111') {
          $_SESSION['user'] = $username;
          header('Location: admin_tours.php');
          exit();
      } else {
         
        $_SESSION['error']  = "Credenciales incorrectas. Inténtalo de nuevo.";
       }
      }

            // Verifica si hay un mensaje de error en la sesión y muéstralo
if (isset($_SESSION['error'])) {
  $error = $_SESSION['error'];
  unset($_SESSION['error']); // Elimina el mensaje de error de la sesión
}
  ?>


  <!DOCTYPE html>
  <html style="
      height: 100vh;
  "><head>
  <!--font google lato-->
  <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;1,100;1,700&amp;display=swap" rel="stylesheet">
    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
    body {font-family: Lato, Helvetica, sans-serif;}
  input[type=text], input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  button {
    background-color: #fab526;
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
  <style type="text/css" id="operaUserStyle"></style></head>
  <body style="
      background: #ddac1b;
      background: linear-gradient(45deg, #ddac1b, #fab526);
  ">
  <main style="
      border-radius: 5px;
      padding: 5.6vw;
      margin: 12vw 12vw;
      background: aliceblue;
  ">
  <h2>Login Form</h2>
  <?php
  if (isset($error)) {
    echo '<p id="error-message">Credenciales incorrectas. Inténtalo de nuevo.</p>';
  }
  ?>

<form id="login-form" method="post" action="login.php">
| <div class="container">
    <label for="username"><b>Username</b></label>
    <input type="text" id="username" placeholder="Enter Username" name="username" required="">

    <label for="password"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" id="password" name="password" required="">
        
    <button type="submit">Login</button>
   
  </div>


</form>


  
</main>
</body></html>