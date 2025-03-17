
function fetchTopics(){
    return fetch("/get-topics")
    .then(response => response.json())
}
function createTopicsDiv(topics) {
    const optionRow = document.createElement("div");
    optionRow.id = "option-row";
    
    Object.keys(topics).forEach(category => {
        const btn = document.createElement("button");
        btn.textContent = category;
        btn.classList.add("option-btn", "style", "btn");
        // btn.dataset.category = category;
        btn.id = category
        btn.addEventListener("click", () => toggleTopic(btn, category));
        optionRow.appendChild(btn);
    });
    
    return optionRow;
}

let activeTopics = new Set();

function toggleTopic(btn, category) {
    const productDiv = document.getElementById("product-div");
    
    if (activeTopics.has(category)) {
        activeTopics.delete(category);
        btn.classList.remove('active')
    } else {
        activeTopics.add(category);
        btn.classList.add('active')

    }
    
    updateCoursesDisplay();
}

function updateCoursesDisplay() {
    const productDiv = document.getElementById("product-div");
    productDiv.innerHTML = "";
    
    fetchTopics().then(data => {
        const topicsToShow = activeTopics.size ? [...activeTopics] : Object.keys(data.topics);
        topicsToShow.forEach(topic => {
            data.topics[topic].courses.forEach(course => {
                productDiv.appendChild(createCourseDiv(topic, data.topics[topic].img_link, course));
            });
        });
    });
}


function createCoursesDiv(topics){
    const productDiv = document.createElement("div");
    productDiv.id = "product-div";
    Object.entries(topics).forEach(([topic, topicDetails]) => {
        topicDetails.courses.forEach(course => {
            productDiv.appendChild(createCourseDiv(topic, topicDetails.img_link, course))
        })
    })
    return productDiv
}
function createCourseDiv(topic,topicImg, course){
    const courseDiv = document.createElement("div");
    courseDiv.classList.add("style");

    const backgroundImage = document.createElement("img");
    backgroundImage.src = topicImg;
    courseDiv.appendChild(backgroundImage)

    const courseRows = [
        ["TOPIC", topic],
        ["COURSE", course.title],
        ["PRICE", course.price]
    ]
    courseRows.forEach(([titleText, valueText]) => {
        const row = document.createElement('div')
        const title = document.createElement('h3')
        const result = document.createElement('p')
        title.textContent = titleText
        result.textContent = valueText
        row.appendChild(title)
        row.appendChild(result)
        courseDiv.appendChild(row)
    })

    function handleDependency(){
        const dependencyDiv = document.createElement('div')
        const dependencyTitle = document.createElement('h3')
        dependencyTitle.textContent = 'DEPENDENCIES'
        const dependencyResult = document.createElement('div')
        dependencyResult.classList.add("dependencies-div")
    
        if (course.prerequisites.length === 0){
            const noneText = document.createElement('p')
            noneText.textContent = "None!"
            dependencyResult.appendChild(noneText)
        } else {
            course.prerequisites.forEach(prerequisite => {
                const dependency = document.createElement('p')
                dependency.textContent = prerequisite
                dependencyResult.appendChild(dependency)
            })
        }
        dependencyDiv.appendChild(dependencyTitle)
        dependencyDiv.appendChild(dependencyResult)
        return dependencyDiv
    }

    function handleActionRow(){
        const actionRow = document.createElement("div");
        actionRow.classList.add("rowButton");
        actionRow.innerHTML = `
        <p id='${course.title}' style="display:none;" class='resultText'></p>
        <button class="style btn" onclick="buyCourse('${topic}','${course.title}','${course.price}')">Register</button>
        `;
        return actionRow
    }
    
    courseDiv.appendChild(handleDependency())
    courseDiv.appendChild(handleActionRow())

    return courseDiv
}

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

function fillShopPage(){
    const body = document.getElementById('body')

    fetchTopics().then(data => {
        body.appendChild(createTopicsDiv(data.topics))
        body.appendChild(createCoursesDiv(data.topics))
    })
}
fillShopPage()

