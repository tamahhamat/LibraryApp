document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    //get search term from input
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (!searchTerm) return; //FIX nothing should happen 

    try {
        const response = await fetch(`/library/search?query=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();

        const searchResultsDiv = document.getElementById('searchResults');
        searchResultsDiv.innerHTML = ''; 

        if (data && data.length > 0) {
            data.forEach(book => {
                const bookDiv = document.createElement('div');
                bookDiv.textContent = `Title: ${book.title}, Author: ${book.author}`;
                searchResultsDiv.appendChild(bookDiv); 
            });
        } else {
            searchResultsDiv.textContent = 'No books found'; //change/add text in div
        }
    } catch (error) {
        console.error('Error searching books:', error);
        alert('Error searching books. Please try again later.');
    }
});