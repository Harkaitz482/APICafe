document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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
            console.log(data);
            let token = data.data.token;
            sessionStorage.setItem("token", token);
            let name = data.data.user.name;
            sessionStorage.setItem("name", name);
            let tipoUser = data.data.user.tipoUsuario;
            sessionStorage.setItem("TipoUsuario", tipoUser);
            let especialidad = data.data.user.especialidad_id;
            sessionStorage.setItem("Especialidad", especialidad);
            let departamento = data.data.user.departamento_id;
            sessionStorage.setItem("departamento", departamento);
            let userId = data.data.user.id;
            console.log(userId) 
            sessionStorage.setItem("UserID", userId);
            // Redireccionar si el inicio de sesión es exitoso
            window.location.href = "form.html";
        })
        .catch((error) => {
            console.error("Error:", error.message);
            showModal(); // Mostrar el modal de error
        });
});

function showModal() {
    const modal = document.getElementById("myModal");
    const closeModal = document.querySelector(".close");

    modal.style.display = "block"; // Mostrar el modal

    closeModal.onclick = function () {
        modal.style.display = "none"; // Ocultar el modal al hacer clic en la X
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none"; // Ocultar el modal al hacer clic fuera de él
        }
    };
}
