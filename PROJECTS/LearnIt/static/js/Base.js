function createHeaderDiv() {
  const headerDiv = document.createElement("header");
  headerDiv.classList.add("style");

  const logoAddress = document.createElement('a')
  logoAddress.href = '/'
logoAddress.classList.add('logo-address')
  const logo = document.createElement("img");
  
  logo.id = "logo";
  logoAddress.appendChild(logo);
  



  const sideBarBtn = document.createElement('a')
  const icon = document.createElement('i')
  icon.classList.add('ri-menu-line')
  sideBarBtn.appendChild(icon)
  sideBarBtn.classList.add('style','alt', 'btn', 'side-bar-btn')
  // sideBarBtn.textContent = 'HAM'
  sideBarBtn.onclick = function () {
    const div = document.querySelector('.side-bar')
    // div.classList.add('show')
    if (div.classList.contains('show')){
      div.classList.remove('show')
    } else {
      div.classList.add('show')
    }
  }

  const sideBarDiv = document.createElement("div");
  sideBarDiv.classList.add("side-bar", "style");
  sideBarDiv.innerHTML = `
  <a class="style btn alt no-wrap" href="/home">HOME</a>
  <a class="style btn alt no-wrap" href="/shop/All">SHOP</a>
  <a class="style btn alt no-wrap" href="/course/none">COURSE</a>
  <a class="style btn alt no-wrap" href="/contact">CONTACT</a>
  `
  const themeSwitchDiv = document.createElement('div')
  themeSwitchDiv.classList.add('style', 'btn', 'alt')
  themeSwitchDiv.style.display = 'flex'
  themeSwitchDiv.style.justifyContent = 'space-between'

  function createThemeIcon(iconClass, themeName) {
    const icon = document.createElement('i');
    icon.classList.add(iconClass, 'ri-2x');
    icon.onclick = () => {
      fetch(`/set-theme/${themeName}`);
      setTheme(themeName);
    };
    return icon;
  }
  
  const darkIcon = createThemeIcon('ri-moon-line', 'dark');
  const lightIcon = createThemeIcon('ri-sun-line', 'light');
  
  themeSwitchDiv.append(darkIcon, lightIcon)
  sideBarDiv.appendChild(themeSwitchDiv)
  



  const navBar = document.createElement("div");
  navBar.classList.add("nav-bar");

  pages = [
    ["HOME", "/home", 'home'],
    ["SHOP", "/shop/All", 'shop'],
    ["COURSE", "/course/none", 'course'],
    ["CONTACT", "/contact", 'contact'],
  ];

  pages.forEach(([textContent, href, url]) => {
    const link = document.createElement("a");
    link.classList.add("style", "btn", "no-wrap");
    link.textContent = textContent;
    link.href = href;
    const site_url = window.location.pathname.split('/')[1]
    if (site_url === url){
      link.classList.add('active')
    }
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
  profileButton.href = "/profile/Personal&Info";

  headerDiv.appendChild(sideBarBtn);
  headerDiv.appendChild(sideBarDiv);
  headerDiv.appendChild(logoAddress);
  headerDiv.appendChild(navBar);
  headerDiv.appendChild(profileButton);

  return headerDiv;
}

function createBodyDiv() {
  const body = document.createElement("div");
  body.id = "body";
  return body;
}

function createFooterDiv() {
  const footerDiv = document.createElement("footer");
  footerDiv.classList.add("style");

  const legalText = document.createElement("p");
  legalText.textContent = "Web Pack Test Case Project LearnIt 2025";
  legalText.classList.add('no-wrap')

  const socialDiv = document.createElement("div");
  socialDiv.classList.add("socials");

  function createThemeIcon(iconClass, themeName) {
    const icon = document.createElement('i');
    icon.classList.add(iconClass, 'ri-2x');
    icon.onclick = () => {
      fetch(`/set-theme/${themeName}`);
      setTheme(themeName);
    };
    return icon;
  }
  
  const darkIcon = createThemeIcon('ri-moon-line', 'dark');
  const lightIcon = createThemeIcon('ri-sun-line', 'light');
  
  socialDiv.append(darkIcon, lightIcon)
  


  const socials = ["youtube", "instagram", "twitter-x", "reddit", "discord"];
  socials.forEach((social) => {
    const socialIcon = document.createElement("i");
    socialIcon.classList.add(`ri-${social}-line`, `ri-2x`);
    socialDiv.appendChild(socialIcon);
  });

  footerDiv.appendChild(legalText);
  footerDiv.appendChild(socialDiv);
  // footerDiv.appendChild(createVerticalNav());
  return footerDiv;
}

function addIconLink() {
  const link = document.createElement("link");
  link.href =
    "https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css";
  link.rel = "stylesheet";
  return link;
}


function setTheme(theme){

  if (theme === 'dark'){
    document.documentElement.style.setProperty('--background-color', '#00000085');
    document.documentElement.style.setProperty('--text-color', '#eeeeee');
    document.documentElement.style.setProperty('--accent-color', '#315eff');
    document.documentElement.style.setProperty('--background-url', "url('/static/img/bg-dark.png')");
    document.getElementById('logo').src = `/static/img/logo-light.png`



  } else if (theme === 'light') {
    document.documentElement.style.setProperty('--background-color', '#eeeeee85');
    document.documentElement.style.setProperty('--text-color', '#303030');
    document.documentElement.style.setProperty('--accent-color', '#ff5733');
    document.documentElement.style.setProperty('--background-url', "url('/static/img/bg-light.png')");
    document.getElementById('logo').src = `/static/img/logo-dark.png`
  }
}

function fillBasePage() {

  document.head.appendChild(addIconLink());
  // did it in reverse so that the 3 main divs are atop the two scripts
  document.body.prepend(createFooterDiv());
  document.body.prepend(createBodyDiv());
  document.body.prepend(createHeaderDiv());

}

fillBasePage();

fetch('/get-theme')
.then(response => response.json())
.then(data => {
  setTheme(data.theme)
})

