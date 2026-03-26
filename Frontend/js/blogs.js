document.addEventListener("DOMContentLoaded", function () {

    const blogList = document.getElementById("blog-list");
    if (!blogList) return;

    const params = new URLSearchParams(window.location.search);
    const selectedCategory = params.get("category");

    // 🔥 Decide API URL
    let url = "http://localhost:8081/blogs/all";

    if (selectedCategory) {
        url = `http://localhost:8081/blogs/category/${selectedCategory}`;
    }

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("Server error");
            return res.json();
        })
        .then(data => {

            if (!data || data.length === 0) {
                blogList.innerHTML = "<h2>No blogs in this category</h2>";
                return;
            }

            blogList.innerHTML = "";

            const colors = ["yellow", "purple", "blue"];

            data.forEach((blog, index) => {

                const card = document.createElement("div");

                const colorClass = colors[index % colors.length];
                card.classList.add("blog-card", colorClass);

                card.onclick = function () {
                    openBlog(blog.id);
                };

                const imgSrc = localStorage.getItem(blog.image);

                card.innerHTML = `
                    <div class="blog-image">
                        <img src="${imgSrc || '../assets/default.jpg'}">
                    </div>

                    <h3>${blog.title}</h3>
                    <p>${blog.category}</p>

                    <button class="btn-primary" onclick="event.stopPropagation(); openBlog(${blog.id})">
                        Read More
                    </button>
                `;

                blogList.appendChild(card);
            });

        })
        .catch(err => {
            console.error(err);
            blogList.innerHTML = "<h2>Failed to load blogs</h2>";
        });

});

function openBlog(id) {
    window.location.href = `blog.html?id=${id}`;
}