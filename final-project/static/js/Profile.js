const body = document.getElementById("body");

let leftList;  // Declare before using
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

function loadLeft() {
    const leftSection = document.createElement("section");
    leftSection.classList.add("left");
    leftList.forEach(([sectionName, sectionId], index) => {
        const btn = document.createElement("a");
        btn.classList.add("style", "btn");
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
    logOut.classList.add("style", "btn", "logout-btn");
    leftSection.appendChild(logOut);
    body.append(leftSection);
}

function loadRight() {
    const rightSection = document.createElement("section");
    rightSection.classList.add("right");

    import(`./profile-${userDetails.status}.js`).then(module => {
        let functionName = `${userDetails.status}Divs`;  // Function name must match the export
        if (module[functionName]) {
            module[functionName]();  // Call the function
        }
    })

    body.appendChild(rightSection);
}

function showDiv(sectionId, btn) {
    document.querySelectorAll(".left .btn").forEach(button => {
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
        loadLeft();
        loadRight();
        // handleDirectAccess();
    });
});

// window.addEventListener("popstate", handleDirectAccess);
