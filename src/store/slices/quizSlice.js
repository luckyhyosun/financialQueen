import { createSlice } from "@reduxjs/toolkit";
import {
    findRepresentativeAnswer,
    analyzeImportantQuestions,
    getQnaPair,
    getShortDescByName,
} from "../../helpers/quizanswer";

const initialQnaPair = getQnaPair(0);

const initialTempQuizResult = {
    representativePrincess: "",
    princessImage: null,
    princessDescription: "",
};

const initialState = {
    currentQuestionId: 0,
    question: initialQnaPair.question,
    answers: initialQnaPair.answers,
    selectedAnswers: [],
    characterData: {},
    tempQuizResult: initialTempQuizResult,
    loading: true,
    error: null,
    isEmpty: false,
};

export const questionSlice = createSlice({
    name: "quiz",
    initialState: initialState,
    reducers: {
        initiateQuiz() {
            return initialState;
        },
        changeQuestion(state, action) {
            const currentQuestionPair = getQnaPair(action.payload);
            return {
                ...state,
                currentQuestionId: action.payload,
                question: currentQuestionPair.question,
                answers: currentQuestionPair.answers,
            };
        },
        fetchSelectedAnswers(state) {
            const storedAnswers = JSON.parse(localStorage.getItem("storedAnswers")) || [];
            state.selectedAnswers = storedAnswers;
        },
        storeAnswers(state, action) {
            const { id, label, answer } = action.payload;
            const updatedAnswers = [...state.selectedAnswers];
            const index = updatedAnswers.findIndex((item) => item.id === id);
            if (index !== -1) {
                updatedAnswers[index] = { id, label, answer };
            } else {
                updatedAnswers.push({ id, label, answer });
            }

            if (id !== undefined && label && answer) {
                localStorage.setItem("storedAnswers", JSON.stringify(updatedAnswers));
            }
            state.selectedAnswers = updatedAnswers;
        },
        analyzeQuizAnswers(state, action) {
            //Determines the most representative answer based on both frequency and importance
            if (state.selectedAnswers.length !== 5) {
                return {
                    pattern: "incomplete",
                    counts: {},
                    representativeAnswer: null,
                    weightedAnalysis: null,
                };
            }
            const sortedAnswers = [...state.selectedAnswers].sort((a, b) => a.id - b.id);

            const answerTexts = sortedAnswers.map((item) => item.label);
            // console.log(sortedAnswers, answerTexts);

            const answerCounts = {};
            answerTexts.forEach((answer) => {
                if (answerCounts[answer]) {
                    answerCounts[answer]++;
                } else {
                    answerCounts[answer] = 1;
                }
            });
            const counts = Object.values(answerCounts);
            // console.log(answerCounts, counts);

            // Determine the pattern
            let pattern;

            if (counts.length === 1) {
                // All 5 answers are the same
                pattern = "all_same";
            } else if (counts.length === 2) {
                // Two different answers were chosen
                if (counts.includes(2) && counts.includes(3)) {
                    pattern = "three_same_two_same";
                } else if (counts.includes(1) && counts.includes(4)) {
                    pattern = "four_same_one_different";
                }
            } else if (counts.length === 3) {
                // Three different answers were chosen
                if (counts.includes(3) && counts.filter((count) => count === 1).length === 2) {
                    pattern = "three_same_two_different";
                } else if (counts.filter((count) => count === 2).length === 2 && counts.includes(1)) {
                    pattern = "two_same_two_same_one_different"; // This is the special case we're focusing on
                }
            } else if (counts.length === 4) {
                // Four different answers were chosen
                pattern = "two_same_three_different";
            } else {
                // All 5 answers are different
                // Not possible
                pattern = "all_different";
            }

            let representativeAnswer = findRepresentativeAnswer(sortedAnswers, pattern, answerCounts);

            console.log("The Answer Pattern is: ", pattern);

            localStorage.setItem("representativePrincessName", representativeAnswer);

            localStorage.setItem("sortedAnswerCounts", JSON.stringify(answerCounts));

            const calculatePrincessRate = Object.entries(answerCounts).map(([key, value]) => {
                return {
                    name: key,
                    counts: value,
                    rate: value * 20,
                };
            });
            console.log("The Answer Rate is: ", calculatePrincessRate);
            localStorage.setItem("sortedAnswerRate", JSON.stringify(calculatePrincessRate));
        },
        storeDescription() {
            const princessName = localStorage.getItem("representativePrincessName");
            console.log("The Representative Princess is: ", princessName);

            const desc = getShortDescByName(princessName);
            localStorage.setItem("princessDescription", desc);
        },
        fetchTempResult(state) {
            state.loading = true;
            state.isEmpty = false;
            const princessName = localStorage.getItem("representativePrincessName");
            state.tempQuizResult.representativePrincess = princessName;

            const princessDescription = localStorage.getItem("princessDescription");
            state.tempQuizResult.princessDescription = princessDescription;
        },
        fetchTempResultDone(state, action) {
            state.tempQuizResult.princessImage = action.payload;
            state.loading = false;
        },
        fetchTempResultFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchTempResultEmpty(state, action) {
            state.loading = false;
            state.isEmpty = true;
        },
    },
});

export const {
    initiateQuiz,
    changeQuestion,
    storeAnswers,
    fetchSelectedAnswers,
    analyzeQuizAnswers,
    storeDescription,
    fetchTempResult,
    fetchTempResultDone,
    fetchTempResultFailed,
    fetchTempResultEmpty,
} = questionSlice.actions;
