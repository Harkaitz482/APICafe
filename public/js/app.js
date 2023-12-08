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
    const addButton = document.querySelector("#botones button:last-of-type");

    addButton.addEventListener("click", function () {
        const formulario = document.getElementById("formulario");
        const tableToClone = formulario.querySelector(".majada-b-amarillo");
        const newTable = tableToClone.cloneNode(true);

        // Encuentra el elemento después del cual quieres añadir el formulario
        const horasTotalesElement = document.getElementById("HorasTotal");

        // Inserta el formulario justo después del elemento 'HorasTotales'
        horasTotalesElement.insertAdjacentElement("afterbegin", newTable);
    });
});

const selectModulo = document.querySelector(
    '#formulario select[aria-label="Default select example"]'
);
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
console.log(token);
