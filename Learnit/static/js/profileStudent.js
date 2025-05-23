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

function addCoursesDiv(dataDetails, type, btnText) {
  const div = document.createElement("div");
  div.style.color = textColor

  div.id = `${type}-courses-div`;
  div.classList.add("content-div");

  dataDetails.courses.forEach(({ course, score, status, topic }) => {
    if (status === type) {
      let href = course.replace(/ /g, "&");
      const courseDiv = document.createElement("div");
      courseDiv.classList.add("sub-div","two-row","course-div", "style");

      const infoRow = document.createElement("div");
      function createInfoRow(textContent, type) {
        const text = document.createElement(type);
        text.textContent = textContent;
        return text;
      }
      infoRow.appendChild(createInfoRow(topic, "h2"));
      infoRow.appendChild(createInfoRow(course, "p"));
      infoRow.appendChild(createInfoRow(`Score: ${score}`, "p"));

      const actionRow = document.createElement("div");
      function createActionButton(textContent, type, href) {
        const a = document.createElement("a");
        a.style.backgroundColor = backgroundColor
        a.style.color = textColor

        a.textContent = textContent;
        a.classList.add("style", "btn");
        a.href = `/${type}/${href}`;
        return a;
      }
      actionRow.appendChild(createActionButton("View Course", "course", href));
      actionRow.appendChild(createActionButton("View Exam", "exam", href));

      courseDiv.appendChild(infoRow);
      courseDiv.appendChild(actionRow);

      div.appendChild(courseDiv);
    }
  });
  return div;
}

function addWalletDiv(dataDetails) {
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("content-div");
  mainDiv.id = "wallet-div";
  // mainDiv.style.display = "none";

  function createTopRow() {
      const div = document.createElement("div");
      div.style.backgroundColor = backgroundColor
      div.style.color = textColor

      div.classList.add("style", "sub-div", "wallet-top-row");
      const WalletAmount = document.createElement("h2");
      WalletAmount.textContent = `Wallet: ${dataDetails.wallet}$`;

      const chargeDiv = document.createElement("div");

      const inputField = document.createElement("input");
      inputField.classList.add("style", "input");

      const chargeBtn = document.createElement("button");
      chargeBtn.classList.add("style", "btn");
      chargeBtn.textContent = "Charge Account";
      chargeBtn.onclick = function () {
          const amount = inputField.value;
          fetch(`/update/add/transactions`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  amount: amount,
              }),
          })
          .then(response => response.json())
          .then(data => {
            if (data.success) {

              location.reload()
            }
          })
      };
      
      chargeDiv.appendChild(inputField);
      chargeDiv.appendChild(chargeBtn);

      div.appendChild(WalletAmount);
      div.appendChild(chargeDiv);
      return div;
  }

  mainDiv.appendChild(createTopRow());

  fetch('/get/transactions')
      .then(response => response.json())
      .then(data => {
          data.transactions.forEach(record => {
              if (record.username === dataDetails.user_name) {
                  const div = document.createElement("div");
                  div.style.backgroundColor = backgroundColor
                  div.style.color = textColor
            
                  
                  div.classList.add('style',"sub-div")
                  const xlist = ["action", "course", "amount", "time"];
                  xlist.forEach(x => {
                      const p = document.createElement("p");
                      p.textContent = record[x];
                      div.appendChild(p);
                  });
                  mainDiv.appendChild(div);
              }
          });
      })
  return mainDiv
}

export function fillProfile(dataDetails) {


    const url_div = window.location.pathname.split("/")[2]
    const urlList = {
      "Personal&Info": addPersonalInfoDiv(dataDetails),
      "Finished&Courses": addCoursesDiv(dataDetails, "finished", "Finished Courses"),
      "In&Progress&Courses": addCoursesDiv(dataDetails, "in-progress", "In Progress Courses"),
      "Wallet": addWalletDiv(dataDetails)
    }
    return urlList[url_div]
}