
function viewPage(page){
    const frontPages = document.querySelectorAll('.front-page')
    frontPages.forEach(frontPage => {
        frontPage.style.display = 'none'
    })
    document.getElementById(page).style.display = 'flex'

    const footerIcons = document.querySelectorAll('#footer i')
    footerIcons.forEach(icon => {
        icon.className = icon.className.replace('fill', 'line')
        if (icon === event.target) {
            icon.className = icon.className.replace('line', 'fill')
        }
    })
}


const storiesData = [
    { userId: "Zahra", imageUrl: "image/p1.jpg" },
    { userId: "Jabar", imageUrl: "image/p2.jpg" },
    { userId: "Leila", imageUrl: "image/p3.jpg" },
    { userId: "Maryam", imageUrl: "image/p4.jpg" },
    { userId: "Sahand", imageUrl: "image/p5.jpg" }
]

function renderStories() {
    const storiesContainer = document.getElementById('stories')
    storiesContainer.innerHTML = ''

    storiesData.forEach(story => {
        const storyElement = document.createElement('div')
        storyElement.innerHTML = `
            <img src="${story.imageUrl}" class="${'pfp'}">
            <a>${story.userId}</a>
        `
        storiesContainer.appendChild(storyElement)
    })
}

const postsData = [
    {
        userId: "Zahra",
        imageUrl: "image/p1.jpg",
        likes: 300,
        comments: 20,
        shares: 4,
        caption: "Enjoying the peaceful sunset after a long day. Grateful for these little moments!",
        date: "October 12, 2024"
    },
    {
        userId: "Ali",
        imageUrl: "image/p2.jpg",
        likes: 150,
        comments: 12,
        shares: 2,
        caption: "Weekend vibes with my favorite book and a cup of coffee. Life feels perfect right now!",
        date: "October 15, 2024"
    },
    {
        userId: "Sara",
        imageUrl: "image/p3.jpg",
        likes: 420,
        comments: 30,
        shares: 8,
        caption: "Nature is the best escape. This view took my breath away today!",
        date: "October 18, 2024"
    },
    {
        userId: "Hassan",
        imageUrl: "image/p4.jpg",
        likes: 420,
        comments: 30,
        shares: 8,
        caption: "Throwback to the most amazing road trip. Can't wait to explore more places like this!",
        date: "October 18, 2024"
    }
]


function renderPosts() {
    const postsContainer = document.getElementById('posts')
    postsContainer.innerHTML = ''

    postsData.forEach(post => {
        const postElement = document.createElement('div')
        postElement.classList.add('post')
        postElement.innerHTML = `
            <div class="top">
                <img src="${post.imageUrl}" class="pfp">
                <a>${post.userId}</a>
                <div class="seperator"></div>
                <i class="ri-more-line"></i>
            </div>
            <img src="${post.imageUrl}">
            <div class="stats">
                <i class="ri-heart-line"></i>
                <p>${post.likes}</p>
                <i class="ri-chat-1-line"></i>
                <p>${post.comments}</p>
                <i class="ri-telegram-2-line"></i>
                <p>${post.shares}</p>
                <div class="seperator"></div>
                <i class="ri-bookmark-line"></i>
            </div>
            <p class="caption">
                <a href="#">${post.userId}</a>
                ${post.caption}
            </p>
            <p class="date">${post.date}</p>
        `
        postsContainer.appendChild(postElement)
    })
}

const globalPostsData = [
    { imageUrl: "global/1.JPG"},
    { imageUrl: "global/2.JPG"},
    { imageUrl: "global/3.JPG"},
    { imageUrl: "global/4.JPG"},
    { imageUrl: "global/5.JPG"},
    { imageUrl: "global/6.JPG"},
    { imageUrl: "global/7.JPG"},
    { imageUrl: "global/8.JPG"},
    { imageUrl: "global/9.JPG"},
    { imageUrl: "global/10.JPG"},
    { imageUrl: "global/1.JPG"},
    { imageUrl: "global/2.JPG"},
    { imageUrl: "global/3.JPG"},
    { imageUrl: "global/4.JPG"},
    { imageUrl: "global/5.JPG"},
    { imageUrl: "global/6.JPG"},
    { imageUrl: "global/7.JPG"},
    { imageUrl: "global/8.JPG"},
    { imageUrl: "global/9.JPG"},
    { imageUrl: "global/10.JPG"},
]

function renderGlobal(){
    const globalContainer = document.getElementById('global-post')
    globalContainer.innerHTML = ''

    globalPostsData.forEach(post => {
        const imgElement = document.createElement('img')
        imgElement.src = post.imageUrl
        globalContainer.appendChild(imgElement)
    })
}
function renderProfile(){
    const profileContainer = document.getElementById('profile-posts')
    profileContainer.innerHTML = ''
    globalPostsData.forEach(post => {
        const imgElement = document.createElement('img')
        imgElement.src = post.imageUrl
        profileContainer.appendChild(imgElement)
    })
}
window.addEventListener('DOMContentLoaded', () => {
    viewPage('profile')
    renderStories()
    renderPosts()
    renderGlobal()
    renderProfile()
})