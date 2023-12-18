async function obtenerAulas() {
    const token = sessionStorage.getItem("token");
    const aulasUrl = "https://prueba-i03j.onrender.com/api/V1/aulas";

    try {
        const response = await fetch(aulasUrl, {
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
        const aulas = data;

        const aulasContainer = document.getElementById("aulas-container");
        const row = document.createElement("div");
        row.classList.add(
            "row",
            "row-cols-1",
            "row-cols-md-1",
            "row-cols-lg-3"
        ); // Divide en columnas para distintos tamaños de pantalla

        aulas.forEach((aula, index) => {
            const col = document.createElement("div");
            col.classList.add("col", "mb-4"); // Elimina la clase "col-md-4" para dejar que Bootstrap maneje las columnas

            const card = document.createElement("div");
            card.classList.add(
                "card",
                "border",
                "border-dark",
                "border-2",
                "h-100"
            ); // Estilo de card, incluyendo la altura

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body", "text-center");

            const cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            cardTitle.textContent = aula.numero;

            cardBody.appendChild(cardTitle);
            card.appendChild(cardBody);

            const verButton = document.createElement("button");
            verButton.textContent = "Ver más";
            verButton.classList.add("btn", "btn-primary", "mt-3");
            verButton.textContent = "Ver";
            verButton.classList.add("btn", "btn-primary", "mt-1", "btn-sm");

            verButton.addEventListener("click", async () => {
                try {
                    const modulosUrl = `https://prueba-i03j.onrender.com/api/V1/modulos/aula/${aula.id}`;
                    const modulosResponse = await fetch(modulosUrl, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (!modulosResponse.ok) {
                        throw new Error(
                            "La solicitud no fue exitosa para los módulos del aula"
                        );
                    }

                    const modulosData = await modulosResponse.json();
                    console.log("Módulos del aula:", modulosData);

                    const cursos = modulosData; // Si modulosData contiene los cursos directamente

                    const modalCursos = construirModalCursos(cursos);
                    document.body.appendChild(modalCursos);
                    const modalElement = document.getElementById("modalCursos");
                } catch (error) {
                    console.error("Error al obtener módulos del aula:", error);
                }
            });

            card.appendChild(verButton);
            aulasContainer.appendChild(card);
            col.appendChild(card);
            row.appendChild(col);
        });

        aulasContainer.appendChild(row);
    } catch (error) {
        console.error("Error al obtener aulas:", error);
    }
}

document.addEventListener("DOMContentLoaded", obtenerAulas);

// ... el resto del código permanece igual

async function obtenerCursosPorAula(aulaId) {
    const token = sessionStorage.getItem("token");
    const cursosUrl = `https://prueba-i03j.onrender.com/api/V1/modulos/users/${userId}`;
    console.log(cursosUrl);

    try {
        const response = await fetch(cursosUrl, {
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
        return data;
    } catch (error) {
        console.error("Error al obtener cursos por aula:", error);
        return [];
    }
}

async function obtenerUsuarioPorId() {
    const token = sessionStorage.getItem("token");
    const usuarioUrl = `http://apicafe.test/api/user`;

    try {
        const response = await fetch(usuarioUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("La solicitud no fue exitosa para el usuario");
        }

        const data = await response.json();
        console.log(data);
        return data.name; // Suponiendo que 'nombre' es el campo que contiene el nombre del usuario
    } catch (error) {
        console.error("Error al obtener usuario por ID:", error);
        return null;
    }
}

function construirModalCursos(curso) {
    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.id = "modalCursos";

    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");

    const modalTitle = document.createElement("h5");
    modalTitle.classList.add("modal-title");
    modalTitle.textContent = "Curso Asociado al Aula";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.classList.add("btn-close");
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");

    async function mostrarNombreUsuario(userId) {
        const nombreUsuario = await obtenerUsuarioPorId(userId);
        if (nombreUsuario) {
            const listItemUsuario = document.createElement("li");
            listItemUsuario.classList.add("list-group-item");
            listItemUsuario.textContent = `Nombre Usuario: ${nombreUsuario}`;
            listaCursos.appendChild(listItemUsuario);
        } else {
            console.error("No se pudo obtener el nombre del usuario");
        }
    }

    if (curso) {
        const camposAMostrar = [
            "codigo",
            "nombre",
            "horas_semanales",
            "CargaHoraria",

        ];
        const listaCursos = document.createElement("ul");
        listaCursos.classList.add("list-group");

        camposAMostrar.forEach(async (campo) => {
            const valorCampo = curso[campo];
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item");
            if (campo === "user_id") {
                listItem.textContent = `${campo}: `;
                listaCursos.appendChild(listItem);
                await mostrarNombreUsuario(valorCampo);
            } else {
                listItem.textContent = `${campo}: ${valorCampo}`;
                listaCursos.appendChild(listItem);
            }
        });

        modalBody.appendChild(listaCursos);
    } else {
        const noCursosMessage = document.createElement("p");
        noCursosMessage.textContent = "No hay curso asociado a este aula.";
        modalBody.appendChild(noCursosMessage);
    }

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    document.body.appendChild(modal);
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    return modal;
}

const departamentoButton = document.getElementById("departamento");
console.log();
// Agregar un evento de clic al botón
departamentoButton.addEventListener("click", function () {
    // Redireccionar a la página de inicio de sesión
    window.location.href = "/jefeDeEstudio"; // Cambia '/login' por la URL de tu página de inicio de sesión
});

const logoutButton = document.getElementById("logout");

// Agregar un evento de clic al botón
logoutButton.addEventListener("click", function () {
    // Eliminar datos de sesión (por ejemplo, eliminar un token almacenado en sessionStoragre)
    sessionStorage.removeItem("token"); // Cambia 'token' por el nombre de tu clave de sesión

    // Redireccionar a la página de inicio de sesión
    window.location.href = "/index"; // Cambia '/login' por la URL de tu página de inicio de sesión
});
