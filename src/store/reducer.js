import { configureStore } from "@reduxjs/toolkit";
import { questionSlice } from "./slices/quizSlice.js";
import { userSlice } from "./slices/userSlice";
import { forumSlice } from "./slices/forumSlice";
import { profileSlice } from "./slices/profileSlice";
import podcastReducer from "./slices/podcastSlice";
import bookReducer from "./slices/bookSlice";
import articleReducer from "./slices/articleSlice";
import educationReducer from "./slices/educationSlice.js";
import { listenerMiddleware as quizListener } from "./middleware/quizListener.js";
import { userListenerMiddleware as userListener } from "./middleware/userListener";
import { listenerMiddleware as forumListener } from "./middleware/forumListener";
import { investmentSlice } from "./slices/investmentSlice.js";
import { listenerMiddleware as profileListener } from "./middleware/profileListener.js";
import { listenerMiddleware as investmentListener } from "./middleware/investmentListener.js";
import { educationListenerMiddleware } from "./middleware/educateListener.js";

export const store = configureStore({
    reducer: {
        quiz: questionSlice.reducer,
        currentUser: userSlice.reducer,
        forum: forumSlice.reducer,
        profile: profileSlice.reducer,
        education: educationReducer,
        podcasts: podcastReducer,
        book: bookReducer,
        article: articleReducer,
        investments: investmentSlice.reducer,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware()
            .prepend(quizListener.middleware)
            .prepend(userListener.middleware)
            .prepend(forumListener.middleware)
            .prepend(profileListener.middleware)
            .prepend(investmentListener.middleware)
            .prepend(educationListenerMiddleware.middleware);
    },
});
