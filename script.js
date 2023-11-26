document.getElementById('article-form').addEventListener('submit', addArticle);

function getArticles() {
    return JSON.parse(localStorage.getItem('articles')) || [];
}

function displayArticles() {
    const articles = getArticles();
    const articleList = document.getElementById('article-list');
    articleList.innerHTML = ''; // Clear existing articles
    articles.forEach(article => {
        const articleDiv = document.createElement('article');
        articleDiv.innerHTML = `
            <h2>${article.title}</h2>
            <p>${convertUrlsToLinks(article.content)}</p>
            <p><b>Author:</b> ${article.author}</p>
        `;
        articleList.appendChild(articleDiv);
    });
}



// Modify addArticle function to include link
function addArticle(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const link = document.getElementById('link').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;

    const newArticle = { title, link, content, author };
    const articles = getArticles();
    articles.push(newArticle);
    localStorage.setItem('articles', JSON.stringify(articles));

    document.getElementById('article-form').reset();
    displayArticles();
}

// Modify displayArticles function to include a remove button
function displayArticles() {
    const articles = getArticles();
    const articleList = document.getElementById('article-list');
    articleList.innerHTML = '';
    articles.forEach((article, index) => {
        const articleDiv = document.createElement('article');
        articleDiv.innerHTML = `
            <a href="${article.link}" target="_blank">
                <img src="placeholder.jpg" alt="Placeholder Image">
                <h2>${article.title}</h2>
            </a>
            <p>${convertUrlsToLinks(article.content)}</p>
            <p><b>Author:</b> ${article.author}</p>
            <button onclick="removeArticle(${index})">Remove Article</button>
        `;
        articleList.appendChild(articleDiv);
    });
}

// Add removeArticle function
function removeArticle(index) {
    const articles = getArticles();
    articles.splice(index, 1);
    localStorage.setItem('articles', JSON.stringify(articles));
    displayArticles();
}

document.getElementById('content').addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});


function extractFirstUrl(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/;
    const matches = text.match(urlRegex);
    return matches ? matches[0] : '#';
}

function convertUrlsToLinks(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, url => `<a href="${url}" target="_blank">${url}</a>`);
}

window.onload = displayArticles;
