import { createSlice } from "@reduxjs/toolkit";
import { FORUM_CATEGORIES } from "../../helpers/categories";
import { FORUM_FORM_STATUS, FORUM_STATUS } from "../../helpers/status";
import { filterCB } from "../../helpers/arrayCallback";

const initialFormErrorMessage = {
    title: null,
    description: null,
    category: null,
    submission: null,
};

export const forumSlice = createSlice({
    name: "forum",
    initialState: {
        topicStatus: FORUM_STATUS[0],
        topicsError: null,
        currentTopicID: null,
        currentTopicTitle: "",
        currentTopicDescription: "",
        currentTopicCategories: [],
        currentTopicReplies: [],
        currentTopicSender: {
            id: "",
            displayName: "",
        },
        currentTopicDate: null,
        isCurrentTopicNew: false,
        topics: [],
        forumCategories: FORUM_CATEGORIES,
        selectedForumCategories: [],
        isRepliesReady: true,
        repliesErrorMessage: null,
        replyFormStatus: FORUM_FORM_STATUS[0],
        replyFormErrorMessage: "",
        replyFormValue: "",
        selectedNewTopicCategories: [],
        formStatus: FORUM_FORM_STATUS[0],
        formErrorMessage: initialFormErrorMessage,
    },
    reducers: {
        // trigger to firestore operations
        fetchTopics(state) {
            state.topicStatus = FORUM_STATUS[1];
        },
        selectForumCategory(state, action) {
            state.selectedForumCategories = [...state.selectedForumCategories, action.payload];
        },
        removeForumCategory(state, action) {
            state.selectedForumCategories = [...state.selectedForumCategories].filter(filterCB(action.payload));
        },
        resetForumCategory(state) {
            state.selectedForumCategories = [];
        },
        addTopic(state, action) {
            state.formStatus = FORUM_FORM_STATUS[1];
            const errorMessages = { ...initialFormErrorMessage };
            if (state.selectedNewTopicCategories.length < 1) {
                errorMessages.category = "Select at least one category";
                state.formStatus = FORUM_FORM_STATUS[3];
            }
            if (action.payload.title === "") {
                errorMessages.title = "Title can not be empty";
                state.formStatus = FORUM_FORM_STATUS[3];
            }
            if (action.payload.description === "") {
                errorMessages.description = "Description can not be empty";
                state.formStatus = FORUM_FORM_STATUS[3];
            }
            state.formErrorMessage = errorMessages;
        },
        addReply(state) {
            state.replyFormStatus = FORUM_FORM_STATUS[1];
            state.replyFormErrorMessage = "";
        },
        changeCurrentTopic(state, action) {
            if (state.currentTopicID !== action.payload) {
                const selectedTopic = state.topics.find(findTopicCB);
                if (selectedTopic) {
                    state.isRepliesReady = true;
                    state.currentTopicID = action.payload;
                    state.currentTopicTitle = selectedTopic.title;
                    state.currentTopicDescription = selectedTopic.description;
                    state.currentTopicSender = selectedTopic.sender;
                    state.currentTopicCategories = selectedTopic.categories;
                    state.currentTopicDate = selectedTopic.date;
                    state.isRepliesReady = false;
                    state.repliesErrorMessage = "";
                }
            }
            function findTopicCB(element) {
                return element.id === action.payload;
            }
        },

        // handle firestore operation
        topicsLoaded(state, action) {
            state.topicStatus = FORUM_STATUS[2];
            state.topics = action.payload;
        },
        topicsFetchFailed(state, action) {
            state.topicStatus = FORUM_STATUS[3];
            state.topicsError = action.payload.error;
        },
        topicAdded(state) {
            state.isCurrentTopicNew = true;
        },
        topicAdditionFailed(state, action) {
            state.formStatus = FORUM_FORM_STATUS[2];
            state.formErrorMessage.submission = action.payload;
        },
        repliesLoaded(state, action) {
            state.currentTopicReplies = action.payload;
            state.isRepliesReady = true;
            state.replyFormStatus = FORUM_FORM_STATUS[0];
        },
        repliesEmpty(state) {
            state.currentTopicReplies = [];
            state.isRepliesReady = true;
            state.replyFormStatus = FORUM_FORM_STATUS[0];
        },
        repliesFetchFailed(state, action) {
            state.repliesErrorMessage = action.payload;
        },
        replySubmitted(state) {
            state.replyFormStatus = FORUM_FORM_STATUS[0];
            state.replyFormValue = "";
        },
        replySubmitFailed(state, action) {
            state.replyFormStatus = FORUM_FORM_STATUS[2];
            state.replyFormErrorMessage = action.payload;
        },

        // local reducers
        resetCurrentTopic(state) {
            state.currentTopicID = null;
        },
        dropCurrentTopicNewTag(state) {
            state.isCurrentTopicNew = false;
        },
        addFormCategories(state, action) {
            state.selectedNewTopicCategories = [...state.selectedNewTopicCategories, action.payload];
        },
        removeFormCategories(state, action) {
            state.selectedNewTopicCategories = state.selectedNewTopicCategories.filter(filterCB(action.payload));
        },
        resetNewTopicForm(state) {
            state.formErrorMessage = initialFormErrorMessage;
            state.formStatus = FORUM_FORM_STATUS[0];
            state.selectedNewTopicCategories = [];
            state.currentTopicID = null;
        },
        updateReplyFormValue(state, action) {
            state.replyFormValue = action.payload;
        },
    },
});

export const {
    fetchTopics,
    topicsLoaded,
    topicsFetchFailed,
    selectForumCategory,
    removeForumCategory,
    resetForumCategory,
    changeCurrentTopic,
    resetCurrentTopic,
    dropCurrentTopicNewTag,
    addFormCategories,
    removeFormCategories,
    resetNewTopicForm,
    resetFormStatus,
    addTopic,
    topicAdded,
    topicAdditionFailed,
    repliesLoaded,
    repliesEmpty,
    repliesFetchFailed,
    addReply,
    replySubmitted,
    replySubmitFailed,
    updateReplyFormValue,
} = forumSlice.actions;
