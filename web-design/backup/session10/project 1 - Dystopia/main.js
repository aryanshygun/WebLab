document.addEventListener('DOMContentLoaded', () => {
    const toggleLink = document.getElementById('toggleLink')
    const topics = document.getElementsByClassName('topic')
    const toggleImage = document.getElementById('toggleImage')
    let isToggled = false;

    function hideTopics() {
        for (let i = 0; i < topics.length; i++) {
            topics[i].style.width = '0px';
            topics[i].style.padding = '0px';
            closeAll()
        }
    }

    function showTopics() {
        for (let i = 0; i < topics.length; i++) {
            topics[i].style.width = '165px'; 
            topics[i].style.padding = '0 35px'; 
        }
    }

    toggleLink.addEventListener('click', () => {
        if (isToggled) {
            hideTopics();
            toggleImage.style.transform = 'rotate(-135deg)'
            // closeAll()
        } else {
            showTopics();
            toggleImage.style.transform = 'rotate(0deg)'
        }
        isToggled = !isToggled
    })

    const cyberLink = document.getElementById('cyberlink');
    const atomaLink = document.getElementById('atomalink');
    const solarLink = document.getElementById('solarlink');
    const steamLink = document.getElementById('steamlink');

    const cyberDiv = document.getElementById('cyberdiv');
    const atomaDiv = document.getElementById('atomadiv');
    const solarDiv = document.getElementById('solardiv');
    const steamDiv = document.getElementById('steamdiv');

    const background = document.getElementById('background');

    function closeAll() {
        closeDiv(cyberDiv)
        closeDiv(atomaDiv)
        closeDiv(solarDiv)
        closeDiv(steamDiv)
    }

    function closeDiv(xDiv) {
        xDiv.style.opacity = '0'
        xDiv.style.visibility = 'hidden'
    }

    function openDiv(xDiv) {
        xDiv.style.opacity = '1'
        xDiv.style.visibility = 'visible'
    }

    cyberLink.addEventListener('click', () => {
        closeAll()
        openDiv(cyberDiv)
        background.style.transform = 'translateY(0%)'
    })

    atomaLink.addEventListener('click', () => {
        closeAll()
        openDiv(atomaDiv)
        background.style.transform = 'translateY(-25%)'

    })
    solarLink.addEventListener('click', () => {
        closeAll();
        openDiv(solarDiv)
        background.style.transform = 'translateY(-50%)'

    })
    steamLink.addEventListener('click', () => {
        closeAll()
        openDiv(steamDiv)
        background.style.transform = 'translateY(-75%)'

    })

    
})