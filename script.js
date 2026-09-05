const bookContainer=document.getElementById("bookContainer");
const searchInput=document.querySelector(".search_box input");
const searchButton=document.querySelector(".search_box button");

const defaultBooks=[
    {
        title:"The Book of Boor",
        author:"Gareth Brown",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKbFxR97Mk6RebAHAdSM_gfgJQ99XHZmbM8q18Vzk1_w&s=10"
    },
    {
        title:"Whispering Mountains",
        author:"John Aiken",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhpU0sUENHK7McEv9RK31Rn8e9szbp4hTmigNVLnIu3w&s=10"
    },
    {
        title:"Three Men in a Boat",
        author:"Jerome K. Jerome",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSoF32vn8tlifdUrhbD1aj_GqwvEV3NVO1b2o3FyBXrw&s=10"
    }
];

function displayDefaultBooks() {
    bookContainer.innerHTML = "";
    defaultBooks.forEach(book => {
        createBookCard(book);
    });
}

//create the book card
function createBookCard(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `
        <img src="${book.image}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p class="author">${book.author}</p>
        <button class="save-btn"> Add to Library </button>
        <button class="fav-btn"> Add to Favourites </button>
    `;
    bookContainer.append(bookCard);
}

// API fetching 
async function searchBooks(searched) {
    try{
        bookContainer.innerHTML = "<p>Loading books...</p>";
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searched)}&limit=12`);
        const data = await response.json();
        bookContainer.innerHTML = "";
        data.docs.forEach(book => {
            const title = book.title || "Unknown Title";
            const author = book.author_name ? book.author_name[0] : "Unknown Author";
            const image = book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : "https://via.placeholder.com/150x220?text=No+Cover";
            createBookCard({
                title: title,
                author: author,
                image: image
            });
        });
    }
    catch (error) {
        console.error("Error:", error);
        bookContainer.innerHTML ="<p>Unable to fetch books. Please try again.</p>";
    }
}
searchButton.addEventListener("click", () => {
    const searched = searchInput.value.trim();
    if (searched === "") {
        displayDefaultBooks();
    }
    else{
        searchBooks(searched);
    }
});

searchInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        searchButton.click();
    }
});
displayDefaultBooks();