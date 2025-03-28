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
function addManageUsersDiv() {
  const div = document.createElement("div");
  div.id = "manage-users-div";
  div.classList.add("content-div");
  div.style.display = "none";

  fetch("get/users")
    .then(response => response.json())
    .then(data => {
      Object.values(data.users).forEach(details => {
        const userDiv = document.createElement("div")
        userDiv.classList.add("style", "user-div")

        const detailRows = [
          details.user_name,
          details.age,
          details.city,
          details.status
        ]

        detailRows.forEach(info => {
          const p = document.createElement('p')
          p.textContent = info
          userDiv.appendChild(p)
        })

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('style', 'btn')
        deleteBtn.textContent = 'Remove User'
      
        deleteBtn.onclick = function () {
          fetch(`/delete-user/${details.user_name}`)
          .then (response => response.json())
          .then (response => {
            if (response.success){
              deleteBtn.textContent = 'User Deleted!'
              deleteBtn.disabled = true
            }
          })
        }


        userDiv.appendChild(deleteBtn)

        div.appendChild(userDiv)
      });
    });
  return div;
}


function addManageOpinionsDiv() {
  const div = document.createElement("div");
  div.id = "manage-opinions-div";
  div.classList.add("content-div");
  div.style.display = "none";

  fetch("/get/messages")
    .then(response => response.json())
    .then(data => {
      data.messages.forEach(details => {
        const opinionDiv = document.createElement("div");
        opinionDiv.classList.add("style", "opinion-div");

        // Row 1: Username & Time
        const row1 = document.createElement("div");
        row1.innerHTML = `<p><strong>From:</strong> ${details.username}</p><p><strong>Time:</strong> ${details.time}</p>`;
        row1.classList.add("row");

        // Row 2: Subject & Message
        const row2 = document.createElement("div");
        row2.innerHTML = `<p><strong>Subject:</strong> ${details.subject}</p><p><strong>Message:</strong> ${details.message}</p>`;
        row2.classList.add("row");


        opinionDiv.appendChild(row1);
        opinionDiv.appendChild(row2);
        div.appendChild(opinionDiv);
      });
    });

  return div;
}





export function createAdminDivs(dataDetails) {
  const div = document.getElementById("body");
  div.appendChild(addPersonalInfoDiv(dataDetails));
  div.appendChild(addManageUsersDiv());
  div.appendChild(addManageOpinionsDiv());
  return div;
}
