fetch('/static/json/temp/category.json')
    .then(response => response.json())
    .then(topics => {

        const body = document.getElementById('body')

        Object.keys(topics).forEach(topic => {

            Object.keys(topics[topic]).forEach(course => {

                const courseDiv = document.createElement('div')
                courseDiv.classList.add('style', 'course')

                const backgroundImage = document.createElement('img')
                backgroundImage.classList.add('course-img')
                backgroundImage.src = `/static/img/${topic}.jpg`
                courseDiv.appendChild(backgroundImage)

                const price = topics[topic][course]['price']

                let dependencies = topics[topic][course]['prerequisites'];
                let dependenciesList
                if (dependencies.length === 0) {
                    dependenciesList = 'None'
                } else {
                    dependenciesList = dependencies.join(" - ")
                }

                const xlist = [
                    ["TOPIC", topic],
                    ["COURSE", course],
                    ["DEPENDENCIES", dependenciesList],
                    ["PRICE", price],
                ]

                xlist.forEach(row => {
                    const rowDic = document.createElement('div')
                    const title = document.createElement('h3')
                    const result = document.createElement('p')
                    result.style.textAlign = 'right'
                    title.textContent = row[0]
                    result.textContent = row[1]
                    rowDic.appendChild(title)
                    rowDic.appendChild(result)
                    courseDiv.appendChild(rowDic)
                })

                const rowDic = document.createElement('div')
                rowDic.classList.add('rowButton')
                rowDic.innerHTML = `
                <p id='${course}' style="display:none;" class='resultText'></p>
                <button class="style btn" onclick="buyCourse('${topic}','${course}','${price}')">Register</button>
                `
                courseDiv.appendChild(rowDic)

                body.appendChild(courseDiv)
            })
        })
    })


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

function checkHref(topic, btn) {
    btn.classList.toggle('active')
    fetch('/courses-api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selected_topic: topic }),
    })
        .then(response => response.json())
        .then(data => {
            url = `/courses/${data.message}`
            window.location.href = url
    })
}

function fillTopRow(){

    const rowOptions = document.createElement('div')
    rowOptions.classList.add('selectRow')
    document.getElementById('body').prepend(rowOptions)

    fetch('/static/json/topics.json')
        .then(response => response.json())
        .then(topics => {

            Object.keys(topics).forEach(topic => {
                const topicBtn = document.createElement('div')
                topicBtn.innerHTML = `
                <a class="style btnTopic" onClick="checkHref('${topic}', this)">${topic}</a>
                `
                rowOptions.appendChild(topicBtn)
            })
            
        })
}
fillTopRow()
