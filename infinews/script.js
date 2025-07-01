const apiKey = "a5ab15a197dc4e439d3c5f014ff23244"; // Your News API Key
let currentCategory = "general";

// Fetch News Based on Category
async function fetchNews(category = "general") {
    currentCategory = category;
    document.getElementById("news-container").innerHTML = "<h2>Loading News...</h2>";

    const url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&apiKey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
            document.getElementById("news-container").innerHTML = "<h2>No news found!</h2>";
            return;
        }

        renderNews(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
        document.getElementById("news-container").innerHTML = "<h2>Error loading news. Try again later.</h2>";
    }
}


// Render News Articles
function renderNews(articles) {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";

    articles.forEach(article => {
        const newsItem = `
            <div class="news-card">
                <img src="${article.urlToImage || 'https://via.placeholder.com/350'}" alt="News Image">
                <h3>${article.title}</h3>
                <p>${article.description || "No description available."}</p>
                <a href="${article.url}" target="_blank">Read More</a>
            </div>
        `;
        newsContainer.innerHTML += newsItem;
    });
}

// Search News
document.getElementById("search").addEventListener("keypress", async function(event) {
    if (event.key === "Enter") {
        const query = this.value;
        if (query.trim() === "") return;
        
        document.getElementById("news-container").innerHTML = "<h2>Searching...</h2>";

        const url = `https://newsapi.org/v2/everything?q=${query}&language=en&apiKey=${apiKey}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            renderNews(data.articles);
        } catch (error) {
            document.getElementById("news-container").innerHTML = "<h2>Error loading search results.</h2>";
        }
    }
});

// Toggle Dark Mode
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

// Apply Dark Mode on Load
window.onload = function () {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
    fetchNews();
};
