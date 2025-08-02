import { GOOGLE_BOOKS_CONFIG } from "./apiConfig";

// Fetches the description and link of a book based on its title
export async function fetchBookDescription(bookTitle) {
    try {
        const response = await fetch(
            `${GOOGLE_BOOKS_CONFIG.BASE_URL}?q=intitle:${encodeURIComponent(bookTitle)}&maxResults=1`
        );
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const book = data.items[0].volumeInfo;
            return {
                description: book.description || "No description available.",
                url: book.infoLink || null
            };
        } else {
            return {
                description: "No description found for this book.",
                url: null
            };
        }
    } catch (error) {
        console.error("Failed to fetch book description", error);
        return {
            description: "Failed to fetch description.",
            url: null
        };
    }
}
