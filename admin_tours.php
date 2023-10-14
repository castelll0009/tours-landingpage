<?php
session_start();

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION['user'])) {
    header('Location: login.php'); // Redirige al usuario a la página de inicio de sesión si no ha iniciado sesión
    exit();
}
?>


<html><head>
    <title>GestiÃƒÂ³n de Tours</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&amp;display=swap" rel="stylesheet">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GestiÃƒÂ³n de Tours</title>
    <link rel="stylesheet" href="https://bootswatch.com/4/lux/bootstrap.min.css">        
     <!-- Incluye Bootstrap CSS -->
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/css/bootstrap.min.css">
      <!-- Incluye jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script><style type="text/css" id="operaUserStyle"></style><style type="text/css" id="operaUserStyle"></style>

    <!-- boton fliotante -->
    <style>
        body{
            font-family: 'Lato', sans-serif !important;
        }
        /* Estilo del botÃƒÂ³n flotante */
.btn-float {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1;
}
@media (min-width: 768px) {
    #toggle-view{
        display: none;
    }

}
@media (max-width: 768px) {
    /* Ocultar el formulario de ediciÃƒÂ³n inicialmente */
    #tour-form {
    display: none;
}

}
/* Aplicar estilos de posiciÃƒÂ³n fija al encabezado de la tabla */





    </style>
</head>
<body>
    <button id="toggle-view" class="btn btn-primary btn-float">Edit/List</button>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Manage tours</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
             
                <li class="nav-item">
                    <a class="nav-link" href="#create-tab">Crear Tarea</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Actualizar Tarea</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Eliminar Tarea</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Tours List</a>
                </li>
                <form class="form-inline my-2 my-lg-0">
                    <input name="search" id="search" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </ul>
        </div>
    </nav>
    <div class="container">
        <div class="row p-4">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-body">
                        <!-- FORM TO ADD TOUR -->
                       <!-- FORM TO ADD TOUR -->
<form id="tour-form">
    <div class="form-group">
        <input type="text" id="title" placeholder="Title" class="form-control" required="">
    </div>
    <div class="form-group">
        <textarea id="description" cols="30" rows="10" class="form-control" placeholder="Description" required=""></textarea>
    </div>
    <div class="form-group">
        <input type="number" id="price" placeholder="Price" class="form-control" required="">
    </div>
    <div class="form-group">
        <input type="number" id="group_size" placeholder="Group Size" class="form-control" required="">
    </div>
    <div class="form-group">
        <input type="text" id="duration" placeholder="Duration" class="form-control" required="">
    </div>
    <div class="form-group">
        <input type="date" id="date_departure" class="form-control" required="">
    </div>
    <div class="form-group">
        <input type="text" id="region" placeholder="Region" class="form-control" required="">
    </div>
    <input type="hidden" id="tourId" value="4">
    <button type="submit" class="btn btn-primary btn-block text-center">
        Save Tour
    </button>
</form>

                    </div>
                </div>
            </div>
    
            <!-- TABLE  -->
            <div class="col-md-7">
                <div class="card my-4" id="tour-result" style="display: none;">
                    <div class="card-body">
                        <!-- SEARCH -->
                        <ul id="container"></ul>
                    </div>
                </div>
    
                <div class="table-responsive">
                    <table class="table table-bordered table-sm" style="
    font-weight: 300;
">
                        <thead style="
    background: #6c757d;
    color: white;
    /* text-transform: uppercase; */
">
                            <tr>
                                <td>ID</td>
                                <td>Title</td>
                                <td style="
    font-family: 'Lato';
">Description</td>
                                <td>Price</td>
                                <td>Group Size</td>
                                <td>Duration</td>
                                <td>Date Departure</td>
                                <td>Region</td>
                            </tr>
                        </thead>
                        <tbody id="tours" style="min-height: 100vh;border: 1px solid #dbdbdb !important;">
              <tr data-tourid="4">
                <td>4</td>
                <td>
                  <a href="#" class="tour-item" data-tourid="4">
                    Tour de Playaa
                  </a>
                </td>
                <td>Relájate en las hermosas playas de la costa</td>
                <td>70.00</td>
                <td>30</td>
                <td>5</td>
                <td>2023-11-30</td>
                <td>Costa</td>
                <td>
                  <button class="tour-delete btn btn-danger" data-tourid="4">
                    Delete
                  </button>
                </td>
              </tr>
            
              <tr data-tourid="14">
                <td>14</td>
                <td>
                  <a href="#" class="tour-item" data-tourid="14">
                    nueva
                  </a>
                </td>
                <td>dasd</td>
                <td>11.00</td>
                <td>1</td>
                <td>1</td>
                <td>0001-01-01</td>
                <td>1</td>
                <td>
                  <button class="tour-delete btn btn-danger" data-tourid="14">
                    Delete
                  </button>
                </td>
              </tr>
            
              <tr data-tourid="15">
                <td>15</td>
                <td>
                  <a href="#" class="tour-item" data-tourid="15">
                    Nuevo
                  </a>
                </td>
                <td>12</td>
                <td>2.00</td>
                <td>2</td>
                <td>2</td>
                <td>0323-02-03</td>
                <td>2</td>
                <td>
                  <button class="tour-delete btn btn-danger" data-tourid="15">
                    Delete
                  </button>
                </td>
              </tr>
            
              <tr data-tourid="16">
                <td>16</td>
                <td>
                  <a href="#" class="tour-item" data-tourid="16">
                    El desierto de la Tatacoa
                  </a>
                </td>
                <td>Lugar Magico de Neiva Huila</td>
                <td>1000.00</td>
                <td>10</td>
                <td>2</td>
                <td>0002-02-01</td>
                <td>Huila</td>
                <td>
                  <button class="tour-delete btn btn-danger" data-tourid="16">
                    Delete
                  </button>
                </td>
              </tr>
            
              <tr data-tourid="17">
                <td>17</td>
                <td>
                  <a href="#" class="tour-item" data-tourid="17">
                    Finca el altico
                  </a>
                </td>
                <td>es el mejor lugar de la Argentina Huila cuenta con comida, hospedaje y recreacion acuatica.</td>
                <td>50000.00</td>
                <td>1000</td>
                <td>1</td>
                <td>1112-11-12</td>
                <td>112</td>
                <td>
                  <button class="tour-delete btn btn-danger" data-tourid="17">
                    Delete
                  </button>
                </td>
              </tr>
            
              <tr data-tourid="18">
                <td>18</td>
                <td>
                  <a href="#" class="tour-item" data-tourid="18">
                    1
                  </a>
                </td>
                <td>1</td>
                <td>1.00</td>
                <td>1</td>
                <td>1</td>
                <td>0001-01-01</td>
                <td>11</td>
                <td>
                  <button class="tour-delete btn btn-danger" data-tourid="18">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody></table>
                </div>
             
            </div>
        </div>
    </div>
    

  <!-- Jqury Ajax -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/js/bootstrap.bundle.min.js"></script>

<script src="app.js"></script>



                       
</body></html>