<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css"
        />
        <link rel="stylesheet" href="css/app.css" />
        <title>Formulario</title>
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
                    <h1 id="saludo" class="saludo me-5"></h1>
                    <div id="botonesHeader" class="col-0 text-center">
                        <button
                            id="logout"
                            type="button"
                            class="btn btn-outline-danger"
                        >
                            Logout
                        </button>

                        <button
                        id="departamento"
                        type="button"
                        class="btn btn-outline-primary"
                    >
                        Departamentos
                    </button>
                    </div>
                </header>

                <div id="informacion"></div>

            </div>
            <div class="container">

                <div id="aulas-container">

                    <div class="modal fade" id="modalCursos" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalTitle">Curso Asociado al Aula</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <ul class="list-group" id="cursoDetails">
                                        <!-- Aquí se insertarán los detalles del curso -->
                                    </ul>
                                    <p class="no-course" style="display: none;">No hay curso asociado a este aula.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    


                </div>





        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap/dist/js/bootstrap.min.js"></script>
        <script  src="js/aulasJefatura.js"></script>
    </body>
</html>
