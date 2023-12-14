document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value; // Corregido

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
                console.log(data)
                let token = data.data.token;
                sessionStorage.setItem("token", token);
                let name = data.data.user.name;
                sessionStorage.setItem("name", name);
                // Redireccionar si el inicio de sesión es exitoso
                let tipoUser = data.data.user.tipoUsuario;
                sessionStorage.setItem("TipoUsuario", tipoUser);
                let especialidad = data.data.user.especialidad_id;
                sessionStorage.setItem("Especialidad", especialidad);
                window.location.href = "form.html";
            })
            .catch((error) => {
                console.error("Error:", error.message);
                // Manejar errores, mostrar mensajes, etc.
            });
    });
