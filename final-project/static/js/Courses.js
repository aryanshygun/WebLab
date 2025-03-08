document.addEventListener("DOMContentLoaded", () => {
    const body = document.getElementById("body");
    let selectedOptions = new Set();

    fetchCourses().then(data => {
        createCategoryButtons(data);
        renderCourses(data, selectedOptions);
    });

    function fetchCourses() {
        return fetch("/api/courses")
            .then(response => response.json());
    }

    function createCategoryButtons(data) {
        const optionRow = document.createElement("div");
        optionRow.id = "option-row";

        Object.keys(data).forEach(category => {
            const btn = document.createElement("button");
            btn.textContent = category;
            btn.classList.add("option-btn", "style", "btn");
            btn.dataset.category = category;
            btn.addEventListener("click", () => handleCategorySelection(btn, category));
            optionRow.appendChild(btn);
        });

        body.appendChild(optionRow);
    }

    function handleCategorySelection(btn, category) {
        if (selectedOptions.has(category)) {
            selectedOptions.delete(category);
            btn.classList.remove("active");
        } else {
            selectedOptions.add(category);
            btn.classList.add("active");
        }

        updateURL();
        fetchCourses().then(data => renderCourses(data, selectedOptions));
    }

    function updateURL() {
        let selectedCategories = Array.from(selectedOptions);
        let newPath = selectedCategories.length > 0
            ? `/courses/${selectedCategories.join("-")}`
            : "/courses/all";
        window.history.pushState({}, "", newPath);
    }

    function renderCourses(data, filters) {
        let categories = filters.size > 0 ? [...filters] : Object.keys(data);
        clearExistingCourses();

        const productDiv = document.createElement("div");
        productDiv.id = "product-div";

        categories.forEach(category => {
            Object.entries(data[category]).forEach(([course, details]) => {
                productDiv.appendChild(createCourseElement(category, course, details));
            });
        });

        body.appendChild(productDiv);
    }

    function clearExistingCourses() {
        let oldProductDiv = document.getElementById("product-div");
        if (oldProductDiv) oldProductDiv.remove();
    }

    function createCourseElement(category, course, details) {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("style", "course");

        const backgroundImage = document.createElement("img");
        backgroundImage.classList.add("course-img");
        backgroundImage.src = `/static/img/${category}.jpg`;
        courseDiv.appendChild(backgroundImage);

        let dependencies = details.prerequisites.length ? details.prerequisites.join(" - ") : "None";
        let price = details.price;

        const productDetails = [
            ["TOPIC", category],
            ["COURSE", course],
            ["DEPENDENCIES", dependencies],
            ["PRICE", price]
        ];

        productDetails.forEach(row => {
            courseDiv.appendChild(createDetailRow(row[0], row[1]));
        });

        courseDiv.appendChild(createRegisterButton(category, course, price));

        return courseDiv;
    }

    function createDetailRow(titleText, valueText) {
        const rowDic = document.createElement("div");
        const title = document.createElement("h3");
        const result = document.createElement("p");
        result.style.textAlign = "right";

        title.textContent = titleText;
        result.textContent = valueText;

        rowDic.appendChild(title);
        rowDic.appendChild(result);

        return rowDic;
    }

    function createRegisterButton(category, course, price) {
        const rowDic = document.createElement("div");
        rowDic.classList.add("rowButton");
        rowDic.innerHTML = `
            <p id='${course}' style="display:none;" class='resultText'></p>
            <button class="style btn" onclick="buyCourse('${category}','${course}','${price}')">Register</button>
        `;
        return rowDic;
    }
});
function buyCourse(topic, course, price) {
    fetch(`/purchase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, course, price }),
    })
    .then(response => response.json())
    .then(data => {
        const resultText = document.getElementById(course);
        resultText.textContent = data.message;
        resultText.style.display = 'block'
        
        const resultRow = resultText.closest('.rowButton'); // Get the parent div

        if (data.success) {
            // Remove the button only
            const button = resultText.nextElementSibling;
            if (button) {
                button.remove();
            }

            const courseLink = document.createElement("a");
            courseLink.href = `/course/${course}`;
            courseLink.textContent = "Start Course";
            courseLink.classList.add("style", "btn");

            resultRow.appendChild(courseLink);
        } else {
            resultText.nextElementSibling.disabled = true
        }
    });
}
