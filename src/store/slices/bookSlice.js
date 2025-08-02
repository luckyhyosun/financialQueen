import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBookDescription } from "../../api/googleBooks";

export const fetchBook = createAsyncThunk(
    "book/fetchBook", 
    async (title, { rejectWithValue }) => {
        try {
            return await fetchBookDescription(title);
        } catch (error) {
            console.error("Failed to fetch book:", error);
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    bookDescription: null,
    loading: false,
    error: null,
    books: [
        { title: "Girls That Invest", img: "girlsThatInvest.png" },
        { title: "Grow Your Money", img: "growYourMoney.jpg" },
        { title: "Woman With Money", img: "womanWithMoney.jpg" },
        { title: "Work Optional", img: "workOptional.jpg" },
        { title: "Financial Feminist", img: "financialFeminist.jpg" },
    ],
};

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        resetBookDescription: (state) => {
            state.bookDescription = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBook.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.bookDescription = "Loading book description...";
            })
            .addCase(fetchBook.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.bookDescription = action.payload;
            })
            .addCase(fetchBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch description";
                state.bookDescription = "Failed to fetch description";
            });
    },
});

export const { clearError, resetBookDescription } = bookSlice.actions;
export default bookSlice.reducer;