document.addEventListener("DOMContentLoaded", function () {

    // wait for navbar to load
    setTimeout(() => {

        const user = JSON.parse(localStorage.getItem("user"));
        const btn = document.getElementById("navBtn");

        if (!btn) return;

        if (user) {
            // Logged in
            btn.textContent = "Logout";

            btn.onclick = function () {
                localStorage.removeItem("user");
                window.location.href = "../index.html";
            };

        } else {
            // Visitor
            btn.textContent = "Get Started";

            btn.onclick = function () {
                window.location.href = "../html/blogs.html";
            };
        }

    }, 100); // wait for navbar load

});