document.addEventListener("DOMContentLoaded", () => {
    const body = document.getElementById("body");
    
    function fetchFilteredCourses() {
        return fetch("/get-filtered-topics")
        .then(response => response.json())
    }
    
    let selectedOptions = new Set();
    fetchFilteredCourses().then(data => {
        body.appendChild(createCategoryButtons(data.filtered_topics))
        body.appendChild(renderCourses(data.filtered_topics, selectedOptions))
    });

    // creates the row of topics
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
        return optionRow
    }

    // handles the url and rendering the selected topcis
    function handleCategorySelection(btn, category) {
        if (selectedOptions.has(category)) {
            selectedOptions.delete(category);
            btn.classList.remove("active");
        } else {
            selectedOptions.add(category);
            btn.classList.add("active");
        }

        let selectedCategories = Array.from(selectedOptions);
        let newPath = selectedCategories.length > 0
            ? `/shop/${selectedCategories.join("&")}`
            : "/shop/all";
        window.history.pushState({}, "", newPath);

        fetchFilteredCourses().then(data => {
            body.appendChild(renderCourses(data.filtered_topics, selectedOptions))
        });
    }


    // handles creating the div full of courses
    function renderCourses(data, filters) {
        let categories = filters.size > 0 ? [...filters] : Object.keys(data);

        let oldProductDiv = document.getElementById("product-div");
        if (oldProductDiv) oldProductDiv.remove();

        const productDiv = document.createElement("div");
        productDiv.id = "product-div";

        categories.forEach(category => {
            Object.entries(data[category]).forEach(([course, details]) => {
                productDiv.appendChild(createCourseElement(category, course, details));
            });
        });
        return productDiv
    }
    //handles creating a single course
    function createCourseElement(category, course, details) {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("style", "course");

        const backgroundImage = document.createElement("img");
        backgroundImage.classList.add("course-img");
        backgroundImage.src = `/static/img/${category}.jpg`;
        courseDiv.appendChild(backgroundImage);

        let price = details.price;

        const productDetails = [
            ["TOPIC", category],
            ["COURSE", course],
            // ["DEPENDENCIES", dependencies],
            ["PRICE", price]
        ];

        productDetails.forEach(([titleText, valueText]) => {
            const rowDic = document.createElement("div");
            const title = document.createElement("h3");
            const result = document.createElement("p");
            result.style.textAlign = "right";
    
            title.textContent = titleText;
            result.textContent = valueText;
    
            rowDic.appendChild(title);
            rowDic.appendChild(result);

            courseDiv.appendChild(rowDic)
        });

        const dependDiv = document.createElement("div");
        const dependTitle = document.createElement("h3");
        dependTitle.textContent = "DEPENDENCIES";
        
        const dependRow = document.createElement("div");
        dependRow.classList.add('dependencies-div')
        
        if (details.prerequisites.length === 0) {
            const noneText = document.createElement("p");
            noneText.textContent = "None";
            dependRow.appendChild(noneText);
        } else {
            details.prerequisites.forEach(prerequisite => {
                const dependency = document.createElement("p");
                dependency.textContent = prerequisite;
                dependRow.appendChild(dependency);
            });
        }
        dependDiv.appendChild(dependTitle);
        dependDiv.appendChild(dependRow);
        courseDiv.appendChild(dependDiv);



        const rowDic = document.createElement("div");
        rowDic.classList.add("rowButton");
        rowDic.innerHTML = `
            <p id='${course}' style="display:none;" class='resultText'></p>
            <button class="style btn" onclick="buyCourse('${category}','${course}','${price}')">Register</button>
        `;
        courseDiv.appendChild(rowDic)
        return courseDiv;
    }
});

// handles the logic of buying a course as a student
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
        
        const resultRow = resultText.closest('.rowButton')

        if (data.success) {
            const button = resultText.nextElementSibling;
            if (button) {
                button.remove();
            }

            const courseLink = document.createElement("a");
            courseLink.href = `/study/${course}`;
            courseLink.textContent = "Start Course";
            courseLink.classList.add("style", "btn");

            resultRow.appendChild(courseLink);
        } else {
            resultText.nextElementSibling.disabled = true
        }
    });
}