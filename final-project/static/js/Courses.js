const jsonTopicPath = 'static/json/topics.json';
const jsonUserPath = 'static/json/users.json';

fetch(jsonTopicPath)
    .then(response => response.json())
    .then(topics => {
        const body = document.getElementById('body')

        Object.keys(topics).forEach(topic => {
            Object.keys(topics[topic]).forEach(course => {
                const courseDiv = document.createElement('div')
                courseDiv.classList.add('style', 'course')

                const xlist = [
                    ["TOPIC", topic],
                    ["COURSE", course],
                    ["PRICE", 100],
                    ["DEPENDENCIES", topics[topic][course]['prerequisites']],
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
                });
                const rowDic = document.createElement('div')
                rowDic.classList.add('rowButton')
                rowDic.innerHTML = `
                <p id='${course}' style="display:none;" class='resultText'></p>
                <button class="style btn" onclick="buyCourse('${topic}','${course}')">Register</button>
                `
                courseDiv.appendChild(rowDic)
                body.appendChild(courseDiv)
            })

        })
    })


    function buyCourse(topic, course) {
        fetch(`/courses/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic: topic, course: course }),
        })
            .then(response => response.json())
            .then(data => {
                const resultText = document.getElementById(course)
                resultText.style.display = 'block';
                resultText.textContent = data.message;
            })
    }