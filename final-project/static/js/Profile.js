// const body = document.getElementById("body");

let allowedDivs;
function initializeAllowedDivs() {
  return fetch("/get/session")
    .then((response) => response.json())
    .then((data) => {
      userDetails = data.detail;

      if (userDetails.status === "Student") {
        allowedDivs = [
          ["Personal Info", "personal-info-div"], // shows the details of the user like city age
          ["Finished Courses", "finished-courses-div"], // just shows the finished courses and their scores
          ["In Progress Courses", "in-progress-courses-div"], // as above
          ["Wallet", "wallet-div"], // shows current money, allows to add money, shows history of transactions
        ];
      } else if (userDetails.status === "Teacher") {
        allowedDivs = [
          ["Personal Info", "personal-info-div"], // shows the details of the user like city age
          ["Manage Courses", "manage-courses-div"], // shows all the courses created, allows to create a course
          ["Manage Tests", "manage-tests-div"], // shows all the tests created, allows to create a test
          ["Manage Opinions", "manage-opinions-div"], // if teacher, shows all the opinions regarding coures
        ];
      } else if (userDetails.status === "Admin") {
        allowedDivs = [
          ["Personal Info", "personal-info-div"], // shows the details of the user like city age
          ["Manage Users", "manage-users-div"], // shows lall the users, allows admin to remove the user
          ["Manage Opinions", "manage-opinions-div"], // if admin, shows all the opinions regarding courses and teachers and site
        ];
      }
    });
}

function addBtnsDiv() {
  const leftSection = document.createElement("section");
  leftSection.id = "btn-list";
  allowedDivs.forEach(([sectionName, sectionId], index) => {
    const btn = document.createElement("a");
    btn.classList.add("style", "btn", "panel-btns");
    // const url = encodeURIComponent(href)

    // btn.href = `/profile/${url}`;
    // console.log(btn)
    

    btn.textContent = sectionName;
    btn.onclick = function () {
      showDiv(sectionId, btn);
    };
    leftSection.appendChild(btn);

    if (index === 0) {
      btn.classList.add("active");
    }
  });

  function addLoginBtn() {
    const btn = document.createElement("a");
    btn.textContent = "Log Out";
    btn.href = "/logout";
    btn.classList.add("style", "btn");
    btn.id = "logout-btn";
    return btn;
  }
  leftSection.appendChild(addLoginBtn());
  return leftSection;
}

function addDivs(userDetails) {
  import(`./profile${userDetails.status}.js`).then((module) => {
    return module[`create${userDetails.status}Divs`](userDetails);
  });
}

function showDiv(sectionId, btn) {
  document.querySelectorAll(".panel-btns").forEach((button) => {
    button.classList.remove("active");
  });
  btn.classList.add("active");

  document.querySelectorAll(".content-div").forEach((div) => {
    div.style.display = "none";
  });

  const targetDiv = document.getElementById(sectionId);
  if (targetDiv) {
    targetDiv.style.display = "flex";
  }
}
function fillProfilePage() {
  const body = document.getElementById("body");
  body.classList.add('profile-div')
  initializeAllowedDivs().then(() => {
    body.appendChild(addBtnsDiv());
    body.appendChild(addDivs(userDetails));
  });
}

fillProfilePage();
