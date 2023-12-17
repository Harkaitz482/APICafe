async function obtenerDepartamentos() {
    const token = sessionStorage.getItem("token");
    const departentosUrl = `https://prueba-i03j.onrender.com/api/V1/departamentos`;

    try {
        const response = await fetch(departentosUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("La solicitud no fue exitosa");
        }

        const data = await response.json();

        // Acceder a la lista de módulos dentro de 'data'
        const departamentos = data;
        console.log(departamentos);
        const departamentoContainer = document.getElementById(
            "departamentos-container"
        );
        const row = document.createElement("div");
        row.classList.add("row", "row-cols-1", "row-cols-md-5", "g-4"); // Define el número de columnas

        departamentos.forEach((departamento) => {
            const col = document.createElement("div");
            col.classList.add("col");

            const card = document.createElement("div");
            card.classList.add(
                "card",
                "h-100",
                "w-100",
                "border",
                "border-dark",
                "border-2"
            ); // Borde negro de 2px
            // Añade clases de borde a tu elección, como 'border', 'border-dark', 'border-2'

            const cardBody = document.createElement("div");
            cardBody.classList.add(
                "card-body",
                "d-flex",
                "flex-column",
                "align-items-center"
            );

            const cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title", "text-center", "mb-4"); // Ajusta el margen del título

            const verMasButton = document.createElement("button");
            verMasButton.classList.add("btn", "btn-primary", "mt-auto");
            verMasButton.textContent = "Ver más";

            verMasButton.addEventListener("click", () => {
                window.location.href = `/usuariosDepart.html?departamentoId=${departamento.id}`;
            });

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(verMasButton);
            card.appendChild(cardBody);
            col.appendChild(card);
            row.appendChild(col);

            // Configura el contenido del título
            cardTitle.textContent = departamento.nombre;
        });

        departamentoContainer.appendChild(row);
    } catch (error) {
        console.error("Error al obtener departamentos:", error);
    }
}


const logoutButton = document.getElementById("logout");

// Agregar un evento de clic al botón
logoutButton.addEventListener("click", function () {
    // Eliminar datos de sesión (por ejemplo, eliminar un token almacenado en sessionStoragre)
    sessionStorage.removeItem("token"); // Cambia 'token' por el nombre de tu clave de sesión

    // Redireccionar a la página de inicio de sesión
    window.location.href = "/index"; // Cambia '/login' por la URL de tu página de inicio de sesión
});



const aulasButton = document.getElementById("aulas");
console.log();
// Agregar un evento de clic al botón
aulasButton.addEventListener("click", function () {
    // Redireccionar a la página de inicio de sesión
    window.location.href = "/aulas"; // Cambia '/login' por la URL de tu página de inicio de sesión
});

document.addEventListener("DOMContentLoaded", obtenerDepartamentos);
