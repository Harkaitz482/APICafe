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
                            href="/"
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
                </header>
            </div>

            <div class="container">
                <main class="">
                    <div id="formulario">
                        <div id="informacion"></div>
                        <div id="informacionDepartamento"></div>
                        <div id="curso"></div>
                        <form action="">
                            <div id="contenedorFormularios">
                                <div
                                    class="d-flex align-items-center p-3 my-3 majada-b-rojo rounded shadow-sm"
                                >
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

                                <p
                                    class="text-center fs-4 fw-bold"
                                    id="HorasTotal"
                                >
                                    Horas Totales:
                                    <span id="horastotales">0</span>
                                </p>

                                <div id="contenedorFormularios"></div>

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
                </main>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="js/app.js"></script>
    </body>
</html>
