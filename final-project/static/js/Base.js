function createHeaderDiv() {
  const headerDiv = document.createElement("header");
  headerDiv.classList.add("style");

  const logo = document.createElement("img");
  logo.src = "/static/img/logo.png";

  const navBar = document.createElement("div");
  navBar.classList.add("nav-bar");

  pages = [
    ["Home", "/home"],
    ["Shop", "/shop"],
    ["About Us", "/about"],
    ["Contact Us", "/contact"],
  ];

  pages.forEach(([textContent, href]) => {
    const link = document.createElement("a");
    link.classList.add("style", "btn");
    link.textContent = textContent;
    link.href = href;
    navBar.appendChild(link);
  });

  const profileButton = document.createElement("a");
  profileButton.id = "profile-status";
  profileButton.classList.add("style", "alt", "btn");

  fetch("/get/session")
    .then(response => response.json())
    .then(data => {
      if (data.detail === 'none'){
        document.getElementById("profile-status").textContent = "Profile";
      } else {
        document.getElementById("profile-status").textContent = `${data.detail.first_name} ${data.detail.last_name} - ${data.detail.status}`;
      }
    });
  profileButton.href = "/profile/all";

  headerDiv.appendChild(logo);
  headerDiv.appendChild(navBar);
  headerDiv.appendChild(profileButton);

  return headerDiv;
}

function createBodyDiv() {
  const body = document.createElement("body");
  body.id = "body";
  return body;
}

function createFooterDiv() {
  const footerDiv = document.createElement("footer");
  footerDiv.classList.add("style");

  const legalText = document.createElement("p");
  legalText.textContent =
    "All Content © Copyright WooDY International 2024. All Rights Reserved.";

  const socialDiv = document.createElement("div");
  socialDiv.classList.add("socials");
  const socials = ["youtube", "instagram", "twitter-x", "reddit", "discord"];
  socials.forEach((social) => {
    const socialIcon = document.createElement("i");
    socialIcon.classList.add(`ri-${social}-line`, `ri-2x`);
    socialDiv.appendChild(socialIcon);
  });

  footerDiv.appendChild(legalText);
  footerDiv.appendChild(socialDiv);
  footerDiv.appendChild(createVerticalNav());
  return footerDiv;
}

function addIconLink() {
  const link = document.createElement("link");
  link.href =
    "https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css";
  link.rel = "stylesheet";
  return link;
}

function createVerticalNav(){
  const navBar = document.createElement("div");
  navBar.classList.add("nav-bar");
  navBar.style.display = 'none';

  pages = [
    ["Home", "/home"],
    ["Shop", "/shop"],
    ["About Us", "/about"],
    ["Contact Us", "/contact"],
  ];

  pages.forEach(([textContent, href]) => {
    const link = document.createElement("a");
    link.classList.add("style", "btn");
    link.textContent = textContent;
    link.href = href;
    navBar.appendChild(link);
  });
  return navBar
}

function fillBasePage() {
  document.head.appendChild(addIconLink());
  // did it in reverse so that the 3 main divs are atop the two scripts
  document.body.prepend(createFooterDiv());
  document.body.prepend(createBodyDiv());
  document.body.prepend(createHeaderDiv());
}

fillBasePage();
