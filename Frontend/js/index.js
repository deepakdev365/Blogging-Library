const CATEGORY_LIST = [
    "technology",
    "travel",
    "education",
    "news",
    "mountains",
    "cosmos",
    "mechanical",
    "daily life"
];

document.addEventListener("DOMContentLoaded", function () {

    setupMainButton();
    loadCategories();
    loadLatestBlogs();

});


// ✅ CTA button logic (top button if you use it)
function setupMainButton() {

    const user = JSON.parse(localStorage.getItem("user"));
    const btn = document.getElementById("mainActionBtn");

    if (!btn) return;

    if (user) {
        btn.textContent = "Go to Dashboard";
        btn.onclick = function () {
            window.location.href = "html/dashboard.html";
        };
    } else {
        btn.textContent = "Get Started";
        btn.onclick = function () {
            window.location.href = "html/blogs.html";
        };
    }
}


// ✅ Create Blog button (CTA section)
function handleCreateBlog() {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "html/signup.html";
    } else {
        window.location.href = "html/write-blog.html";
    }
}


// ✅ Load categories dynamically
function loadCategories() {

    const slider = document.getElementById("categorySlider");
    if (!slider) return;

    // 🔥 Show only 3 on homepage
    const limited = CATEGORY_LIST.slice(0, 5);

    slider.innerHTML = limited.map(cat => {

        const imgName = cat.toLowerCase().replace(" ", "-");

        return `
            <div class="category-card" onclick="openCategory('${cat}')">
                <div class="category-image">
                    <img src="assets/${imgName}.jpg"
                         onerror="this.src='assets/default.jpg'">
                </div>
                <h3>${cat}</h3>
            </div>
        `;
    }).join("");
}
// ✅ Open specific category
function openCategory(cat) {
    window.location.href = `html/category-blogs.html?category=${encodeURIComponent(cat)}`;
}


// ✅ View All button
function goToCategories() {
    window.location.href = "html/categories.html";
}
function loadLatestBlogs() {

    fetch("http://localhost:8081/blogs/all")
        .then(res => res.json())
        .then(data => {

            const container = document.getElementById("latestBlogs");
            if (!container) return;

            const latest = data
                .sort((a, b) => b.id - a.id)
                .slice(0, 5);

            const colors = ["yellow", "purple", "blue"];

            container.innerHTML = latest.map((blog, index) => {

                const colorClass = colors[index % colors.length];
                const imgSrc = localStorage.getItem(blog.image);

                return `
                    <div class="blog-card ${colorClass}">

                        <div class="blog-image">
                            <img src="${imgSrc || '../assets/default.jpg'}">
                        </div>

                        <h3>${blog.title}</h3>
                        <p>${blog.category}</p>

                        <button class="btn-secondary" onclick="openBlog(${blog.id})">
                            Read More
                        </button>

                    </div>
                `;
            }).join("");

        });
}
function goToBlogs() {
    window.location.href = "html/blogs.html";
}

function openBlog(id) {
    window.location.href = `html/blog.html?id=${id}`;
}