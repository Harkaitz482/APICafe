async function obtenerUsuariosYModulos() {
    const idDepartamento = sessionStorage.getItem("departamento");
    const token = sessionStorage.getItem("token");

    if (!idDepartamento) {
        console.error("No se encontró el ID del departamento en el sessionStorage");
        return;
    }

    const todosLosUsuariosUrl = `https://prueba-i03j.onrender.com/api/users`;

    try {
        const response = await fetch(todosLosUsuariosUrl, {
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
        const usuarios = data.users;
        const idDepartamentoNumber = Number(idDepartamento);

        const tbody = document.getElementById("usuarios-table-body");

        for (const usuario of usuarios) {
            if (usuario.departamento_id !== idDepartamentoNumber) {
                continue;
            }

            const row = document.createElement("tr");
            const nombreCell = document.createElement("td");
            nombreCell.textContent = usuario.name;
            row.appendChild(nombreCell);

            const userId = usuario.id;
            const userModulesUrl = `https://prueba-i03j.onrender.com/api/V1/modulos/users/${userId}`;

            const modulesResponse = await fetch(userModulesUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!modulesResponse.ok) {
                throw new Error(
                    `La solicitud no fue exitosa para el usuario ${userId}`
                );
            }

            const userModules = await modulesResponse.json();
            const modulos = userModules.modulos.map((modulo) => ({
                codigo: modulo.codigo,
                cargaHoraria: modulo.CargaHoraria,
            }));

            const modulosCell = document.createElement("td");
            const selectModulos = document.createElement("select");

            for (const modulo of modulos) {
                const option = document.createElement("option");
                option.value = modulo.codigo;
                option.textContent = modulo.codigo;
                selectModulos.appendChild(option);
            }

            const inputCargaHoraria = document.createElement("input");
            inputCargaHoraria.type = "text";
            inputCargaHoraria.readOnly = true;

            if (modulos.length > 0) {
                inputCargaHoraria.value = modulos[0].cargaHoraria;
            }

            selectModulos.addEventListener("change", (event) => {
                const selectedModule = modulos.find(
                    (modulo) => modulo.codigo === event.target.value
                );

                if (selectedModule) {
                    inputCargaHoraria.value = selectedModule.cargaHoraria;
                }
            });

            modulosCell.appendChild(selectModulos);
            row.appendChild(modulosCell);

            const cargaHorariaCell = document.createElement("td");
            cargaHorariaCell.appendChild(inputCargaHoraria);
            row.appendChild(cargaHorariaCell);

            const horasTotalesCell = document.createElement("td");
            horasTotalesCell.textContent = await obtenerHorasTotalesPorUsuario(userId, token);
            row.appendChild(horasTotalesCell);

            tbody.appendChild(row);
        }
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
    }
}

async function obtenerHorasTotalesPorUsuario(userId, token) {
    const userModulesUrl = `https://prueba-i03j.onrender.com/api/V1/modulos/users/${userId}`;
    console.log(userModulesUrl)
    const modulesResponse = await fetch(userModulesUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!modulesResponse.ok) {
        throw new Error(
            `La solicitud no fue exitosa para el usuario ${userId}`
        );
    }

    const userModules = await modulesResponse.json();
    const modulos = userModules.modulos.map((modulo) => modulo.CargaHoraria);
    const horasTotales = modulos.reduce((total, cargaHoraria) => total + cargaHoraria, 0);
    return horasTotales;
}

document.addEventListener("DOMContentLoaded", obtenerUsuariosYModulos);

// Resto del código para el botón de logout, obtención de token y departamento, y otras funciones


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
            informacionDiv.textContent = `${nombreDepartamento}`;
        } else {
            console.error(
                "No se encontró el nombre del departamento en los datos recibidos"
            );
        }
    });
