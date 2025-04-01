
function createCourseDiv(data){
    console.log(data.course)
}


function fillCoursePage(){
    const url_course = window.location.pathname.split("/")[2]
    fetch(`/get/course/${url_course}`)
    .then (response => response.json())
    .then (data => {
        const body = document.getElementById('body')
        body.appendChild(createCourseDiv(data))
    })
}

fillCoursePage()