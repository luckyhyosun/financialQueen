import { createSlice } from "@reduxjs/toolkit";

const educationSlice = createSlice({
    name: "education",
    initialState: {
        selectedContentType: null, // 'book', 'article', 'podcast'
        selectedTitle: null,
    },
    reducers: {
        bookClicked: (state, action) => {
            state.selectedContentType = 'book';
            state.selectedTitle = action.payload.title;
        },
        articleClicked: (state, action) => {
            state.selectedContentType = 'article';
            state.selectedTitle = action.payload.title;
        },
        podcastClicked: (state, action) => {
            state.selectedContentType = 'podcast';
            state.selectedTitle = action.payload.title;
        },
        resetSelection: (state) => {
            state.selectedContentType = null;
            state.selectedTitle = null;
        },
    },
});

export const { 
    bookClicked, 
    articleClicked, 
    podcastClicked, 
    resetSelection 
} = educationSlice.actions;

export default educationSlice.reducer;