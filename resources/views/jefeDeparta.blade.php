<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usuarios y Módulos</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="./css/app.css">
    <style>
        /* Estilo personalizado para la tabla */
        .table-bordered {
            border: 2px solid black; /* Cambiamos el ancho y el color del borde */
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="container">
            <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-4 mb-4 border-bottom">
                <div class="col-md-1 mb-2 mb-md-0">
                    <a href="form.html" class="d-inline-flex link-body-emphasis text-decoration-none">
                        <img src="./file/logo/cropped-logo_oficial_transparente.png" class="bi" width="120" height="80" aria-label="Logo majada" alt="">
                    </a>
                </div>
                <h1 id="informacionDepartamento" class="saludo me-5"></h1>
                <div id="botonesHeader" class="col-0 text-center">
                    <button id="logout" type="button" class="btn btn-outline-danger">Logout</button>
                    
                </div>
            </header>
            <div class="container mt-4">
                <div class="table-responsive">
                    <table class="table table-bordered rounded table-hover">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Horas totales</th>
                                <th scope="col">Carga Horaria</th>
                                <th scope="col">Modulo</th>
                            </tr>
                        </thead>
                        <tbody id="usuarios-table-body">
                            <!-- Aquí se insertarán las filas con los datos de los usuarios y módulos -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script  src="js/jefeDeparta.js"></script>
</body>
</html>
