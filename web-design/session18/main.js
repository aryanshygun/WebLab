function viewSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView();

    const icons = document.querySelectorAll('.footer i');
    icons.forEach(icon => {
        icon.className = icon.className.slice(0, -4) + "line";
    });

    const activeBtn = document.getElementById(`${sectionId}-btn`);
    activeBtn.className = activeBtn.className.slice(0, -4) + "fill";
}

const storiesData = [
    { userId: "user1", imageUrl: "image/p1.jpg" },
    { userId: "user2", imageUrl: "image/p2.jpg" },
    { userId: "user3", imageUrl: "image/p3.jpg" },
    { userId: "user4", imageUrl: "image/p4.jpg" },
    { userId: "user5", imageUrl: "image/p5.jpg" }
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

const postsData = [
    {
        userId: "user1",
        imageUrl: "image/p1.jpg",
        likes: 300,
        comments: 20,
        shares: 4,
        caption: "This is a comment1",
        date: "October 12, 2024"
    },
    {
        userId: "user2",
        imageUrl: "image/p2.jpg",
        likes: 150,
        comments: 12,
        shares: 2,
        caption: "This is a comment2",
        date: "October 15, 2024"
    },
    {
        userId: "user3",
        imageUrl: "image/p3.jpg",
        likes: 420,
        comments: 30,
        shares: 8,
        caption: "This is a comment3",
        date: "October 18, 2024"
    },
    {
        userId: "user4",
        imageUrl: "image/p4.jpg",
        likes: 420,
        comments: 30,
        shares: 8,
        caption: "This is a comment3",
        date: "October 18, 2024"
    },
    // {
    //     userId: "user5",
    //     imageUrl: "image/p5.jpg",
    //     likes: 20,
    //     comments: 390,
    //     shares: 8,
    //     caption: "This is a comment3",
    //     date: "October 8, 2023"
    // },
    // {
    //     userId: "user6",
    //     imageUrl: "image/p6.jpg",
    //     likes: 300,
    //     comments: 20,
    //     shares: 4,
    //     caption: "This is a comment1",
    //     date: "October 12, 2024"
    // }
    
]

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
    { imageUrl: "global/11.JPG"},
    { imageUrl: "global/12.JPG"},
    { imageUrl: "global/13.JPG"},
    { imageUrl: "global/14.JPG"},
    { imageUrl: "global/8.JPG"},
    { imageUrl: "global/9.JPG"},
    { imageUrl: "global/10.JPG"},
    { imageUrl: "global/11.JPG"},
    { imageUrl: "global/12.JPG"},
    { imageUrl: "global/13.JPG"},
    { imageUrl: "global/14.JPG"}
];

function renderGlobal(){
    const globalContainer = document.getElementById('global-post')
    globalContainer.innerHTML = ''

    globalPostsData.forEach(post => {
        const imgElement = document.createElement('img');
        imgElement.src = post.imageUrl;
        imgElement.alt = post.userId;
        globalContainer.appendChild(imgElement);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('feed').scrollIntoView();
    renderStories()
    renderPosts()
    renderGlobal()
})