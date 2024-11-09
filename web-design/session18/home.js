
// const feed = document.getElementById('feed')
// const global = document.getElementById('global')
// const profile = document.getElementById('profile')

const storiesData = [
    { userId: "user1", imageUrl: "image/p1.jpg" },
    { userId: "user2", imageUrl: "image/p2.jpg" },
    { userId: "user3", imageUrl: "image/p3.jpg" },
    { userId: "user4", imageUrl: "image/p4.jpg" },
    { userId: "user5", imageUrl: "image/p5.jpg" }
]


const postsData = [
    {
        userId: "user1",
        imageUrl: "image/p1.jpg",
        likes: 300,
        comments: 20,
        shares: 4,
        caption: "This is a comment1",
        date: "Posted on October 12, 2024"
    },
    {
        userId: "user2",
        imageUrl: "image/p2.jpg",
        likes: 150,
        comments: 12,
        shares: 2,
        caption: "This is a comment2",
        date: "Posted on October 15, 2024"
    },
    {
        userId: "user3",
        imageUrl: "image/p3.jpg",
        likes: 420,
        comments: 30,
        shares: 8,
        caption: "This is a comment3",
        date: "Posted on October 18, 2024"
    }
]


function renderStories() {
    const storiesContainer = document.querySelector('.stories')
    storiesContainer.innerHTML = ''

    storiesData.forEach(story => {
        const storyElement = document.createElement('div')
        storyElement.classList.add('story')
        storyElement.innerHTML = `
            <img src="${story.imageUrl}" alt="${story.userId}">
            <p>${story.userId}</p>
        `
        storiesContainer.appendChild(storyElement)
    })
}

const globalPostsData = [
    { imageUrl: "image/p1.jpg", userId: "user1" },
    { imageUrl: "image/p2.jpg", userId: "user2" },
    { imageUrl: "image/p3.jpg", userId: "user3" },
    { imageUrl: "image/p4.jpg", userId: "user4" },
    { imageUrl: "image/p5.jpg", userId: "user5" },
    { imageUrl: "image/p6.jpg", userId: "user6" },
    { imageUrl: "image/p7.jpg", userId: "user7" },
    { imageUrl: "image/p8.jpg", userId: "user8" },
    { imageUrl: "image/p9.jpg", userId: "user9" }
];




function renderPosts() {
    const postsContainer = document.querySelector('.posts')
    postsContainer.innerHTML = ''

    postsData.forEach(post => {
        const postElement = document.createElement('div')
        postElement.classList.add('post')
        postElement.innerHTML = `
            <div class="top">
                <img src="${post.imageUrl}" alt="${post.userId}">
                <p>${post.userId}</p>
                <div class="seperator"></div>
                <i class="ri-more-line"></i>
            </div>
            <img src="${post.imageUrl}" alt="${post.userId}">
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
                <a href="#">${post.userId}</a> ${post.caption}
            </p>
            <p class="date">${post.date}</p>
        `
        postsContainer.appendChild(postElement)
    })
}





window.addEventListener('DOMContentLoaded', () => {
    // global.classList.add('hide')
    renderStories()
    renderPosts()
})    



// function hide(section){
//     section.classList.add('hide')
// }

// function showGlobal(){
//     hide(feed)
//     hide(profile)
//     global.classList.remove('hide')
// }

// function showFeed(){
//     hide(global)
//     hide(profile)
//     feed.classList.remove('hide')
// }
