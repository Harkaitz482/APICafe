<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css"
    />
    <link rel="stylesheet" href="../css/style.css" />
    <title>Formulario</title>
  </head>

  <body>
    <div class="container">
      <div class="container">
        <header
          class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
        >
          <div class="col-md-3 mb-2 mb-md-0">
            <a
              href="/"
              class="d-inline-flex link-body-emphasis text-decoration-none"
            >
              <img
                src="../file/logo/cropped-logo_oficial_transparente.png"
                class="bi"
                width="70"
                height="60"
                aria-label="Logo majada"
                alt=""
              />
            </a>
          </div>
          <p>Hola profesor</p>
          <div class="col-md-3 text-end"></div>
        </header>
      </div>
      <div class="container">
        <main class="">
          <div id="formulario">
            <form action="">
              <div
                class="d-flex align-items-center p-3 my-3 majada-b-rojo rounded shadow-sm"
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col" class="tabla-width-5">
                        <span class="fw-bold input-group-text">Turno</span>
                      </th>
                      <th scope="col">
                        <span class="fw-bold input-group-text"
                          >Curso y ciclo</span
                        >
                      </th>
                      <th scope="col">
                        <span class="fw-bold input-group-text">Modulo</span>
                      </th>
                      <th scope="col" class="tabla-width-5">
                        <span class="fw-bold input-group-text">Horas</span>
                      </th>
                      <th scope="col" class="tabla-width-15">
                        <span class="fw-bold input-group-text"
                          >Dist. Semanal</span
                        >
                      </th>
                      <th scope="col" class="tabla-width-5">
                        <span class="fw-bold input-group-text"
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
                          placeholder="M/T"
                          aria-label="M/T"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Curso y ciclo"
                          aria-label="Curso y ciclo"
                        />
                      </td>
                      <td>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Selecionar modulo</option>   
                        </select>
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Horas"
                          aria-label="Horas"
                        />
                      </td>
                      <td>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Selecionar dist. Semanal</option>
                          <option value="1">1+2+2</option>
                          <option value="2">3+3+2</option>
                          <option value="3">3+2+2</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Aula/Taller"
                          aria-label="Aula/Taller"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="d-flex align-items-center p-3 my-3 majada-b-amarillo rounded shadow-sm"
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col" class="tabla-width-5">
                        <span class="fw-bold input-group-text">Turno</span>
                      </th>
                      <th scope="col">
                        <span class="fw-bold input-group-text"
                          >Curso y ciclo</span
                        >
                      </th>
                      <th scope="col">
                        <span class="fw-bold input-group-text">Modulo</span>
                      </th>
                      <th scope="col" class="tabla-width-5">
                        <span class="fw-bold input-group-text">Horas</span>
                      </th>
                      <th scope="col" class="tabla-width-15">
                        <span class="fw-bold input-group-text"
                          >Dist. Semanal</span
                        >
                      </th>
                      <th scope="col" class="tabla-width-5">
                        <span class="fw-bold input-group-text"
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
                          placeholder="M/T"
                          aria-label="M/T"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Curso y ciclo"
                          aria-label="Curso y ciclo"
                        />
                      </td>
                      <td>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Selecionar modulo</option>
                          <option value="1">DSW</option>
                          <option value="2">DPL</option>
                          <option value="3">DEW</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Horas"
                          aria-label="Horas"
                        />
                      </td>
                      <td>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Selecionar dist. Semanal</option>
                          <option value="1">1+2+2</option>
                          <option value="2">3+3+2</option>
                          <option value="3">3+2+2</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Aula/Taller"
                          aria-label="Aula/Taller"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- ... (código HTML existente) ... -->

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
                      <h5 class="modal-title" id="infoModalLabel">
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
                        Las horas totales están dentro del rango correcto.
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

              <p class="text-center fs-4 fw-bold" id="HorasTotal">
                Horas Totales: <span id="horastotales">0</span>
              </p>
              <div id="botones">
                <button
                  type="button"
                  class="btn btn-outline-success"
                  id="calcular"
                >
                  Enviar
                </button>
                <button type="button" class="btn btn-outline-primary">
                  Añadir tabla
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="{{ asset('js/app.js.js') }}"></script>
  </body>
</html>
