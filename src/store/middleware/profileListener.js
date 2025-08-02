import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
    fetchQuizResult,
    fetchMainPrincessImg,
    fetchMainPrincessDone,
    fetchOtherPrincessDone,
    updateQuizResult,
    updateQuizResultSuccess,
    quizResultLoaded,
    quizResultFetchFailed,
    updateQuizResultFailed,
    quizResultEmpty,
    fetchPrincesImgFailed,
} from "../slices/profileSlice";
import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { fetchDisneyCharacter } from "../../api/disney";
import { getDescByName, mapRiskByNames } from "../../helpers/quizanswer";
import { getStoredQuizResult } from "../../helpers/localStorage";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: fetchQuizResult,
    effect: async function fetchQuizEffectACB(action, listenerApi) {
        try {
            const {
                currentUser: { id: userId },
                profile: { updateInProgress },
            } = listenerApi.getState();

            // If an update is in progress, don't fetch yet - the update listener will trigger a fetch when done
            if (updateInProgress) {
                return;
            }

            //check latest quiz saved
            const { sortedAnswerRate, representativePrincessName } = getStoredQuizResult();
            if (sortedAnswerRate && representativePrincessName) {
                const names = sortedAnswerRate.map(mapPrincessNameCB);
                const riskAnalysis = mapRiskByNames(names);
                const { shortDesc, longDesc } = getDescByName(representativePrincessName);
                listenerApi.dispatch(
                    updateQuizResult({
                        princessRateResult: sortedAnswerRate,
                        princessNameResult: representativePrincessName,
                        riskAnalysis: riskAnalysis,
                        shortDesc: shortDesc,
                        longDesc: longDesc,
                    })
                );
                // The updateQuizResult listener will handle the fetch when complete
            } else {
                const snapshot = await getDoc(doc(db, "users", userId));
                const data = snapshot.data();
                const quizResult = data?.quizResult || [];

                if (quizResult.length > 0) {
                    const latestQuizResult = [...quizResult].reduce(findLatestSnapshotItemByDateCB, {});
                    listenerApi.dispatch(
                        quizResultLoaded({
                            princessRateResult: latestQuizResult?.princessRateResult || [],
                            princessNameResult: latestQuizResult?.princessNameResult || "",
                            shortDesc: latestQuizResult?.shortDesc || "",
                            longDesc: latestQuizResult?.longDesc || "",
                            riskAnalysis: latestQuizResult?.riskAnalysis || [],
                        })
                    );
                    listenerApi.dispatch(fetchMainPrincessImg());
                } else {
                    listenerApi.dispatch(quizResultEmpty);
                }
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            listenerApi.dispatch(quizResultFetchFailed(error.message));
        }
        function mapPrincessNameCB({ name }) {
            return name;
        }
        function findLatestSnapshotItemByDateCB(a, b) {
            if (a.takenAt > b.takenAt) {
                return a;
            }
            return b;
        }
    },
});

listenerMiddleware.startListening({
    actionCreator: fetchMainPrincessImg,
    effect: async function fetchMainPrincessImgEffectACB(action, listenerApi) {
        try {
            // Fetch main princess image
            const { profile } = listenerApi.getState();
            const mainPrincess = await fetchDisneyCharacter(profile.princessNameResult);

            if (mainPrincess) {
                listenerApi.dispatch(fetchMainPrincessDone(mainPrincess.imageUrl));
            }
            if (profile.princessRateResult) {
                const otherData = await Promise.all(
                    profile.princessRateResult.map(async (princess) => {
                        const character = await fetchDisneyCharacter(princess.name);
                        return { ...princess, imgUrl: character?.imageUrl || "" };
                    })
                );
                listenerApi.dispatch(fetchOtherPrincessDone(otherData));
            }
        } catch (error) {
            console.log(error.message);
            listenerApi.dispatch(fetchPrincesImgFailed(error.message));
        }
    },
});

listenerMiddleware.startListening({
    actionCreator: updateQuizResult,
    effect: async function updateQuizResultEffectACB(action, listenerApi) {
        try {
            const {
                currentUser: { id: userId },
            } = listenerApi.getState();
            const newQuizResult = {
                princessNameResult: action.payload.princessNameResult,
                princessRateResult: action.payload.princessRateResult,
                shortDesc: action.payload.shortDesc,
                longDesc: action.payload.longDesc,
                riskAnalysis: action.payload.riskAnalysis,
                takenAt: Date.now(),
            };
            const quizResult = [];
            quizResult.push(newQuizResult);

            const userDocRef = doc(db, "users", userId);
            await setDoc(
                userDocRef,
                {
                    quizResult,
                },
                { merge: true }
            );

            // First mark update as complete
            listenerApi.dispatch(updateQuizResultSuccess());

            // Then load the quiz result (which will also fetch images)
            listenerApi.dispatch(quizResultLoaded(newQuizResult));

            // Finally fetch images
            listenerApi.dispatch(fetchMainPrincessImg());
        } catch (error) {
            console.error("Error updating quiz result:", error);
            listenerApi.dispatch(updateQuizResultFailed(error.message));
        }
    },
});
