import { FORUM_FORM_STATUS, FORUM_STATUS } from "../helpers/status";
import {
    addFormCategories,
    addReply,
    addTopic,
    changeCurrentTopic,
    dropCurrentTopicNewTag,
    fetchTopics,
    removeFormCategories,
    removeForumCategory,
    resetCurrentTopic,
    resetForumCategory,
    resetNewTopicForm,
    selectForumCategory,
    updateReplyFormValue,
} from "../store/slices/forumSlice";

export function mapStateToForumProps(state) {
    return {
        isInitialRender: state.forum.topicStatus == FORUM_STATUS[0],
        isTopicsReady: state.forum.topicStatus == FORUM_STATUS[2],
        topics: state.forum.topics,
        topicCategories: state.forum.forumCategories,
        selectedCategories: state.forum.selectedForumCategories,
        topicsErrorMessage: state.forum.topicsError,
        selectedTopicID: state.forum.currentTopicID,
    };
}

export function mapDispatchToForumProps(dispatch) {
    return {
        initialTopicRenderACB() {
            dispatch(fetchTopics());
        },
        selectTopicACB(questionID) {
            dispatch(changeCurrentTopic(questionID));
        },
        selectForumCategoryACB(category) {
            dispatch(selectForumCategory(category));
        },
        unselectForumCategoryACB(category) {
            dispatch(removeForumCategory(category));
        },
        selectAllForumCategoryACB() {
            dispatch(resetForumCategory());
        },
    };
}

export function mapStateToForumDetailProps(state) {
    return {
        id: state.forum.currentTopicID,
        title: state.forum.currentTopicTitle,
        description: state.forum.currentTopicDescription,
        sender: state.forum.currentTopicSender,
        isRepliesReady: state.forum.isRepliesReady,
        replies: state.forum.currentTopicReplies,
        date: state.forum.currentTopicDate,
        categories: state.forum.currentTopicCategories,
        isCurrentTopicNew: state.forum.isCurrentTopicNew,
        currentSenderPhoto: state.currentUser.photoURL,
        repliesErrorMessage: state.forum.repliesErrorMessage,
        isReplyFormLoading: state.forum.replyFormStatus === FORUM_FORM_STATUS[1],
        replyFormErrorMessage: state.forum.replyFormErrorMessage,
        replyFormValue: state.forum.replyFormValue,
    };
}

export function mapDispatchToForumDetailProps(dispatch) {
    return {
        resetTopicACB() {
            dispatch(resetCurrentTopic());
        },
        resetNewTopicFormACB() {
            dispatch(resetNewTopicForm());
        },
        dropCurrentTopicNewTagACB() {
            dispatch(dropCurrentTopicNewTag());
        },
        handleReplyFormChangeACB(text) {
            dispatch(updateReplyFormValue(text));
        },
        handleReplySubmitACB(text) {
            dispatch(addReply(text));
        },
    };
}

export function mapStateToForumNewProps(state) {
    return {
        currentUserPhoto: state.currentUser.photoURL,
        currentUserName: state.currentUser.displayName,
        currentTopicTitle: state.forum.currentTopicTitle,
        availableCategories: state.forum.forumCategories,
        selectedCategories: state.forum.selectedNewTopicCategories,
        isLoading: state.forum.formStatus === FORUM_FORM_STATUS[1],
        formErrorMessages: state.forum.formErrorMessage,
    };
}

export function mapDispatchToForumNewProps(dispatch) {
    return {
        selectFormCategoryACB(category) {
            dispatch(addFormCategories(category));
        },
        unselectFormCategoryACB(category) {
            dispatch(removeFormCategories(category));
        },
        submitTopicACB(title, description) {
            dispatch(addTopic({ title, description }));
        },
    };
}
