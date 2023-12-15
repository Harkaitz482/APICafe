let moduloIdSeleccionado;

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

            enviarCambios();
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

    // Manejar el error, mostrar mensajes, etc.
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

const especialidadId = obtenerEspecialidad();
console.log(especialidadId);

// Verificar si el token existe

// URL de la API que proporciona la información de los módulos
const apiUrl = `https://prueba-i03j.onrender.com/api/V1/modulos/especialidad/${especialidadId}`;
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
            console.error(
                "El arreglo 'modulos' está vacío o no contiene elementos"
            );
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
    window.location.href = "/"; // Cambia '/login' por la URL de tu página de inicio de sesión
});
// Obtener referencia al select y al contenedor de horas

// Función para obtener y mostrar las horas correspondientes al módulo seleccionado
const nombreInput = document.getElementById("nombre");
const horasInput = document.getElementById("horas");
const turnoInput = document.getElementById("turno");
const aulaInput = document.getElementById("aula");

let moduloSeleccionado;

function mostrarHoras(moduloId) {
    const apiUrlHoras = `https://prueba-i03j.onrender.com/api/V1/modulos/${moduloId}`;

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
    moduloIdSeleccionado = event.target.value;
    mostrarHoras(moduloIdSeleccionado);
});
function enviarCambios() {
    const userId = obtenerUserID(); // Asegúrate de tener una función que devuelva el user_id
    const cargaHorariaElement = document.getElementById("resultadosElement");
    const cargaHoraria = cargaHorariaElement.options[cargaHorariaElement.selectedIndex].text; // Obtener el texto de la opción seleccionada
    const dataToUpdate = {
        user_id: userId,
        CargaHoraria: cargaHoraria,
    };
    console.log(dataToUpdate);
    // URL de la API para actualizar los datos
    const putUrl = `https://prueba-i03j.onrender.com/api/V1/modulos/${moduloIdSeleccionado}`; // Ajusta la URL según la estructura de tu API
    console.log(putUrl);
    // Realizar el fetch con el método PUT
    fetch(putUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Asegúrate de tener el token definido
        },
        body: JSON.stringify(dataToUpdate),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al actualizar los datos");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Datos actualizados:", data);
            // Aquí puedes realizar acciones adicionales después de la actualización, si es necesario
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

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
        console.log(tipoUsuario);

        // Verificar si el tipo de usuario es "Jefe de estudios" o "Jefe de departamento"
        if (
            tipoUsuario === "jefe de departamento" ||
            tipoUsuario === "jefe de departamento"
        ) {
            // Crear un botón para el departamento
            const botonDepartamento = document.createElement("button");
            botonDepartamento.textContent = "Gestionar";
            botonDepartamento.classList.add(
                "btn",
                "btn-outline-primary",
                "me-2"
            ); // Ajustar clases según el estilo deseado

            // Agregar funcionalidad al botón: redirigir al hacer clic en el botón
            botonDepartamento.addEventListener("click", function () {
                window.location.href = "/JefeDepart";
                // Cambiar "jefedepartamento.html" por la URL correcta a la que deseas redirigir
            });

            // Obtener el contenedor para los botones del encabezado
            const botonesHeader = document.getElementById("botonesHeader");

            // Agregar el botón del departamento al contenedor
            botonesHeader.appendChild(botonDepartamento);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    mostrarBotonDepartamento();
});

function mostrarBotonJefeDeEstudios() {
    // Verificar si el sessionStorage es compatible con el navegador y obtener el tipo de usuario
    if (typeof Storage !== "undefined") {
        const tipoUsuario = sessionStorage.getItem("TipoUsuario");

        // Verificar si el tipo de usuario es "Jefe de estudios" o "Jefe de departamento"
        if (
            tipoUsuario === "Jefe de estudios" ||
            tipoUsuario === "Jefe de departamento"
        ) {
            // Crear un botón para el departamento
            const botonDepartamento = document.createElement("button");
            botonDepartamento.textContent = "Gestionar";
            botonDepartamento.classList.add(
                "btn",
                "btn-outline-primary",
                "me-2"
            ); // Ajustar clases según el estilo deseado

            // Agregar funcionalidad al botón: redirigir al hacer clic en el botón
            botonDepartamento.addEventListener("click", function () {
                window.location.href = "/JefeEstudios";
                // Cambiar "jefedepartamento.html" por la URL correcta a la que deseas redirigir
            });

            // Obtener el contenedor para los botones del encabezado
            const botonesHeader = document.getElementById("botonesHeader");

            // Agregar el botón del departamento al contenedor
            botonesHeader.appendChild(botonDepartamento);
        }
    }
}

// Llamar a la función para mostrar el botón del departamento cuando sea necesario
document.addEventListener("DOMContentLoaded", function () {
    mostrarBotonJefeDeEstudios();
});

const especialidadNombreUrl = `https://prueba-i03j.onrender.com/api/V1/especialidades/${especialidadId}`;

fetch(especialidadNombreUrl, {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
})
    .then((response) => {
        if (!response.ok) {
            throw new Error("La solicitud no fue exitosa");
        }
        return response.json();
    })
    .then((result) => {
        const nombreEspecialidad = result.data.nombre; // Asegúrate de que el campo "nombre" sea el correcto
        const informacionDiv = document.getElementById("informacion");

        informacionDiv.textContent = `Especialidad: ${nombreEspecialidad}`;
        // O puedes utilizar innerHTML si quieres insertar HTML
        // informacionDiv.innerHTML = `Especialidad: ${nombreEspecialidad}`;
    })
    .catch((error) => {
        console.error("Error al obtener datos de la API:", error);
    });

function obtenerDepartamento() {
    // Verificar si el sessionStoragre es compatible con el navegador
    if (typeof Storage !== "undefined") {
        // Obtener el token almacenado en el sessionStoragre
        const departamento = sessionStorage.getItem("departamento");

        // Verificar si el token existe
        if (departamento) {
            return departamento; // Devolver el valor del token
        } else {
            return null; // Devolver null si no se encuentra el token
        }
    }
}

const departamentoId = obtenerDepartamento();
console.log(departamentoId);

const departamentoNombreUrl = `https://prueba-i03j.onrender.com/api/V1/departamento/${departamentoId}`;

fetch(departamentoNombreUrl, {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
})
    .then((response) => {
        if (!response.ok) {
            throw new Error("La solicitud no fue exitosa");
        }
        return response.json();
    })
    .then((result) => {
        console.log(result); // Imprime toda la respuesta para revisar su estructura

        const departamento = result.departamento; // Accede al objeto 'departamento'
        if (departamento && departamento.nombre) {
            const nombreDepartamento = departamento.nombre;
            console.log(nombreDepartamento);
            const informacionDiv = document.getElementById(
                "informacionDepartamento"
            );
            informacionDiv.textContent = `Departamento: ${nombreDepartamento}`;
        } else {
            console.error(
                "No se encontró el nombre del departamento en los datos recibidos"
            );
        }
    });

function obtenerCurso() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1;
    const añoActual = fechaActual.getFullYear();

    let curso = añoActual;

    if (mesActual >= 9) {
        curso = `${añoActual}/${añoActual + 1}`;
    } else {
        curso = `${añoActual - 1}/${añoActual}`;
    }

    return curso;
}

// Obtener el elemento HTML con el ID "curso"
const cursoElemento = document.getElementById("curso");

// Obtener el curso y asignarlo al contenido del elemento HTML
const cursoActual = obtenerCurso();
cursoElemento.textContent = "Curso: " + cursoActual;

function obtenerUserID() {
    // Verificar si el sessionStoragre es compatible con el navegador
    if (typeof Storage !== "undefined") {
        // Obtener el token almacenado en el sessionStoragre
        const user = sessionStorage.getItem("UserID");

        // Verificar si el token existe
        if (user) {
            return user; // Devolver el valor del token
        } else {
            return null; // Devolver null si no se encuentra el token
        }
    }
}
