import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSpotifyToken, searchPodcasts } from "../../api/spotify";

const podcastNames = [
    "economist podcasts",
    "new economists podcast", 
    "the sound of economics",
    "the economics show",
    "economics explained podcast",
];

export const fetchPodcasts = createAsyncThunk(
    "podcasts/fetchPodcasts", 
    async (_, { rejectWithValue }) => {
        try {
            const token = await getSpotifyToken();   
            const results = await Promise.all(
                podcastNames.map((name) => searchPodcasts(token, name))
            );
            
            console.log("Fetched podcast results:", results);
            return results.flat(); 
        } catch (error) {
            console.error("Failed to fetch podcasts:", error);
            return rejectWithValue(error.message);
        }
    }
);

const podcastSlice = createSlice({
    name: "podcasts",
    initialState: {
        podcasts: [],
        loading: false,
        error: null,
        selectedPodcastDescription: null,
        selectedPodcastUrl: null,
    },
    reducers: {
        setSelectedPodcastDescription: (state, action) => {
            state.selectedPodcastDescription = action.payload.description;
            state.selectedPodcastUrl = action.payload.url;
        },
        resetDescription: (state) => {
            state.selectedPodcastDescription = null;
            state.selectedPodcastUrl = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPodcasts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPodcasts.fulfilled, (state, action) => {
                state.podcasts = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchPodcasts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch podcasts";
            });
    },
});

export const { 
    setSelectedPodcastDescription, 
    resetDescription,
    clearError
} = podcastSlice.actions;

export default podcastSlice.reducer;