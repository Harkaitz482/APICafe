// Función para obtener usuarios y sus módulos
async function obtenerUsuariosYModulos() {
    const idDepartamento = sessionStorage.getItem("departamento");
    const token = sessionStorage.getItem("token");

    if (!idDepartamento) {
        console.error("No se encontró el ID del departamento en el sessionStorage");
        return;
    }

    const todosLosUsuariosUrl = `http://apicafe.test/api/users`;

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

        const usuariosPorDepartamento = usuarios.filter(
            (usuario) =>
                usuario.departamento_id === idDepartamentoNumber
        );

        const tbody = document.getElementById('usuarios-table-body');

        for (const usuario of usuariosPorDepartamento) {
            const row = document.createElement('tr');
            const nombreCell = document.createElement('td');
            nombreCell.textContent = usuario.name;
            row.appendChild(nombreCell);

            const userId = usuario.id;
            const userModulesUrl = `http://apicafe.test/api/V1/modulos/users/${userId}`;

            const modulesResponse = await fetch(userModulesUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!modulesResponse.ok) {
                throw new Error(`La solicitud no fue exitosa para el usuario ${userId}`);
            }

            const userModules = await modulesResponse.json();
            const modulos = userModules.modulos.map(modulo => ({ codigo: modulo.codigo, cargaHoraria: modulo.CargaHoraria }));

            const modulosCell = document.createElement('td');
            modulosCell.textContent = modulos.map(modulo => modulo.codigo).join(', ');
            row.appendChild(modulosCell);

            const cargaHorariaCell = document.createElement('td');
            cargaHorariaCell.textContent = modulos.map(modulo => modulo.cargaHoraria).join(', ');
            row.appendChild(cargaHorariaCell);

            tbody.appendChild(row);
        }
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
    }
}

document.addEventListener('DOMContentLoaded', obtenerUsuariosYModulos);
