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

    const container = document.getElementById("allCategories");
    if (!container) return;

    container.innerHTML = CATEGORY_LIST.map(cat => {

        // 🔥 only for image naming (safe)
        const imgName = cat.toLowerCase().replace(/\s+/g, "-");

        return `
            <div class="category-card" onclick="openCategory('${cat}')">

                <div class="category-image">
                    <img src="../assets/${imgName}.jpg"
                         alt="${cat}"
                         onerror="this.src='../assets/default.jpg'">
                </div>

                <h3>${capitalize(cat)}</h3>

            </div>
        `;
    }).join("");

});


// 🔗 Navigate to blogs page (SEND ORIGINAL CATEGORY)
function openCategory(cat) {
    const encoded = encodeURIComponent(cat); // 🔥 handles spaces
    window.location.href = `category-blogs.html?category=${encoded}`;
}


// 🔤 Capitalize (multi-word support)
function capitalize(text) {
    return text
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}