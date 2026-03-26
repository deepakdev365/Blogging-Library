let quill;
let imageBase64 = "";
let imageKey = "";

document.addEventListener("DOMContentLoaded", function () {

    // ✅ Initialize Quill
    quill = new Quill('#editor', {
        theme: 'snow'
    });

    // ✅ Thumbnail preview + storage
    const thumbnailInput = document.getElementById("thumbnailInput");
    const preview = document.getElementById("thumbnailPreview");

    thumbnailInput.addEventListener("change", function () {

        const file = this.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {

                imageBase64 = e.target.result;

                // 🔥 create unique key
                imageKey = "img_" + Date.now();

                // 🔥 store image in localStorage
                localStorage.setItem(imageKey, imageBase64);

                // preview
                preview.src = imageBase64;
                preview.style.display = "block";
            };

            reader.readAsDataURL(file);
        }
    });

});


// ✅ Submit function
window.submitBlog = function () {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("Please login first");
        window.location.href = "signup.html";
        return;
    }

    const title = document.querySelector(".blog-title").value;
    const content = quill.root.innerHTML;
    const category = document.getElementById("category").value;

    // 🔴 VALIDATION
    if (!title || !content || !category || !imageKey) {
        alert("All fields are required (including image & category)");
        return;
    }

    fetch("http://localhost:8081/blogs/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            content: content,
            category: category,
            image: imageKey,   // 🔥 only key stored in DB
            user: { id: user.id }
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("Blog created successfully");
        window.location.href = "dashboard.html";
    })
    .catch(() => {
        alert("Error creating blog");
    });
};