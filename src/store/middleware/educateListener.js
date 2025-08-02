import { createListenerMiddleware } from "@reduxjs/toolkit";
import { fetchBookDescription } from "../../api/googleBooks";
import { setSelectedPodcastDescription } from "../slices/podcastSlice";
import { setSelectedTitle } from "../slices/articleSlice";
import { bookClicked, articleClicked } from "../slices/educationSlice";

export const educationListenerMiddleware = createListenerMiddleware();

// Book click listener
educationListenerMiddleware.startListening({
    actionCreator: bookClicked,
    effect: async (action, listenerApi) => {
        const { title } = action.payload;

        // Set loading state
        listenerApi.dispatch(
            setSelectedPodcastDescription({
                description: "Loading book description...",
                url: null,
            })
        );

        try {
            const result = await fetchBookDescription(title);
            listenerApi.dispatch(
                setSelectedPodcastDescription({
                    description: result.description,
                    url: result.url || "https://books.google.com",
                })
            );
        } catch (error) {
            console.error("Book fetch failed:", error);
            listenerApi.dispatch(
                setSelectedPodcastDescription({
                    description: "Failed to load book description.",
                    url: null,
                })
            );
        }
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

        listenerApi.dispatch(
            setSelectedPodcastDescription({
                description: article?.description || "No description available.",
                url: article?.url || null,
            })
        );

        listenerApi.dispatch(setSelectedTitle(title));
    },
});
