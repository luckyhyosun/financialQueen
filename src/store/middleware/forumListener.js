import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {
    addReply,
    addTopic,
    changeCurrentTopic,
    fetchTopics,
    removeForumCategory,
    repliesEmpty,
    repliesFetchFailed,
    repliesLoaded,
    replySubmitFailed,
    replySubmitted,
    resetCurrentTopic,
    resetForumCategory,
    selectForumCategory,
    topicAdded,
    topicAdditionFailed,
    topicsFetchFailed,
    topicsLoaded,
} from "../slices/forumSlice";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { FORUM_FORM_STATUS } from "../../helpers/status";
import navigationService from "../../service/navigationService";

export const listenerMiddleware = createListenerMiddleware();

let forumUnsubscribe;
let replyUnsubscribe;
export function forumCleanUp(dispatch) {
    dispatch(resetCurrentTopic());
    if (forumUnsubscribe) {
        forumUnsubscribe();
    }
    if (replyUnsubscribe) {
        replyUnsubscribe();
    }
}

listenerMiddleware.startListening({
    matcher: isAnyOf(selectForumCategory, resetForumCategory, removeForumCategory),
    effect: function categoryChangeEffectACB(action, listenerApi) {
        listenerApi.dispatch(fetchTopics());
    },
});

listenerMiddleware.startListening({
    actionCreator: fetchTopics,
    effect: async function fetchTopicEffectACB(action, listenerApi) {
        const {
            forum: { selectedForumCategories },
        } = listenerApi.getState();
        try {
            forumUnsubscribe = onSnapshot(collection(db, "forumQuestions"), handleSnapshotCB);
        } catch (error) {
            listenerApi.dispatch(topicsFetchFailed(error.message));
        }

        function handleSnapshotCB(snapshot) {
            let topics = snapshot.docs.map(mapSnapshotItemCB).sort(compareSnapshotItemCB);
            if (selectedForumCategories.length > 0) {
                topics = [...topics].filter(filterCategoriesItemCB);
            }
            listenerApi.dispatch(topicsLoaded(topics));
        }

        function mapSnapshotItemCB(snapshotItem) {
            const data = snapshotItem.data();
            return {
                id: snapshotItem.id,
                title: data?.title || "",
                description: data?.description || "",
                sender: {
                    id: data?.sender?.id || null,
                    img: data?.sender?.img || "",
                    name: data?.sender?.name || "",
                },
                categories: data.categories || [],
                date: data?.date || null,
                replies: data?.replies || [],
            };
        }

        function compareSnapshotItemCB(a, b) {
            if (a.date > b.date) {
                return -1;
            } else if (a.date < b.date) {
                return 1;
            }
            return 0;
        }

        function filterCategoriesItemCB({ categories }) {
            return categories.some(checkCategoryCB);
            function checkCategoryCB(categoryItem) {
                return selectedForumCategories.includes(categoryItem);
            }
        }
    },
});

listenerMiddleware.startListening({
    actionCreator: addTopic,
    effect: async function addTopicEffectACB(action, listenerApi) {
        try {
            const {
                currentUser,
                forum: { selectedNewTopicCategories: categories, formStatus },
            } = listenerApi.getState();

            if (formStatus != FORUM_FORM_STATUS[3]) {
                const newTopic = {
                    title: action.payload.title,
                    description: action.payload.description,
                    sender: {
                        id: currentUser.id,
                        img: currentUser.photoURL,
                        name: currentUser.displayName,
                    },
                    categories: categories,
                    date: Date.now(),
                    replies: [],
                };
                const docRef = await addDoc(collection(db, "forumQuestions"), newTopic);
                listenerApi.dispatch(changeCurrentTopic(docRef.id));
                listenerApi.dispatch(topicAdded());
            }
        } catch (error) {
            listenerApi.dispatch(topicAdditionFailed(error.message));
        }
    },
});

listenerMiddleware.startListening({
    actionCreator: topicAdded,
    effect: function redirectNewTopicACB() {
        navigationService.navigateTo("/forum");
    },
});

listenerMiddleware.startListening({
    actionCreator: changeCurrentTopic,
    effect: function fetchCurrentTopicRepliesACB(action, listenerApi) {
        try {
            const currentForumTopicRef = doc(db, "forumQuestions", action.payload);
            replyUnsubscribe = onSnapshot(collection(currentForumTopicRef, "replies"), handleRepliesSnapshotCB);
        } catch (error) {
            listenerApi.dispatch(repliesFetchFailed(error.message));
        }

        function handleRepliesSnapshotCB(snapshot) {
            const replies = snapshot.docs.map(mapRepliesSnapshotCB).sort(compareRepliesSnapshotItemCB);
            if (replies.length > 0) {
                listenerApi.dispatch(repliesLoaded(replies));
            } else {
                listenerApi.dispatch(repliesEmpty());
            }
        }

        function mapRepliesSnapshotCB(snapshotItem) {
            const data = snapshotItem.data();
            return {
                id: snapshotItem.id,
                text: data?.text ?? "",
                sender: {
                    id: data?.sender?.id || null,
                    img: data?.sender?.img || "",
                    name: data?.sender?.name || "",
                },
                createdAt: data?.createdAt ?? null,
            };
        }

        function compareRepliesSnapshotItemCB(a, b) {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            }
            return 0;
        }
    },
});

listenerMiddleware.startListening({
    actionCreator: addReply,
    effect: async function submitNewReplyACB(action, listenerApi) {
        try {
            const {
                currentUser,
                forum: { currentTopicID },
            } = listenerApi.getState();
            const newReply = {
                text: action.payload,
                sender: {
                    img: currentUser.photoURL,
                    name: currentUser.displayName,
                    id: currentUser.id,
                },
                createdAt: Date.now(),
            };
            const currentForumTopicRef = doc(db, "forumQuestions", currentTopicID);
            await addDoc(collection(currentForumTopicRef, "replies"), newReply);
            listenerApi.dispatch(replySubmitted());
        } catch (error) {
            listenerApi.dispatch(replySubmitFailed(error.message));
        }
    },
});
