function createTopicsDiv(topics) {
    const optionRow = document.createElement("div");
    optionRow.id = "option-row";
    const site_url = window.location.pathname.split('/')[2].replace(/&/g, " ")
    console.log(site_url)

    
    Object.keys(topics).forEach(category => {
        const btn = document.createElement("a");
        btn.textContent = category;
        btn.classList.add("option-btn", "style", "btn");
        btn.id = category
        btn.href = `/shop/${category}`
        if (site_url === category){
            btn.style.backgroundColor = 'rgb(49, 94, 255)'
            btn.style.color = 'white'
          }
        optionRow.appendChild(btn);
    });
    return optionRow;
}

function createCoursesDiv(topics){
    const productDiv = document.createElement("div");
    productDiv.id = "product-div";
    const site_url = window.location.pathname.split('/')[2].replace(/&/g, " ");

    Object.entries(topics).forEach(([topic, topicDetails]) => {
        if (site_url === "All" || topic === site_url) {
            topicDetails.courses.forEach(course => 
                productDiv.appendChild(createCourseDiv(topic, topicDetails.img_link, course))
            );
        }
    });
    
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
 
        const p = document.createElement('p')
        p.id = course.title
        p.style.display = 'none'
        p.classList.add('resultText')
        actionRow.appendChild(p)
        const button = document.createElement('button')
        button.classList.add('style', 'btn')
        button.textContent = 'Register'
        button.onclick = function() { buyCourse(course.title) }
        actionRow.appendChild(button)
        return actionRow
    }
    
    courseDiv.appendChild(handleDependency())
    courseDiv.appendChild(handleActionRow())

    return courseDiv
}

function buyCourse(course) {
    fetch(`/shop/purchase/${course}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
        const resultText = document.getElementById(course);
        resultText.textContent = data.message;
        resultText.style.display = 'block'
        
        const resultRow = resultText.closest('.rowButton')
        const button = resultText.nextElementSibling;

        if (data.success) {
            if (button) {
                button.remove();
            }

            const courseLink = document.createElement("a");
            courseLink.href = `/study/${course}`;
            courseLink.textContent = "Start Course";
            courseLink.classList.add("style", "btn");

            resultRow.appendChild(courseLink);
        } else {
            resultText.textContent = data.message
            resultText.nextElementSibling.disabled = true
        }
    });
}

function fillShopPage(){
    const body = document.getElementById('body')
    fetch("/get/topics")
    .then(response => response.json())
    .then(data => {
        body.appendChild(createTopicsDiv(data.topics))
        body.appendChild(createCoursesDiv(data.topics))
    })
}
fillShopPage()

