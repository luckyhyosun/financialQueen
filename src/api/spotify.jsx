// Importing Axios for HTTP requests and Spotify API credentials from configuration
import axios from "axios";
import { SPOTIFY_CONFIG } from "./apiConfig";

const { CLIENT_ID, CLIENT_SECRET } = SPOTIFY_CONFIG;

// Retrieves a Spotify API access token using client credentials flow.
export const getSpotifyToken = async () => {
    const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        // Sending the required grant type for client credentials
        new URLSearchParams({ grant_type: "client_credentials" }),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                 // Encoding the client ID and secret for basic auth
                Authorization: "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
            },
        }
    );
    // Returning the access token from the response
    return response.data.access_token;
};

export async function searchPodcasts(token, query) {

    try {
        const response = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=show&limit=1`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        return data.shows?.items[0] || null;
    } catch (error) {
        console.error("Error fetching podcasts:", error);
        return null;
    }
}

