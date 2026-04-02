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
    
    // Update active class in sidebar
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    const activeLi = document.querySelector(`.sidebar li[onclick*="${section}"]`);
    if (activeLi) activeLi.classList.add('active');

    if (section === "posts") {
        loadPosts();
    }

    if (section === "create") {
        content.innerHTML = `
            <div class="empty-state">
                <h2>Ready to share your thoughts? ✍️</h2>
                <p style="margin-bottom: 25px; color: #666;">Create a new blog post and reach readers worldwide.</p>
                <button class="btn-primary" onclick="goToWrite()">Write New Blog</button>
            </div>
        `;
    }

    if (section === "stats") {
        content.innerHTML = `
            <div class="empty-state">
                <h2>Analytics Dashboard 📊</h2>
                <p style="margin-bottom: 25px; color: #666;">Track your blog performance, views, and engagement (Coming Soon).</p>
                <button class="btn-secondary">View Sample Analytics</button>
            </div>
        `;
    }

    if (section === "comments") {
        content.innerHTML = `
            <div class="empty-state">
                <h2>Reader Comments 💬</h2>
                <p style="margin-bottom: 25px; color: #666;">Engage with your audience and moderate discussions.</p>
                <button class="btn-secondary">Check Notifications</button>
            </div>
        `;
    }
}

function loadPosts() {

    const user = JSON.parse(localStorage.getItem("user"));
    const content = document.getElementById("content");

    content.innerHTML = '<h2>Your Posts</h2><div class="posts-grid" id="postsGrid">Loading...</div>';

    fetch("http://localhost:8081/blogs/all")
        .then(res => res.json())
        .then(data => {

            const userPosts = data.filter(blog => blog.user?.id === user.id);
            const postsGrid = document.getElementById("postsGrid");

            if (userPosts.length === 0) {
                content.innerHTML = `
                    <div class="empty-state">
                        <h2>No posts yet 🕸️</h2>
                        <p style="margin-bottom: 25px; color: #666;">You haven't published any blogs yet. Start your journey today!</p>
                        <button class="btn-primary" onclick="goToWrite()">Create Your First Blog</button>
                    </div>
                `;
                return;
            }

            postsGrid.innerHTML = userPosts.map(blog => {

                const imgSrc = localStorage.getItem(blog.image);

                return `
                    <div class="blog-card" onclick="openBlog(${blog.id})">
                        <div class="blog-image">
                            <img src="${imgSrc || '../assets/default.jpg'}" alt="${blog.title}">
                        </div>
                        <div class="blog-details">
                            <h3>${blog.title}</h3>
                            <button class="btn-secondary" style="width: 100%;">Edit / View</button>
                        </div>
                    </div>
                `;
            }).join("");

        })
        .catch(() => {
            document.getElementById("content").innerHTML = `
                <div class="empty-state">
                    <h2>Connection Error ⚠️</h2>
                    <p style="margin-bottom: 25px; color: #666;">We couldn't reach the server. Please check your connection.</p>
                    <button class="btn-primary" onclick="loadPosts()">Retry Connection</button>
                </div>
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

function openBlog(id) {
    window.location.href = `../html/blog.html?id=${id}`;
}