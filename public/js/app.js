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
    // Evento para agregar una nueva tabla al hacer clic en el botón correspondiente
    const addButton = document.getElementById("añadirFormulario");
    addButton.addEventListener("click", function () {
        const formulario = document.getElementById("formulario");
        const tableToClone = formulario.querySelector(".majada-b-rojo");
        const newTable = tableToClone.cloneNode(true);

        // Encuentra el elemento después del cual quieres añadir el formulario
        const horasTotalesElement = document.getElementById("HorasTotal");

        // Inserta el formulario justo después del elemento 'HorasTotales'
        horasTotalesElement.insertAdjacentElement("afterbegin", newTable);
    });

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
    // Verificar si el localStorage es compatible con el navegador
    if (typeof Storage !== "undefined") {
        // Obtener el token almacenado en el localStorage
        const name = localStorage.getItem("name");

        // Verificar si el token existe
        if (name) {
            return name; // Devolver el valor del token
        } else {
            return mensaje; // Devolver null si no se encuentra el token
        }
    }
}
const nombre = obtenerNombre();

// Verificar si se obtuvo el nombre del localStorage
if (nombre) {
    const saludo = document.getElementById("saludo");
    saludo.textContent = "Bienvenido " + nombre.toUpperCase(); // Mostrar el mensaje de bienvenida con el nombre del usuario
} else {
    console.log("Nombre no encontrado");
}

//
function obtenerToken() {
    // Verificar si el localStorage es compatible con el navegador
    if (typeof Storage !== "undefined") {
        // Obtener el token almacenado en el localStorage
        const token = localStorage.getItem("token");

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

// Verificar si el token existe

// URL de la API que proporciona la información de los módulos
const apiUrl = "http://apicafe.test/api/V1/modulos";
// Realizar la solicitud a la API
fetch(apiUrl, {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
})
    .then((response) => response.json())
    .then((result) => {
        const data = result.data;
        // Acceder al arreglo 'data' en el resultado

        if (Array.isArray(data) && data.length > 0) {
            data.forEach((modulo) => {
                const option = document.createElement("option");
                option.value = modulo.id;
                option.textContent = modulo.codigo;
                selectModulo.appendChild(option);
            });
        } else {
            console.error(
                "El arreglo 'data' está vacío o no contiene elementos"
            );
        }

    })
    .catch((error) => {
        console.error("Error al obtener datos de la API:", error);
    });



// Función para manejar el logout
function logout() {
    fetch("http://apicafe.test/api/logout", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            // Otros encabezados si son necesarios
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al cerrar sesión");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            // Eliminar el token y otros datos almacenados en localStorage al cerrar sesión
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            // Redirigir a la página de inicio de sesión u otra página deseada
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error("Error:", error.message);
            // Manejar errores, mostrar mensajes, etc.
        });
}

// Agregar un event listener al botón de logout
document.getElementById("logout").addEventListener("click", function () {
    // Llamar a la función de logout al hacer clic en el botón
    logout();
});





// Obtener referencia al select y al contenedor de horas

const horasContainer = document.getElementById("horas");

// Función para obtener y mostrar las horas correspondientes al módulo seleccionado
function mostrarHoras() {
    const apiUrlHoras = `http://apicafe.test/api/V1/modulos/1`;

    fetch(apiUrlHoras, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((result) => {
            const horas = result.data;
            console.log(horas)

            // Limpiar contenido anterior en el contenedor
            horasContainer.innerHTML = "";

            if (Array.isArray(horas) && horas.length > 0) {
                horas.forEach((hora) => {
                    // Crear elementos para mostrar las horas correspondientes
                    const horaElement = document.createElement("p");
                    horaElement.textContent = modulo.hora;

                    // Agregar la hora al contenedor
                    horasContainer.appendChild(horaElement);
                });
            } else {
                console.error(
                    "El arreglo 'horas' está vacío o no contiene elementos"
                );
            }
        })
        .catch((error) => {
            console.error("Error al obtener datos de la API:", error);
        });
}

// Event listener para detectar cambios en la selección del módulo
selectModulo.addEventListener("change", function (event) {
    const moduloIdSeleccionado = event.target.value;

    // Llamar a la función para mostrar las horas del módulo seleccionado
    mostrarHoras(moduloIdSeleccionado);
});
