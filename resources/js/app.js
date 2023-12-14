document.addEventListener("DOMContentLoaded", function () {
    const calcularBtn = document.getElementById("calcular");
    const horasTotalesElement = document.getElementById("horastotales");

    calcularBtn.addEventListener("click", function () {
        const tablaInputs = document.querySelectorAll(
            '#formulario input[type="number"]'
        );
        let horasTotales = 0;

        tablaInputs.forEach((input) => {
            if (!isNaN(parseInt(input.value))) {
                horasTotales += parseInt(input.value);
            }
        });

        horasTotalesElement.textContent = horasTotales;

        // Verificar si se debe mostrar el modal y asignar el color correspondiente
        const infoModal = new bootstrap.Modal(
            document.getElementById("infoModal")
        );
        if (horasTotales < 18) {
            infoModal.show();
            document.getElementById("modalContent").textContent =
                "Las horas totales son MENORES que 18. Ponte en contacto con el jefe de departamento";
            horasTotalesElement.classList.remove("text-success");
            horasTotalesElement.classList.add("text-danger");
        } else if (horasTotales > 18) {
            infoModal.show();
            document.getElementById("modalContent").textContent =
                "Las horas totales son MAYORES que 18.";
            horasTotalesElement.classList.remove("text-success");
            horasTotalesElement.classList.add("text-danger");
        } else {
            horasTotalesElement.classList.remove("text-danger");
            horasTotalesElement.classList.add("text-success");
        }
    });
    // Cambia <link>addButton.addEventListener</link> por <link>addFormulario.addEventListener</link>
    // Evento para eliminar la última tabla al hacer clic en el botón correspondiente
    const eliminarButton = document.getElementById("eliminarFormulario");
    eliminarButton.addEventListener("click", function () {
        const formulario = document.getElementById("formulario");
        const formularios = formulario.querySelectorAll(".majada-b-rojo");

        if (formularios.length > 0) {
            const ultimaTabla = formularios[formularios.length - 1];
            ultimaTabla.remove();
        } else {
            console.log("No hay tablas para eliminar.");
        }
    });
});

const selectModulo = document.querySelector(
    '#formulario select[aria-label="Default select example"]'
);
const mensaje = "no hay nombre";
function obtenerNombre() {
    // Verificar si el session es compatible con el navegador
    if (typeof Storage !== "undefined") {
        // Obtener el token almacenado en el session
        const name = sessionStorage.getItem("name");

        // Verificar si el token existe
        if (name) {
            return name; // Devolver el valor del token
        } else {
            return mensaje; // Devolver null si no se encuentra el token
        }
    }
}
const nombre = obtenerNombre();

// Verificar si se obtuvo el nombre del sessionStoragre
if (nombre) {
    const saludo = document.getElementById("saludo");
    saludo.textContent = "Bienvenido " + nombre.toUpperCase(); // Mostrar el mensaje de bienvenida con el nombre del usuario
} else {
    console.log("Nombre no encontrado");
}

//
function obtenerToken() {
    // Verificar si el sessionStoragre es compatible con el navegador
    if (typeof Storage !== "undefined") {
        // Obtener el token almacenado en el sessionStoragre
        const token = sessionStorage.getItem("token");

        // Verificar si el token existe
        if (token) {
            return token; // Devolver el valor del token
        } else {
            return null; // Devolver null si no se encuentra el token
        }
    }
}

// Ejemplo de uso:
const token = obtenerToken();

function obtenerEspecialidad() {
    // Verificar si el sessionStoragre es compatible con el navegador
    if (typeof Storage !== "undefined") {
        // Obtener el token almacenado en el sessionStoragre
        const especialidad = sessionStorage.getItem("Especialidad");

        // Verificar si el token existe
        if (especialidad) {
            return especialidad; // Devolver el valor del token
        } else {
            return null; // Devolver null si no se encuentra el token
        }
    }
}

// Ejemplo de uso:
const especialidadId = obtenerEspecialidad();
console.log(especialidadId)


// Verificar si el token existe

// URL de la API que proporciona la información de los módulos
const apiUrl = `http://apicafe.test/api/V1/modulos/especialidad/${especialidadId}`;
fetch(apiUrl, {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
})
    .then((response) => {
        console.log(response);
        return response.json();
    })

    .then((result) => {
        const modulos = result.modulos;
        console.log(modulos);
    
        if (Array.isArray(modulos) && modulos.length > 0) {
            modulos.forEach((modulo) => {
                const option = document.createElement("option");
                option.value = modulo.id;
                option.textContent = modulo.codigo;
                selectModulo.appendChild(option);
                sessionStorage.setItem("modulo", modulo.id);
            });
        } else {
            console.error("El arreglo 'modulos' está vacío o no contiene elementos");
        }

    })
    .catch((error) => {
        console.error("Error al obtener datos de la API:", error);
    });


// Función para manejar el logout

// Obtener una referencia al botón de "logout"
const logoutButton = document.getElementById("logout");

// Agregar un evento de clic al botón
logoutButton.addEventListener("click", function () {
    // Eliminar datos de sesión (por ejemplo, eliminar un token almacenado en sessionStoragre)
    sessionStorage.removeItem("token"); // Cambia 'token' por el nombre de tu clave de sesión

    // Redireccionar a la página de inicio de sesión
    window.location.href = "index.html"; // Cambia '/login' por la URL de tu página de inicio de sesión
});
// Obtener referencia al select y al contenedor de horas

// Función para obtener y mostrar las horas correspondientes al módulo seleccionado
const nombreInput = document.getElementById("nombre");
const horasInput = document.getElementById("horas");
const turnoInput = document.getElementById("turno");
const aulaInput = document.getElementById("aula");

function mostrarHoras(moduloId) {
    const apiUrlHoras = `api/V1/modulos/${moduloId}`;

    fetch(apiUrlHoras, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((result) => {
            const data = result.data;
            console.log(data);

            if (data && data.nombre && data.horas_semanales) {
                // Establecer el valor del input del nombre y las horas_semanales
                nombreInput.value = data.nombre;
                horasInput.value = data.horas_semanales;

                // Llamar a la función sumasPosibles con el valor de horas_semanales
                const horasValue = parseInt(data.horas_semanales);
                if (!isNaN(horasValue)) {
                    const resultados = sumasPosibles(horasValue);

                    // Generar las opciones para el elemento select basado en los resultados
                    const selectOptions = resultados.map((resultado, index) => {
                        return `<option value="${index}">${resultado.join(
                            " - "
                        )}</option>`;
                    });

                    // Asignar las opciones al elemento select
                    resultadosElement.innerHTML = selectOptions.join("");
                }

                const dataCurso = result.data.curso;
                if (data.curso && data.curso.turno) {
                    turnoInput.value = data.curso.turno;
                }

                const dataAula = result.data.aula;
                dataAula.forEach((e) => {
                    if (e && e.numero) {
                        aulaInput.value = e.numero;
                        console.log(e);
                    }
                });
            } else {
                console.error(
                    "No se encontraron datos completos para este módulo"
                );
            }
        })
        .catch((error) => {
            console.error("Error al obtener datos de la API:", error);
        });
}

selectModulo.addEventListener("change", function (event) {
    const moduloIdSeleccionado = event.target.value;
    mostrarHoras(moduloIdSeleccionado);
});

function crearCampos() {
    const nuevoDiv = document.createElement("div");
    nuevoDiv.className =
        "d-flex align-items-center p-3 my-3 majada-b-rojo rounded";

    nuevoDiv.innerHTML = `
<table>
        <thead>
            <tr>
                <th scope="col" class="tabla-width-15">
                    <span class="fw-bold input-group-text">Turno</span>
                </th>
                <th scope="col">
                    <span class="fw-bold input-group-text">Curso y ciclo</span>
                </th>
                <th scope="col">
                    <span class="fw-bold input-group-text">Modulo</span>
                </th>
                <th scope="col" class="tabla-width-5">
                    <span class="fw-bold input-group-text">Horas</span>
                </th>
                <th scope="col" class="tabla-width-15">
                    <span class="fw-bold input-group-text">Dist. Semanal</span>
                </th>
                <th scope="col" class="tabla-width-5">
                    <span class="fw-bold input-group-text">Aula/Taller</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <input type="text" class="form-control" placeholder="Curso y ciclo" aria-label="Curso y ciclo" id="turno">
                </td>
                <td>
                    <input type="text" class="form-control" placeholder="Curso y ciclo" aria-label="Curso y ciclo" id="nombre">
                </td>
                <td>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Seleccionar módulo</option>
                    </select>
                </td>
                <td>
                    <input type="number" class="form-control" placeholder="Horas" aria-label="Horas" id="horas">
                </td>
                <td>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Seleccionar dist. Semanal</option>
                        <option value="1">1+2+2</option>
                        <option value="2">3+3+2</option>
                        <option value="3">3+2+2</option>
                    </select>
                </td>
                <td>
                    <input type="text" class="form-control" placeholder="Aula/Taller" aria-label="Aula/Taller" id="aula">
                </td>
            </tr>
        </tbody>
    </table>
    
    `;

    return nuevoDiv;
}

const botonAgregarCampos = document.getElementById("agregarCampos");
const contenedorFormularios = document.getElementById("contenedorFormularios");
const horastotal = document.getElementById("HorasTotal");

botonAgregarCampos.addEventListener("click", function () {
    const nuevosCampos = crearCampos();

    // Insertar nuevos campos justo antes de HorasTotal
    contenedorFormularios.insertBefore(nuevosCampos, horastotal);
});

// Esta es la función sumasPosibles que ya tienes
function sumasPosibles(numero) {
    let resultados = [];

    function encontrarSumas(actuales, objetivo) {
        if (objetivo === 0 && actuales.length > 0) {
            // Ordenar el array antes de agregarlo a los resultados
            resultados.push(actuales.slice().sort((a, b) => a - b));
            return;
        }

        if (objetivo < 0 || actuales.length === 5) {
            return;
        }

        for (let i = 1; i <= 3; i++) {
            encontrarSumas([...actuales, i], objetivo - i);
        }
    }

    encontrarSumas([], numero);

    // Eliminar duplicados
    resultados = resultados.filter(
        (valor, indice, array) =>
            array.findIndex(
                (arr) => JSON.stringify(arr) === JSON.stringify(valor)
            ) === indice
    );
    console.log(resultados + "totales");
    return resultados;
}

// Obtener referencia al elemento con ID 'horas'
const inputHoras = document.getElementById("horas");
const resultadosElement = document.getElementById("resultadosElement");

function actualizarResultados() {
    const horasValue = parseInt(inputHoras.value);

    if (!isNaN(horasValue)) {
        const resultados = sumasPosibles(horasValue);

        resultadosElement.innerHTML = "";

        resultados.forEach((resultado) => {
            const option = document.createElement("option");
            option.text = resultado.join(" + ");
            resultadosElement.add(option);
        });
    }
}

inputHoras.addEventListener("input", actualizarResultados);

// Ejecutar la función al cargar la página si ya hay un valor en #horas
if (inputHoras.value !== "") {
    actualizarResultados();
}

function mostrarBotonDepartamento() {
    // Verificar si el sessionStorage es compatible con el navegador y obtener el tipo de usuario
    if (typeof Storage !== "undefined") {
        const tipoUsuario = sessionStorage.getItem("TipoUsuario");

        // Verificar si el tipo de usuario es "jefe de departamento"
        if (tipoUsuario === "Jefe de estudios") {
            // Crear un botón para el departamento
            const botonDepartamento = document.createElement("button");
            botonDepartamento.textContent = "Gestionar";
            botonDepartamento.classList.add(
                "btn",
                "btn-outline-primary",
                "me-2"
            ); // Ajustar clases según el estilo deseado
            // Agregar funcionalidad al botón (puede ser un evento 'click', por ejemplo)
            botonDepartamento.addEventListener("click", function () {
                // Colocar aquí la lógica a realizar al hacer clic en el botón
                // Por ejemplo, redirigir a una página de gestión de departamentos, etc.
            });

            // Obtener el contenedor para los botones del encabezado
            const botonesHeader = document.getElementById("botonesHeader");

            // Agregar el botón del departamento al contenedor
            botonesHeader.appendChild(botonDepartamento);
        } else if (tipoUsuario === "Jefe de departamento") {
            const botonDepartamento = document.createElement("button");
            botonDepartamento.textContent = "Gestionar";
            botonDepartamento.classList.add(
                "btn",
                "btn-outline-primary",
                "me-2"
            ); // Ajustar clases según el estilo deseado
            // Agregar funcionalidad al botón (puede ser un evento 'click', por ejemplo)
        }
    }
}

// Llamar a la función para mostrar el botón del departamento cuando sea necesario
document.addEventListener("DOMContentLoaded", function () {
    mostrarBotonDepartamento();
});