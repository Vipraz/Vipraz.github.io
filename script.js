

const articles = [
    { 
        title: "Nvidia GeForce RTX 5090 release date estimation", 
        link: "https://www.pcgamesn.com/nvidia/geforce-rtx-5090-release-date-price-specs-benchmarks", 
        content: "When is the Nvidia GeForce RTX 5090 release date? Hard as it may be to imagine a graphics card that’s faster than today’s flagship pixel pushers, it’s likely only a matter of time before the Nvidia GeForce RTX 5090 sits at the head of the pack. We’re still a long way out from its launch, but we’ve got all the latest details and rumors on team green’s upcoming GPU right here.", 
        author: "PCGamesn",
        imageSrc: "article1.jpg"
    },
    { 
        title: "It's time to log off", 
        link: "https://www.wired.com/story/doomscrolling-bad-news-mental-health/", 
        content: "Scrolling through social media can feel like a nightmare these days. You’re reading about the horrors of the Israel-Hamas war, and then you’re reading about the horrors of the war between Ukraine and Russia. You’re learning about the latest devastating climate news. Democracy is under threat in America. It can feel like everything is falling apart.", 
        author: "wired", 
        imageSrc: "article2.jpg"
    },  
    { 
        title: "Amazon unveils Q, an AI-powered chatbot", 
        link: "https://techcrunch.com/2023/11/28/amazon-unveils-q-an-ai-powered-chatbot-for-businesses/", 
        content: "Unveiled during a keynote at Amazon’s re:Invent conference in Las Vegas this morning, Q — starting at $20 per user per year, now in public preview — can answer questions like “How do I build a web application using AWS?” Trained on 17 years’ worth of AWS knowledge, Q will offer a list of potential solutions along with reasons you might consider its proposals.", 
        author: "Techcrunch",
        imageSrc: "article3.jpg"
    },  
    { 
        title: "Article 1", 
        link: "https://example.com", 
        content: "Content of Article 1", 
        author: "Author 1" 
    },
    { 
        title: "Article 1", 
        link: "https://example.com", 
        content: "Content of Article 1", 
        author: "Author 1" 
    },
    { 
        title: "Article 1", 
        link: "https://example.com", 
        content: "Content of Article 1", 
        author: "Author 1" 
    },
    // Add more articles as needed
];

function getArticles() {
    return JSON.parse(localStorage.getItem('articles')) || [];
}
function displayArticles() {
    const articleList = document.getElementById('article-list');
    articleList.innerHTML = '';

    articles.forEach((article, index) => {
        const articleDiv = document.createElement('article');
        articleDiv.className = 'article';
        articleDiv.innerHTML = `
            <div class="article-image-container">
                <img src="${article.imageSrc || 'placeholder.jpg'}" alt="Article Image" class="article-image" onerror="this.onerror=null; this.src='placeholder.jpg';">
                <img src="not_favorite.png" alt="Not Favorite" class="favorite-icon" id="fav-icon-${index}">
            </div>
            <div class="article-details">
                <a href="${article.link}" target="_blank"><h2>${article.title}</h2></a>
                <p>${article.content}</p>
                <p><b>Author:</b> ${article.author}</p>
            </div>
        `;
        articleList.appendChild(articleDiv);

        // Attach click event for favorite icon
        const favoriteIcon = articleDiv.querySelector('.favorite-icon');
        favoriteIcon.addEventListener('click', (event) => {
            toggleFavorite(index, event);
        });
    });

    updateFavoriteDisplay();
}


// Function to toggle favorite status and update icon src
function toggleFavorite(articleIndex, event) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorited = favorites.includes(articleIndex);

    if (isFavorited) {
        favorites = favorites.filter(favIndex => favIndex !== articleIndex);
    } else {
        favorites.push(articleIndex);
        createConfetti(event);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteDisplay();
}

function updateFavoriteDisplay() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Iterate over all articles and update their favorite icons
    document.querySelectorAll('.article').forEach((articleElement, index) => {
        // Find the favorite icon within this article
        const favoriteIcon = articleElement.querySelector('.favorite-icon');
        
        if (favorites.includes(index)) {
            favoriteIcon.src = 'favorite.png';
            favoriteIcon.alt = 'Favorite';
        } else {
            favoriteIcon.src = 'not_favorite.png';
            favoriteIcon.alt = 'Not Favorite';
        }
    });
}

// Ensure this function is called when the script loads to set the initial favorite icons
updateFavoriteDisplay();


function createConfetti(event) {
    const colors = ['#800080', '#FF0000', '#FFFF00', '#FFA500']; // Purple, Red, Yellow, Orange
    const confettiCount = 30; // Number of confetti dots
    const { clientX: x, clientY: y } = event; // Get cursor position

    // Create confetti dots
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-dot');
        document.body.appendChild(confetti);

        // Randomize properties
        const color = colors[Math.floor((Math.random()+0.5) * colors.length)];
        const size = Math.random() * 5 + 5; // Size between 5px and 15px
        const lifetime = Math.random() * 1000 + 1000; // Lifetime between 1s and 2s

        // Set initial properties
        confetti.style.backgroundColor = color;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.left = `${x}px`;
        confetti.style.top = `${y}px`;

        // Randomize animation
        const xEnd = x + (Math.random() - 0.5) * 200; // Random end position within 200px range
        const yEnd = y + (Math.random() - 0.5) * 200;

        // Animate confetti
        confetti.animate([
            { transform: `translate3D(0,0,0)` },
            { transform: `translate3D(${xEnd - x}px, ${yEnd - y}px, 0)` }
        ], {
            duration: lifetime,
            easing: 'ease-out'
        });

        // Remove confetti after animation
        setTimeout(() => confetti.remove(), lifetime);
    }
}

window.onload = displayArticles;

document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // Check if user has a preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
});