// Configuration constants for external APIs, including credentials and base URLs
export const SPOTIFY_CONFIG = {
    CLIENT_ID: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    CLIENT_SECRET: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
};

export const GOOGLE_BOOKS_CONFIG = {
    BASE_URL: import.meta.env.VITE_GOOGLE_BOOKS_BASE_URL,
};
