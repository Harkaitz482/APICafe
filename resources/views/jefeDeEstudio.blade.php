<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css"
        />
        <link rel="stylesheet" href="./css/app.css" />
        <title>Formulario</title>

        <style>
            /* Estilo para el contenedor de las tarjetas */
            .card-container .card {
                width: calc(20% - 20px); /* Ancho del 20% para ajustar 5 tarjetas por fila con un pequeño espacio entre ellas */
                margin: 10px;
                height: 0%; /* Espacio entre las tarjetas */
            }
        </style>
    </head>

    <body>
        <div class="container">
            <div class="container">
                <header
                    class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-4 mb-54 border-bottom"
                >
                    <div class="col-md-1 mb-2 mb-md-0">
                        <a
                            href="form.html"
                            class="d-inline-flex link-body-emphasis text-decoration-none"
                        >
                            <img
                                src="./file/logo/cropped-logo_oficial_transparente.png"
                                class="bi"
                                width="70"
                                height="60"
                                aria-label="Logo majada"
                                alt=""
                            />
                        </a>
                    </div>
                    <h1 id="saludo" class="saludo me-5">Departamentos</h1>
                    <div id="botonesHeader" class="col-0 text-center">
                        <button
                            id="logout"
                            type="button"
                            class="btn btn-outline-danger"
                        >
                            Logout
                        </button>
                        <button
    id="horario"
    type="button"
    class="btn btn-outline-success"
>
                        horario
                    </button>

                        <button
                        id="aulas"
                        type="button"
                        class="btn btn-outline-primary"
                    >
                        Aulas
                    </button>
                    </div>


                    
                </header>

                <div id="informacion"> </div>

            </div>
            <div class="container">

                <div id="departamentos-container" class="card-container d-flex flex-wrap justify-content-center d-inline"></div>
                <div id="modulos-container"></div>
                



        </div>
        <footer class="footer mt-auto py-3 bg-light">
            <div class="container text-center">
                <img src="./file/logo/descarga.png" alt="cmm" width="5%">
                <span class="text-muted">©  Aridane Cabrera Ramirez y Harkaitz Trujillo Corrales. Todos los derechos reservados.</span>
            </div>
        </footer>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap/dist/js/bootstrap.min.js"></script>
        <script  src="js/jefedeEstudio.js"></script>
    </body>
</html>
