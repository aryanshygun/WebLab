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

function addManageUsersDiv() {
  const div = document.createElement("div");
  div.id = "manage-users-div";
  div.classList.add("content-div");

  fetch("/get/users")
    .then(response => response.json())
    .then(data => {
      Object.values(data.users).forEach(details => {
        const userDiv = document.createElement("div")
        // userDiv.classList.add("style", "user-div")
        userDiv.classList.add("style", "sub-div")

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
          fetch(`/update/remove/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: details.user_name }),
          })
          .then (response => response.json())
          .then (response => {
            location.reload()
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

  fetch("/get/messages")
    .then(response => response.json())
    .then(data => {
      data.messages.forEach(details => {
        const opinionDiv = document.createElement("div");
        opinionDiv.classList.add("style", "sub-div", "two-row");

        const row1 = document.createElement("div");
        row1.innerHTML = `
        <p><strong>From:</strong> ${details.username}</p>
        <p><strong>Time:</strong> ${details.time}</p>
        `;
        row1.classList.add("row");

        const row2 = document.createElement("div");
        row2.innerHTML = `
        <p><strong>Subject:</strong> ${details.subject}</p>
        <p><strong>Message:</strong> ${details.message}</p>
        `;
        row2.classList.add("row");

        opinionDiv.appendChild(row1);
        opinionDiv.appendChild(row2);
        div.appendChild(opinionDiv);
      });
    });

  return div;
}

function addManageAllTransactionsDiv() {
  const div = document.createElement("div");
  div.id = "manage-all-transactions-div";
  div.classList.add("content-div");

  fetch("/get/transactions")
    .then(response => response.json())
    .then(data => {

      data.transactions.forEach(details => {
        const userDiv = document.createElement("div")
        userDiv.classList.add("style", "sub-div", 'transaction-div')
        const detailRows = [
          details.username,
          `${details.action} - ${details.amount} $`,
          details.course,
          details.time
        ]
        detailRows.forEach(detail => {
          const p = document.createElement('p')
          p.textContent = detail
          p.classList.add('no-wrap')
          userDiv.appendChild(p)
        });


        div.appendChild(userDiv)
      })
    });
  return div;
}

function addManageTopicsDiv() {
  const div = document.createElement("div");
  div.id = "manage-topics-div";
  div.classList.add("content-div");

  const addTopicDiv = document.createElement("div");
  addTopicDiv.classList.add("style", "sub-div", 'top-div')

  const input1 = document.createElement("input");
  input1.classList.add("style", "input");
  input1.type = "text";
  input1.placeholder = "Add Topic";
  input1.name = "topic";

  const input2 = document.createElement("input");
  input2.classList.add("style", "input");
  input2.type = "text";
  input2.placeholder = "Add Image";
  input2.name = "image";

  const addBtn = document.createElement("button");
  addBtn.classList.add("style", "btn");
  addBtn.textContent = "Add Topic";

  addBtn.onclick = function () {
    const topic = input1.value;
    const url = input2.value;

    const formData = new FormData();
    formData.append("topicName", topic);
    formData.append("urlAddress", url);

    fetch("/update/add/topics", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then(data => {
        location.reload()
      })
  };

  addTopicDiv.appendChild(input1);
  addTopicDiv.appendChild(input2);
  addTopicDiv.appendChild(addBtn);
  div.appendChild(addTopicDiv);

  fetch("/get/topics")
    .then(response => response.json())
    .then(data => {
      Object.entries(data.topics).forEach(([key, value]) => {
        const userDiv = document.createElement("div")
        // userDiv.classList.add("style", "user-div")
        userDiv.classList.add("style", "sub-div")

        const p = document.createElement('p')
        p.textContent = key
        userDiv.appendChild(p)

        const pUrl = document.createElement('p')

        pUrl.textContent = value.img_link
        userDiv.appendChild(pUrl)

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('style', 'btn')
        deleteBtn.textContent = 'Remove Topic'
      
        deleteBtn.onclick = function () {
          fetch(`/update/remove/topics`, {
            method: "POST",
            body: JSON.stringify({ topicName: key }),
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then (response => response.json())
          .then (response => {
            location.reload()
          })
        }


        userDiv.appendChild(deleteBtn)

        div.appendChild(userDiv)




      });
    });
  return div;
}



export function fillProfile(dataDetails) {

  const url_div = window.location.pathname.split("/")[2]
  const urlList = {
    "Personal&Info": addPersonalInfoDiv(dataDetails),
    "Manage&Users": addManageUsersDiv(),
    "Manage&Topics": addManageTopicsDiv(),
    "Manage&Opinions": addManageOpinionsDiv(),
    "Manage&Transactions": addManageAllTransactionsDiv(),
  }
  return urlList[url_div]
}
