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
                let token = data.data.token;
                localStorage.setItem("token", token);

                // Redireccionar si el inicio de sesión es exitoso
                window.location.href = "form.html";
            })
            .catch((error) => {
                console.error("Error:", error.message);
                // Manejar errores, mostrar mensajes, etc.
            });
    });
