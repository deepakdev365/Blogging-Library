document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("signupForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        fetch("http://localhost:8081/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Email already exists");
            }
            return res.json();
        })
        .then(user => {

            //  Store user (auto login)
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect to home page
            window.location.href = "../html/dashboard.html";
        })
        .catch(err => {
            alert(err.message);
        });

    });

});