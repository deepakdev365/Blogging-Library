document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        fetch(`http://localhost:8081/auth/login?email=${email}&password=${password}`, {
            method: "POST"
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Invalid email or password");
            }
            return res.json();
        })
        .then(user => {

            // store user
            localStorage.setItem("user", JSON.stringify(user));

            // redirect to dashboard
            window.location.href = "dashboard.html";
        })
        .catch(err => {
            alert(err.message);
        });

    });

});