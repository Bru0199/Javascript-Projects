const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
var filter = document.getElementById('filter');

let limit = 5;
let page = 1;
let isFiltering = false; // Flag to indicate whether filtering is active



// Fetch posts from API

async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();
    return data;
}

//Show posts in DOM

async function showPosts() {
    const posts = await getPosts();

    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class = "post-info">
        <h2 class = "post-title">${post.title}</h2>
        <p class = "post-body">${post.body}</p>
        </div>
        `;
        postsContainer.appendChild(postEl);
    });
}

//Show loader & fetch more posts
// function showLoading() {
//     loading.classList.add('show');

//     setTimeout(() => {
//         loading.classList.remove('show');
//         setTimeout(() => {
//             page++;
//             showPosts();
//         }, 300);
//     }, 1000);
// }

async function showLoading() {
    // If filtering is active, do not proceed with loading more posts
    if (isFiltering) {
        return;
    }

    loading.classList.add('show');

    await new Promise(resolve => setTimeout(resolve, 1000));

    loading.classList.remove('show');
    await new Promise(resolve => setTimeout(resolve, 300));

    page++;
    showPosts();
}

// Filter posts by input
function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    isFiltering = term !== ''; // Update filtering flag based on whether a search term is present

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        }
        else {
            post.style.display = 'none';
        }
    })

}

// Show initial posts 
showPosts();

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});

filter.addEventListener('input', filterPosts);
