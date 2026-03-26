document.addEventListener("DOMContentLoaded", function () {

    const blogList = document.getElementById("blog-list");
    const title = document.getElementById("categoryTitle");

    const params = new URLSearchParams(window.location.search);
    const category = decodeURIComponent(params.get("category"));

    if (!category) {
        blogList.innerHTML = "<h2>No category selected</h2>";
        return;
    }

    // 🔥 Show category name
    title.textContent = `Category: ${capitalize(category)}`;

    fetch(`http://localhost:8081/blogs/category/${category}`)
        .then(res => res.json())
        .then(data => {

            if (!data || data.length === 0) {
                blogList.innerHTML = `
                    <div class="no-data">
                        <h2>No blogs found</h2>
                        <p>No blogs in this category yet</p>
                    </div>
                `;
                return;
            }

            const colors = ["yellow", "purple", "blue"];

            blogList.innerHTML = data.map((blog, index) => {

                const colorClass = colors[index % colors.length];
                const imgSrc = localStorage.getItem(blog.image);

                return `
                    <div class="blog-card ${colorClass}" onclick="openBlog(${blog.id})">

                        <div class="blog-image">
                            <img src="${imgSrc || '../assets/default.jpg'}">
                        </div>

                        <h3>${blog.title}</h3>
                        <p>${blog.category}</p>

                    </div>
                `;
            }).join("");

        })
        .catch(() => {
            blogList.innerHTML = "<h2>Server error</h2>";
        });

});

function openBlog(id) {
    window.location.href = `blog.html?id=${id}`;
}

function capitalize(text) {
    return text
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}