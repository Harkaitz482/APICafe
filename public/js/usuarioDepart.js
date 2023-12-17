// Obtener una referencia al botón de "logout"
const logoutButton = document.getElementById("logout");

// Agregar un evento de clic al botón
logoutButton.addEventListener("click", function () {
    // Eliminar datos de sesión (por ejemplo, eliminar un token almacenado en sessionStoragre)
    sessionStorage.removeItem("token"); // Cambia 'token' por el nombre de tu clave de sesión

    // Redireccionar a la página de inicio de sesión
    window.location.href = "/index"; // Cambia '/login' por la URL de tu página de inicio de sesión
});

// Función para obtener el parámetro de la URL
function obtenerParametroURL(nombreParametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombreParametro);
}

// Lógica para obtener y mostrar usuarios asociados a ese departamento
async function obtenerYMostrarUsuarios() {
    try {
        const departamentoId = obtenerParametroURL("departamentoId");
        console.log(departamentoId);

        const token = sessionStorage.getItem("token");
        const usuariosUrl = `https://prueba-i03j.onrender.com/api/users/${departamentoId}`;

        const response = await fetch(usuariosUrl, {
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
        console.log(data); // Verifica la estructura de los datos

        mostrarUsuariosEnHTML(data); // Mostrar los usuarios en la página HTML

        if (data.length > 0) {
            obtenerModulosDeUsuario(data[0].id); // Obtener módulos para el primer usuario
        }
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
    }
}
async function mostrarUsuariosYModulosEnHTML(usuarios) {
    const usuariosContainer = document.getElementById("usuarios-table-body");

    for (const usuario of usuarios) {
        const usuarioRow = document.createElement("tr");

        const nombreCell = document.createElement("td");
        nombreCell.textContent = usuario.name;
        usuarioRow.appendChild(nombreCell);

        const horasTotalesCell = document.createElement("td");
        horasTotalesCell.textContent = usuario.horasTotales;
        usuarioRow.appendChild(horasTotalesCell);

        const modulosCell = document.createElement("td");
        const cargaHorariaCell = document.createElement("td");

        if (usuario.modulos && usuario.modulos.length > 0) {
            if (usuario.modulos.length === 1) {
                // Si solo hay un módulo, mostrarlo directamente
                modulosCell.textContent = usuario.modulos[0].codigo;
                cargaHorariaCell.textContent = usuario.modulos[0].CargaHoraria;
            } else {
                // Si hay más de un módulo, crear un desplegable
                const selectModulos = document.createElement("select");
                const defaultOption = document.createElement("option");
                defaultOption.text = "Selecciona un módulo";
                defaultOption.disabled = true;
                defaultOption.selected = true;
                selectModulos.add(defaultOption);

                usuario.modulos.forEach((modulo) => {
                    const option = document.createElement("option");
                    option.value = modulo.CargaHoraria;
                    option.text = modulo.codigo;
                    selectModulos.add(option);
                });

                selectModulos.addEventListener("change", (event) => {
                    cargaHorariaCell.textContent = event.target.value;
                });

                modulosCell.appendChild(selectModulos);
                cargaHorariaCell.textContent = usuario.modulos[0].CargaHoraria; // Muestra la carga horaria del primer módulo por defecto
            }
        } else {
            modulosCell.textContent = "No hay módulos";
            cargaHorariaCell.textContent =
                "No hay información de carga horaria";
        }

        usuarioRow.appendChild(modulosCell);
        usuarioRow.appendChild(cargaHorariaCell);

        usuariosContainer.appendChild(usuarioRow);

        if (usuario.horasTotales < 18) {
            horasTotalesCell.classList.add("rojo");
        }

        usuarioRow.appendChild(horasTotalesCell);
    }
}

async function obtenerYMostrarUsuariosConModulos() {
    try {
        const departamentoId = obtenerParametroURL("departamentoId");
        console.log(departamentoId);

        const token = sessionStorage.getItem("token");
        const usuariosUrl = `https://prueba-i03j.onrender.com/api/V1/users/${departamentoId}`;

        const response = await fetch(usuariosUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("La solicitud no fue exitosa");
        }

        const usuarios = await response.json();
        console.log(usuarios); // Verifica la estructura de los datos

        await Promise.all(
            usuarios.map(async (usuario) => {
                const modulosUrl = `https://prueba-i03j.onrender.com/api/V1/modulos/users/${usuario.id}`;
                const modulosResponse = await fetch(modulosUrl, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!modulosResponse.ok) {
                    throw new Error(
                        `La solicitud no fue exitosa para el usuario ${usuario.id}`
                    );
                }

                const modulosData = await modulosResponse.json();
                usuario.modulos = modulosData.modulos || [];
            })
        );

        mostrarUsuariosYModulosEnHTML(usuarios); // Mostrar usuarios y módulos en la página HTML
    } catch (error) {
        console.error("Error al obtener usuarios o módulos:", error);
    }
}

// Llamar a la función principal para obtener y mostrar usuarios con sus módulos al cargar la página


    async function mostrarNombreDepartamento() {
        try {
            const departamentoId = obtenerParametroURL("departamentoId");
            const token = sessionStorage.getItem("token");
            const departamentoUrl = `https://prueba-i03j.onrender.com/api/V1/departamento/${departamentoId}`;
        
            const response = await fetch(departamentoUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
        
            if (!response.ok) {
                throw new Error("La solicitud no fue exitosa");
            }
        
            const departamentoData = await response.json();
            console.log("Datos del departamento:", departamentoData);
        
            const saludoElement = document.getElementById("saludo");
            if (saludoElement) {
                saludoElement.textContent = `Departamento de ${departamentoData.departamento.nombre}`;
            }
        } catch (error) {
            console.error("Error al obtener el nombre del departamento:", error);
        }
    }


    const gestionarButton = document.getElementById("gestionar");
    console.log()
    // Agregar un evento de clic al botón
    gestionarButton.addEventListener("click", function () {
        // Redireccionar a la página de inicio de sesión
        window.location.href = "/JefeEstudios"; // Cambia '/login' por la URL de tu página de inicio de sesión
    });



document.addEventListener("DOMContentLoaded", async () => {
    const departamentoId = obtenerParametroURL("departamentoId");
    console.log(departamentoId);

    // Mostrar el nombre del departamento
    await mostrarNombreDepartamento(departamentoId);

    // Obtener y mostrar usuarios con sus módulos
    obtenerYMostrarUsuariosConModulos();
});