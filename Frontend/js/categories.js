/* 🔹 Fallback Categories (ALWAYS AVAILABLE) */
const fallbackCategories = [
    {
        name: "Technology",
        image: "../assets/technology.jpg"
    },
    {
        name: "Lifestyle",
        image: "../assets/lifestyle.jpg"
    },
    {
        name: "Education",
        image: "../assets/education.jpg"
    },
    {
        name: "Travel",
        image: "../assets/travel.jpg"
    }
];

/* 🔹 Render Function */
function renderCategories(categories) {
    const container = document.getElementById("categoriesContainer");
    container.innerHTML = "";

    categories.forEach(cat => {
        const card = document.createElement("div");
        card.classList.add("category-card");

        card.innerHTML = `
            <img src="${cat.image}" alt="${cat.name}">
            <h3>${cat.name}</h3>
        `;

        container.appendChild(card);
    });
}

/* 🔹 Try Backend First */
fetch("http://localhost:8081/api/categories")
    .then(res => {
        if (!res.ok) throw new Error("Backend error");
        return res.json();
    })
    .then(data => {
        console.log("Loaded from backend");
        renderCategories(data);
    })
    .catch(error => {
        console.log("Using fallback categories");
        renderCategories(fallbackCategories);
    });