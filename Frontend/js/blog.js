document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const blogId = params.get("id");

    if (!blogId) {
        alert("Blog not found");
        return;
    }

    fetch(`http://localhost:8081/blogs/${blogId}`)
        .then(res => res.json())
        .then(blog => {

            // Title
            document.getElementById("blogTitle").textContent = blog.title;

            // Meta
            document.getElementById("blogMeta").textContent =
                `${blog.category} • ${formatDate(blog.datePublished)}`;

            // Thumbnail
            const img = document.getElementById("blogImage");
            const imgsrc = localStorage.getItem(blog.image);
            img.src =imgsrc || "../assets/default.jpg";

            // Content (VERY IMPORTANT)
            document.getElementById("blogContent").innerHTML = blog.content;

        })
        .catch(() => {
            document.body.innerHTML = "<h2>Failed to load blog</h2>";
        });

});


// Format date
function formatDate(date) {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
}
