const body = document.getElementById("body");
let selectedOptions = new Set();

fetch("/api/courses")
    .then(response => response.json())
    .then(data => {
        const optionRow = document.createElement("div");
        optionRow.id = "option-row";

        Object.keys(data).forEach(category => {
            const btn = document.createElement("button");
            btn.textContent = category;
            btn.classList.add("option-btn", "style", "btn");
            btn.dataset.category = category;
            btn.addEventListener("click", () => {
                if (selectedOptions.has(category)) {
                    selectedOptions.delete(category);
                    btn.classList.remove("active");
                } else {
                    selectedOptions.add(category);
                    btn.classList.add("active");
                }
                fetch("/api/courses")
                    .then(response => response.json())
                    .then(data => renderCourses(data, selectedOptions));
            });

            optionRow.appendChild(btn);
        });

        body.appendChild(optionRow);
        renderCourses(data, selectedOptions);
    });

function renderCourses(data, filters) {

    let categories;
    if (filters.size > 0) {
        categories = Array.from(filters);
    } else {
        categories = Object.keys(data);
    }

    let oldProductDiv = document.getElementById("product-div");
    if (oldProductDiv) {
        oldProductDiv.remove();
    }

    const productDiv = document.createElement("div");
    productDiv.id = "product-div";

    categories.forEach(category => {
        Object.entries(data[category]).forEach(([course, details]) => {
            const courseDiv = document.createElement("div");
            courseDiv.classList.add("style", "course");

            const backgroundImage = document.createElement("img");
            backgroundImage.classList.add("course-img");
            backgroundImage.src = `/static/img/${category}.jpg`;
            courseDiv.appendChild(backgroundImage);

            let dependencies = details.prerequisites;
            let dependencyList = dependencies.length ? dependencies.join(" - ") : "None";
            let price = details.price;

            const productDetails = [
                ["TOPIC", category],
                ["COURSE", course],
                ["DEPENDENCIES", dependencyList],
                ["PRICE", price]
            ];

            productDetails.forEach(row => {
                const rowDic = document.createElement("div");
                const title = document.createElement("h3");
                const result = document.createElement("p");
                result.style.textAlign = "right";
                title.textContent = row[0];
                result.textContent = row[1];
                rowDic.appendChild(title);
                rowDic.appendChild(result);
                courseDiv.appendChild(rowDic);
            });

            const rowDic = document.createElement("div");
            rowDic.classList.add("rowButton");
            rowDic.innerHTML = `
                <p id='${course}' style="display:none;" class='resultText'></p>
                <button class="style btn" onclick="buyCourse('${category}','${course}','${price}')">Register</button>
            `;
            courseDiv.appendChild(rowDic);
            productDiv.appendChild(courseDiv);
        });
    });

    body.appendChild(productDiv);
}

function buyCourse(topic, course, price) {
    fetch(`/purchase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: topic, course: course, price: price }),
    })
        .then(response => response.json())
        .then(data => {
            const resultText = document.getElementById(course)
            resultText.style.display = 'block';
            resultText.textContent = data.message;
            resultText.nextElementSibling.disabled = true
        })
}