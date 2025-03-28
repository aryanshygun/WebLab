function addPersonalInfoDiv(dataDetails) {
    const form = document.createElement("form");
    form.id = "personal-info-div";
    form.classList.add("content-div");
    form.method = "POST";
  
    function addTopRow() {
      const row = document.createElement("div");
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
            console.log('huh')
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
  div.style.display = "none";

  dataDetails.courses_created.forEach(course => {
      let href = course.replace(/ /g, "&");
      const courseDiv = document.createElement("div");
      courseDiv.classList.add("course-div", "style");

      const infoRow = document.createElement("div");
      infoRow.innerHTML = `<h2>${topic}</h2><p>${course}</p>`;

      const actionRow = document.createElement("div");
      const editBtn = document.createElement("a");
      editBtn.textContent = "Edit Course";
      editBtn.classList.add("style", "btn");
      editBtn.href = `/manage-course/${href}`;

      actionRow.appendChild(editBtn);

      courseDiv.appendChild(infoRow);
      courseDiv.appendChild(actionRow);

      div.appendChild(courseDiv);
  });
  return div;
}

function addManageTestsDiv() {
  const div = document.createElement("div");
  div.id = "manage-tests-div";
  div.classList.add("content-div");
  div.style.display = "none";

  const btn = document.createElement("a");
  btn.textContent = "Create New Test";
  btn.classList.add("style", "btn");
  btn.href = "/create-test";

  div.appendChild(btn);
  return div;
}

function addManageOpinionsDiv() {
  const div = document.createElement("div");
  div.id = "manage-opinions-div";
  div.classList.add("content-div");
  div.style.display = "none";

  fetch("/get-opinions")
      .then(response => response.json())
      .then(data => {
          data.opinions.forEach(({ course, opinion, user }) => {
              const opinionDiv = document.createElement("div");
              opinionDiv.classList.add("style");

              opinionDiv.innerHTML = `
                  <h3>Course: ${course}</h3>
                  <p>${opinion}</p>
                  <p>By: ${user}</p>
              `;
              div.appendChild(opinionDiv);
          });
      });
  return div;
}

export function createTeacherDivs(dataDetails) {
  const div = document.getElementById("body");
  div.appendChild(addPersonalInfoDiv(dataDetails));
  div.appendChild(addManageCoursesDiv(dataDetails));
  div.appendChild(addManageTestsDiv());
  div.appendChild(addManageOpinionsDiv());
  return div;
}