import { createSlice } from "@reduxjs/toolkit";
import { articleData } from "../../utils/Education/articleData"; 

const initialState = {
    articles: articleData,
    selectedTitle: null,
};

const articleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {
        setSelectedTitle: (state, action) => {
            state.selectedTitle = action.payload;
        },
        clearSelectedTitle: (state) => {
            state.selectedTitle = null;
        },
    },
});

export const { setSelectedTitle, clearSelectedTitle } = articleSlice.actions;
export default articleSlice.reducer;

// educationListener.js - Updated listener middleware
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { fetchBook } from "../slices/bookSlice";
import { setSelectedPodcastDescription } from "../slices/podcastSlice";;
import { bookClicked, articleClicked } from "../slices/educationSlice";

export const educationListenerMiddleware = createListenerMiddleware();

// Book click listener
educationListenerMiddleware.startListening({
    actionCreator: bookClicked,
    effect: async (action, listenerApi) => {
        const { title } = action.payload;
        
        // Dispatch the async thunk
        listenerApi.dispatch(fetchBook(title));
    },
});

// Article click listener  
educationListenerMiddleware.startListening({
    actionCreator: articleClicked,
    effect: (action, listenerApi) => {
        const { title } = action.payload;
        const state = listenerApi.getState();
        const articles = state.article.articles;

        const article = articles.find((a) => a.title === title);

        if (article) {
            listenerApi.dispatch(
                setSelectedPodcastDescription({
                    description: article.description,
                    url: article.url,
                })
            );
            listenerApi.dispatch(setSelectedTitle(title));
        }
    },
});
