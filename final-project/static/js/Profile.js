const body = document.getElementById("body");

let leftList
function initializeLeftList() {
    return fetch('/get-info')
        .then(response => response.json())
        .then(data => {
            const status = data.details.status;
            userDetails = data.details

            if (status === "student") {
                leftList = [
                    ["Personal Info", "personal-div"],
                    ["Finished Courses", "finished-courses-div"],
                    ["In Progress Courses", "in-progress-courses-div"],
                    ["Wallet", "wallet-div"],
                ];
            } else if (status === "teacher") {
                leftList = [
                    ["Personal Info", "personal-div"],
                    ["Manage Courses", "manage-courses-div"],
                    ["Manage Exams", "manage-exams-div"],
                ];
            } else {
                leftList = [
                    ["Personal Info", "personal-div"],
                    ["Manage Users", "manage-users-div"],
                    ["Manage Opinions", "manage-opinions-div"]
                ];
            }
        });
}

function loadBtnList() {
    const leftSection = document.createElement("section");
    leftSection.id = 'btn-list'
    leftList.forEach(([sectionName, sectionId], index) => {
        const btn = document.createElement("a");
        btn.classList.add("style", "btn", 'panel-btns');
        
        btn.textContent = sectionName;
        btn.onclick = function () {
            showDiv(sectionId, btn);
        };
        leftSection.appendChild(btn);

        if (index === 0){
            btn.classList.add('active')
        }
    });

    const logOut = document.createElement("a");
    logOut.textContent = "Log Out";
    logOut.href = "/logout";
    logOut.classList.add("style", "btn", "panel-btns");
    logOut.id = 'logout-btn'
    leftSection.appendChild(logOut);
    body.append(leftSection);
}

function loadDiv() {
    import(`./profile-${userDetails.status}.js`).then(module => {
        let functionName = `${userDetails.status}Divs`;
        if (module[functionName]) {
            module[functionName]();
        }
    })
}

function showDiv(sectionId, btn) {
    document.querySelectorAll(".panel-btns").forEach(button => {
        button.classList.remove("active");
    });
    btn.classList.add("active");

    document.querySelectorAll(".content-div").forEach(div => {
        div.style.display = "none";
    });

    const targetDiv = document.getElementById(sectionId);
    if (targetDiv) {
        targetDiv.style.display = "flex";
    }
    
    // history.pushState(null, "", `/profile/${urlPath}`);
}

// function handleDirectAccess() {
//     const path = window.location.pathname;
//     const sections = {
//         "personal-data": "personal-div",
//         "courses": "courses-div",
//         "study": "study-div",
//         "exam": "exam-div"
//     };

//     const key = path.split("/").pop();
//     const sectionId = sections[key] || "personal-div";

//     document.querySelectorAll(".left .btn").forEach(btn => {
//         if (btn.textContent.toLowerCase().includes(key)) {
//             showDiv(sectionId, btn);
//         }
//     });
// }

window.addEventListener("DOMContentLoaded", () => {
    initializeLeftList().then(() => {
        loadBtnList();
        loadDiv();
        // handleDirectAccess();
    });
});

// window.addEventListener("popstate", handleDirectAccess);
