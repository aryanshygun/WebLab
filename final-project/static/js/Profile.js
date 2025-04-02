let allowedDivs;
function initializeAllowedDivs() {
  return fetch("/get/session")
    .then((response) => response.json())
    .then((data) => {
      userDetails = data.detail;

      if (userDetails.status === "Student") {
        allowedDivs = [
          "Personal Info", // shows the details of the user like city age
          "Finished Courses", // just shows the finished courses and their scores
          "In Progress Courses", // as above
          "Wallet", // shows current money, allows to add money, shows history of transactions
        ];
      } else if (userDetails.status === "Teacher") {
        allowedDivs = [
          "Personal Info", // shows the details of the user like city age
          "Manage Courses", // shows all the courses created, allows to create a course
          "Manage Tests", // shows all the tests created, allows to create a test
          "Manage Opinions", // if teacher, shows all the opinions regarding coures
        ];
      } else if (userDetails.status === "Admin") {
        allowedDivs = [
          "Personal Info", // shows the details of the user like city age
          "Manage Users", // shows lall the users, allows admin to remove the user
          "Manage Opinions", // if admin, shows all the opinions regarding courses and teachers and site
          "Manage Transactions" // if admnin, have access to vieww all the transacitosn
        ];
      }
    });
}

function addBtnsDiv() {
  const leftSection = document.createElement("section");
  leftSection.id = "btn-list";

  const site_url = window.location.pathname.split('/')[2].replace(/&/g, " ")

  allowedDivs.forEach(sectionName => {
    const btn = document.createElement("a");
    const url = sectionName.replace(/ /g, "&");
    btn.href = `/profile/${url}`
    btn.classList.add("style", "btn", "panel-btns");
    if (site_url === sectionName){
      btn.style.backgroundColor = 'rgb(49, 94, 255)'
      btn.style.color = 'white'
    }
    btn.textContent = sectionName;
    leftSection.appendChild(btn);
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

function fillProfilePage() {
  const body = document.getElementById("body");
  body.classList.add('profile-div')

  initializeAllowedDivs().then(() => {
    body.appendChild(addBtnsDiv());

    import(`./profile${userDetails.status}.js`).then(module => {
      body.appendChild(module['fillProfile'](userDetails))
    });

  });
}

fillProfilePage();
