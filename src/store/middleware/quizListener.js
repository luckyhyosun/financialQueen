import { createListenerMiddleware } from "@reduxjs/toolkit";
import { fetchTempResult, fetchTempResultDone, fetchTempResultEmpty, fetchTempResultFailed } from "../slices/quizSlice";
import { fetchDisneyCharacter } from "../../api/disney";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: fetchTempResult,
    effect: async function fetchTempResultEffectACB(action, listenerApi) {
        try {
            const {
                quiz: {
                    tempQuizResult: { representativePrincess },
                },
            } = listenerApi.getState();
            if (representativePrincess) {
                const character = await fetchDisneyCharacter(representativePrincess);

                if (character?.imageUrl) {
                    listenerApi.dispatch(fetchTempResultDone(character.imageUrl));
                    return;
                }
            }
            listenerApi.dispatch(fetchTempResultEmpty());
        } catch (error) {
            const message = `Error fetching data for ${representativePrincess}: ${error.message}`;
            listenerApi.dispatch(fetchTempResultFailed(message));
        }
    },
});
