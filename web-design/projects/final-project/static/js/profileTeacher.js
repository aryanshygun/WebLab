const color = document.getElementById('logo').src.includes('light');
// it means its darkmode
const backgroundColor = color ? '#00000085' : '#eeeeee85'
const textColor = color ? '#eeeeee' : '#303030'


function addPersonalInfoDiv(dataDetails) {

  const form = document.createElement("form");
  form.id = "personal-info-div";
  form.classList.add("content-div");
  form.method = "POST";


  function addTopRow() {
    const row = document.createElement("div");
    row.style.backgroundColor = backgroundColor
    row.style.color = textColor
    row.classList.add("style", "sub-div", "top-row-div");
    row.innerHTML = `
            <h2> ${dataDetails.first_name} ${dataDetails.last_name} </h2>
            <h3> ${dataDetails.status}</h3>
        `;

    return row;
  }

  form.appendChild(addTopRow());

  function addInfoRows() {
    const userInfoRows = [
      ["First Name", "first-name", "text", dataDetails.first_name],
      ["Last Name", "last-name", "text", dataDetails.last_name],
      ["Password", "password", "text", dataDetails.password],
      ["City", "city", "text", dataDetails.city],
      ["Age", "age", "number", dataDetails.age],
    ];

    userInfoRows.forEach(([labelTextContent, name, type, inputTextContent]) => {

      const row = document.createElement("div");
      row.classList.add("style", "sub-div");
      row.style.backgroundColor = backgroundColor
      row.style.color = textColor

      const label = document.createElement("label");
      label.setAttribute("for", name);
      label.textContent = labelTextContent;

      const input = document.createElement("input");
      input.classList.add("style", "input");
      input.type = type;
      input.name = name;
      input.value = inputTextContent;

      row.appendChild(label);
      row.appendChild(input);
      form.appendChild(row);


    });
  }

  addInfoRows();

  function addBotRow() {
    const buttonDiv = document.createElement("div");
    buttonDiv.style.backgroundColor = backgroundColor
    buttonDiv.style.color = textColor
    buttonDiv.classList.add("style", "sub-div", "btn-row-div");
    buttonDiv.innerHTML = `
            <p id='success-message' style="display: none;">Update Successful!</p>
            <button type='submit' class='style btn'> Update </button>
        `;
    return buttonDiv;
  }

  form.appendChild(addBotRow());

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    fetch("/update-user-info", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          document.getElementById("success-message").style.display = "inline";
        }
      });
  });



  return form;
}

  
function addManageCoursesDiv(dataDetails) {
  const div = document.createElement("div");
  div.id = "manage-courses-div";
  div.classList.add("content-div");

  dataDetails.courses_created.forEach(course => {
      let href = course.replace(/ /g, "&");
      const courseDiv = document.createElement("div");
      courseDiv.classList.add("sub-div", "style");

      const infoRow = document.createElement("div");
      infoRow.innerHTML = `<p>${course}</p>`;

      const actionRow = document.createElement("div");
      actionRow.classList.add('manage-course-btn-div')
      const viewCourse = document.createElement("a");
      viewCourse.textContent = "View Course";
      viewCourse.classList.add("style", "btn");

      viewCourse.href = `/course/${href}`;
      actionRow.appendChild(viewCourse);
      const deleteCourse = document.createElement("button");
      deleteCourse.textContent = "Remove Course";
      deleteCourse.classList.add("style", "btn");
      // deleteCourse.href = `/manage-course/${href}`;
      deleteCourse.onclick = function () {
        fetch('/update/remove/course', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ course })
        })
        .then(response => response.json())
        .then(data => {
          location.reload()
        });
      }

      actionRow.appendChild(deleteCourse);

      courseDiv.appendChild(infoRow);
      courseDiv.appendChild(actionRow);


      div.appendChild(courseDiv);
    });

    const addDiv = document.createElement("div");
    addDiv.classList.add("style", "sub-div");
    const courseName = document.createElement("input");
    courseName.type = "text";
    courseName.placeholder = "Course Name";
    courseName.classList.add("style", "input");
    const addCourses = document.createElement("button");
    addCourses.textContent = "Add Courses";
    addCourses.classList.add("style", "btn");
    addCourses.onclick = function () {
      fetch('/update/add/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ course: courseName.value })
      })
      .then(response => response.json())
      .then(data => {
        location.reload()
      });
    }
    addDiv.appendChild(courseName);
    addDiv.appendChild(addCourses);

    div.appendChild(addDiv);
  return div;
}

function addManageTestsDiv() {
  const div = document.createElement("div");
  div.id = "manage-tests-div";
  div.classList.add("content-div");

  const btn = document.createElement("a");
  btn.textContent = "Create New Test";
  btn.classList.add("style", "btn");
  btn.href = "/create-test";

  div.appendChild(btn);
  return div;
}

export function fillProfile(dataDetails) {

    const url_div = window.location.pathname.split("/")[2]
    const urlList = {
      "Personal&Info": addPersonalInfoDiv(dataDetails),
      "Manage&Courses": addManageCoursesDiv(dataDetails),
      "Manage&Tests": addManageTestsDiv(dataDetails),
    }
    return urlList[url_div]
}