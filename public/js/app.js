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

let token


document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value; // Corregido

        console.log(email);
        console.log(password);

        const formData = {
            email: email,
            password: password,
        };

        fetch("http://apicafe.test/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Credenciales inválidas");
                }
                return response.json();
            })
            .then((data) => {
                token = data.data.token;
                localStorage.setItem("token", token);

                // Redireccionar si el inicio de sesión es exitoso
                window.location.href = "form.html";
            })
            .catch((error) => {
                console.error("Error:", error.message);
                // Manejar errores, mostrar mensajes, etc.
            });
    });





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
        const data = result.data; // Acceder al arreglo 'data' en el resultado
        console.log(data)
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
