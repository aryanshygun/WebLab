

let allowedDivs;
function initializeAllowedDivs() {
  return fetch("/get/session")
    .then((response) => response.json())
    .then((data) => {
      userDetails = data.detail;

      if (userDetails.status === "Student") {
        allowedDivs = [
          "Personal Info",
          "Finished Courses",
          "In Progress Courses",
          "Wallet",
        ];
      } else if (userDetails.status === "Teacher") {
        allowedDivs = [
          "Personal Info",
          "Manage Courses",
          "Manage Tests",
        ];
      } else if (userDetails.status === "Admin") {
        allowedDivs = [
          "Personal Info",
          "Manage Users",
          "Manage Topics",
          "Manage Opinions",
          "Manage Transactions"
        ];
      }
    });
}

function addBtnsDiv() {
  const leftSection = document.createElement("section");
  leftSection.id = "btn-list";

  const site_url = window.location.pathname.split('/')[2].replace(/&/g, " ")

  const color = document.getElementById('logo').src.includes('light');
  // it means its darkmode
  const backgroundColor = color ? '#00000085' : '#eeeeee85'
  const textColor = color ? '#eeeeee' : '#303030'
  
  allowedDivs.forEach(sectionName => {
    const btn = document.createElement("a");
    const url = sectionName.replace(/ /g, "&");
    btn.href = `/profile/${url}`
    btn.classList.add("style", "btn", "panel-btns");
    if (site_url === sectionName){
      btn.style.backgroundColor = '#315eff'
      btn.style.color = 'white'
    } else {
      btn.style.backgroundColor = backgroundColor
      btn.style.color = textColor
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
