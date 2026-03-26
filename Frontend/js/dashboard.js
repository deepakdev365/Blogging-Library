document.addEventListener("DOMContentLoaded", function () {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "signup.html";
        return;
    }

    loadSection("posts");
});

function loadSection(section) {

    const content = document.getElementById("content");

    if (section === "posts") {
        loadPosts();
    }

    if (section === "create") {
        content.innerHTML = `
            <h2>Create Blog</h2>
            <button class="btn-primary" onclick="goToWrite()">Write Blog</button>
        `;
    }

    if (section === "stats") {
        content.innerHTML = `
            <h2>Stats</h2>
            <p>Coming soon...</p>
            <button class="btn-secondary">View Analytics</button>
        `;
    }

    if (section === "comments") {
        content.innerHTML = `
            <h2>Comments</h2>
            <p>No comments yet</p>
            <button class="btn-secondary">View Comments</button>
        `;
    }
}

function loadPosts() {

    const user = JSON.parse(localStorage.getItem("user"));

    fetch("http://localhost:8081/blogs/all")
        .then(res => res.json())
        .then(data => {

            const userPosts = data.filter(blog => blog.user?.id === user.id);

 
 
 
            const content = document.getElementById("content");

            if (userPosts.length === 0) {
                content.innerHTML = `
                    <h2>No posts yet</h2>
                    <button class="btn-primary" onclick="goToWrite()">Create Blog</button>
                `;
                return;
            }

            content.innerHTML = userPosts.map(blog => {

                // 🔥 Get image from localStorage using key
                const imgSrc = localStorage.getItem(blog.image);

                return `
                    <div class="post-card">
                        <img src="${imgSrc || '../assets/default.jpg'}">
                        <h3>${blog.title}</h3>
                        <button class="btn-secondary">View</button>
                    </div>
                `;
            }).join("");

        })
        .catch(() => {
            document.getElementById("content").innerHTML = `
                <h2>Server not running</h2>
                <button class="btn-secondary" onclick="loadPosts()">Retry</button>
            `;
        });
}

function goToWrite() {
    window.location.href = "write-blog.html";
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "../index.html";
}