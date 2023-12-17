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
                                width="120"
                                height="80"
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
                    </div>


                <div class="position-fixed top-0 end-0 p-3">
    <button id="botonInformacion" type="button" class="btn btn-primary"><img src="./file/logo/info.png" alt="info" width="30px" height="35px"></button>
    </div>
                </header>
            </div>

            <div class="container">
                <main class=""> 
                    <div id="formulario">
                        <div class="informacion-container my-2 p-2 border border-dark border-2" id="informacionProfe">
                        <div id="informacion"></div>
                        <div id="informacionDepartamento"></div>
                        <div id="curso"></div>
                    </div>
                        <form action="">
                            <div id="contenedorFormularios">
                                <div
                                    class="d-flex align-items-center p-3 my-3 majada-b-rojo rounded shadow-sm"
                                >
                                <div class="table-responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th
                                                    scope="col"
                                                    class="tabla-width-15"
                                                >
                                                    <span
                                                        class="fw-bold input-group-text"
                                                        >Turno</span
                                                    >
                                                </th>
                                                <th scope="col">
                                                    <span
                                                        class="fw-bold input-group-text"
                                                        >Curso y ciclo</span
                                                    >
                                                </th>
                                                <th scope="col">
                                                    <span
                                                        class="fw-bold input-group-text"
                                                        >Modulo</span
                                                    >
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="tabla-width-5"
                                                >
                                                    <span
                                                        class="fw-bold input-group-text"
                                                        >Horas</span
                                                    >
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="tabla-width-15"
                                                >
                                                    <span
                                                        class="fw-bold input-group-text"
                                                        >Dist. Semanal</span
                                                    >
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="tabla-width-5"
                                                >
                                                    <span
                                                        class="fw-bold input-group-text"
                                                        >Aula/Taller</span
                                                    >
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="Curso y ciclo"
                                                        aria-label="turno"
                                                        id="turno"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="Curso y ciclo"
                                                        aria-label="Curso y ciclo"
                                                        id="nombre"
                                                    />
                                                </td>
                                                <td>
                                                    <select
                                                        class="form-select"
                                                        aria-label="Default select example"
                                                    >
                                                        <option selected>
                                                            Seleccionar módulo
                                                        </option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        class="form-control"
                                                        placeholder="Horas"
                                                        aria-label="Horas"
                                                        id="horas"
                                                    />
                                                </td>
                                                <td>
                                                    <select
                                                        type="text"
                                                        class="form-select"
                                                        aria-label="Default select example"
                                                        id="resultadosElement"
                                                    ></select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="Aula/Taller"
                                                        aria-label="Aula/Taller"
                                                        id="aula"
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                </div>

                                <div
                                    class="modal fade"
                                    id="infoModal"
                                    tabindex="-1"
                                    aria-labelledby="infoModalLabel"
                                    aria-hidden="true"
                                >
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5
                                                    class="modal-title"
                                                    id="infoModalLabel"
                                                >
                                                    Información sobre Horas
                                                </h5>
                                                <button
                                                    type="button"
                                                    class="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                ></button>
                                            </div>
                                            <div class="modal-body">
                                                <p id="modalContent">
                                                    Las horas totales están
                                                    dentro del rango correcto.
                                                </p>
                                            </div>
                                            <div class="modal-footer">
                                                <button
                                                    type="button"
                                                    class="btn btn-secondary"
                                                    data-bs-dismiss="modal"
                                                >
                                                    Cerrar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- ... (código HTML existente) ... -->
                                <tr>
                                    <td colspan="6">
                                        <textarea
                                            class="form-control border-black"
                                            placeholder="Observaciones"
                                            aria-label="Observaciones"
                                            id="observaciones"
                                            rows="3"
                                        ></textarea>
                                    </td>
                                </tr>
                                <div class="mb-3"></div>
                                <p class="text-start fs-4 fw-bold border border-dark border-3 p-2 rounded-start" id="HorasTotal">
                                    <span class="me-2">Horas Totales:</span>
                                    <span id="horastotales">0</span>
                                </p>
                                

                                <div id="botones">
                                    <button
                                        type="button"
                                        class="btn btn-outline-success"
                                        id="calcular"
                                    >
                                        Enviar
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-outline-primary"
                                        id="agregarCampos"
                                    >
                                        Añadir tabla
                                    </button>
                                    <button
                                        id="eliminarFormulario"
                                        type="button"
                                        class="btn btn-outline-danger"
                                    >
                                        Eliminar Formulario
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>




                    <!-- Modal -->
                    <div class="modal fade" id="modalInformacion" tabindex="-1" aria-labelledby="modalInformacionLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalInformacionLabel">IMPORTANTE</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <!-- Contenido del modal -->
                                    <p>Cada usuario debe estar dentro de las 18 horas totales. En caso de lo contrario acuda al jefe de departamento.</p>
                                    <p>Se debe seleccionar un modulo y la dsitribucion semanal, el resto se autocompleta.</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

                </main>
            </div>
        </div>
        <footer class="footer mt-auto py-3 bg-light">
            <div class="container text-center">
                <img src="./file/logo/descarga.png" alt="cmm" width="5%">
                <span class="text-muted">©  Aridane Cabrera Ramirez y Harkaitz Trujillo Corrales. Todos los derechos reservados.</span>
            </div>
        </footer>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap/dist/js/bootstrap.min.js"></script>
        <script type="module" src="./js/app.js"></script>
    </body>
</html>
