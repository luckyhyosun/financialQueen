const qnaPairs = [
    {
        question: ["How do you", "handle money?"],
        answers: [
            { label: "Tiana", answerText: "I budget carefully and work hard to build wealth." },
            {
                label: "Moana",
                answerText: "I spend on experiences, not things.",
            },
            {
                label: "Ariel",
                answerText: "I can't resist luxury. I love looking fabulous!",
            },
            {
                label: "Elsa",
                answerText: "I don't worry much about money. It always works out.",
            },
        ],
    },
    {
        question: ["What's your biggest", "financial weakness?"],
        answers: [
            {
                label: "Tiana",
                answerText: "I prefer saving, but I rarely treat myself.",
            },
            {
                label: "Moana",
                answerText: "I spend too much on helping others.",
            },
            {
                label: "Ariel",
                answerText: "I get tempted by shiny, expensive things.",
            },
            {
                label: "Elsa",
                answerText: "I take big risks, sometimes they pay off, sometimes they don't.",
            },
        ],
    },
    {
        question: ["What's your", "dream financial goal? "],
        answers: [
            {
                label: "Tiana",
                answerText: "Owning a thriving business and being independent.",
            },
            {
                label: "Moana",
                answerText: "Traveling the world, money isn't my priority.",
            },
            {
                label: "Ariel",
                answerText: "Living in luxury with everything I desire.",
            },
            {
                label: "Elsa",
                answerText: "Having just enough to be comfortable and free.",
            },
        ],
    },
    {
        question: ["If you win the lottery,", "what would you do? "],
        answers: [
            {
                label: "Tiana",
                answerText: "Invest it or start a new project.",
            },
            {
                label: "Moana",
                answerText: "Go on a spontaneous trip!",
            },
            {
                label: "Ariel",
                answerText: "Buy a designer outfit or something glamorous.",
            },
            {
                label: "Elsa",
                answerText: "Give some away and save the rest.",
            },
        ],
    },
    {
        question: ["How do you feel about", "financial security? "],
        answers: [
            {
                label: "Tiana",
                answerText: "I need to be in control of my future.",
            },
            {
                label: "Moana",
                answerText: "Nice to have, but freedom matters more.",
            },
            {
                label: "Ariel",
                answerText: "I prefer to enjoy life, even if it means spending.",
            },
            {
                label: "Elsa",
                answerText: "I trust that things will always work out.",
            },
        ],
    },
];

export function getQnaPair(id) {
    const qnaPair = qnaPairs[id];
    const shuffledAnswers = qnaPair.answers
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    
    return {
        question: qnaPair?.question || ["", ""],
        answers: shuffledAnswers || [],
    };
}

export function findRepresentativeAnswer(sortedAnswers, pattern, answerCounts) {
    // For the 2-2-1 pattern, we need special analysis
    if (pattern === "two_same_two_same_one_different") {
        // First check important questions (1, 3, 5, and 4 if needed)
        const importantAnalysis = analyzeImportantQuestions(sortedAnswers);

        // If we have a majority from primary questions (1,3,5)
        if (importantAnalysis.majority) {
            // If Q4 matched with one of the primary questions, use that answer
            if (importantAnalysis.matchingPrimaryQuestion) {
                console.log(
                    `Q4 matched with Q${importantAnalysis.matchingPrimaryQuestion}, using answer: ${importantAnalysis.dominantAnswer}`
                );
            }
            return importantAnalysis.dominantAnswer;
        }

        // If no clear winner from important questions, fall back to most frequent overall
        const mostFrequent = Object.entries(answerCounts)
            .sort((a, b) => b[1] - a[1])
            .map((entry) => entry[0])[0];

        return mostFrequent;
    }

    // For other patterns, simply return the most frequent answer
    return Object.entries(answerCounts)
        .sort((a, b) => b[1] - a[1])
        .map((entry) => entry[0])[0];
}

export function analyzeImportantQuestions(sortedAnswers) {
    const primaryImportantAnswers = [
        sortedAnswers.find((a) => a.id === 0)?.label,
        sortedAnswers.find((a) => a.id === 2)?.label,
        sortedAnswers.find((a) => a.id === 4)?.label,
    ].filter(Boolean);
    const question4Answer = sortedAnswers.find((a) => a.id === 3)?.label;
    // console.log(primaryImportantAnswers, question4Answer);

    const primaryCounts = {};
    primaryImportantAnswers.forEach((answer) => {
        if (primaryCounts[answer]) {
            primaryCounts[answer]++;
        } else {
            primaryCounts[answer] = 1;
        }
    });

    let highestCount = 0;
    let dominantAnswer = null;
    for (const [answer, count] of Object.entries(primaryCounts)) {
        if (count > highestCount) {
            highestCount = count;
            dominantAnswer = answer;
        }
    }

    let hasMajority = highestCount >= 2;
    let matchingPrimaryQuestion = null;

    // If we don't have a majority, include question 4 in our analysis
    if (!hasMajority && question4Answer) {
        // Check if question 4's answer matches any of our primary questions
        for (const [index, answer] of primaryImportantAnswers.entries()) {
            if (answer === question4Answer) {
                // We found a match with question 4
                dominantAnswer = answer;
                hasMajority = true;
                // Map index back to question number (0 → Q1, 1 → Q3, 2 → Q5)
                const matchingQuestionNumber = [1, 3, 5][index];
                matchingPrimaryQuestion = matchingQuestionNumber;
                break;
            }
        }
    }

    return {
        primaryImportantAnswers: primaryImportantAnswers,
        question4Answer,
        primaryCounts,
        dominantAnswer,
        unanimous: highestCount === 3, // All 3 primary questions have the same answer
        majority: hasMajority, // At least 2 questions have the same answer (including Q4 if needed)
        isQuestion4Included: !hasMajority && question4Answer !== null,
        matchingPrimaryQuestion: matchingPrimaryQuestion, // Indicates which primary question Q4 matched with
        finalCombination: hasMajority ? null : question4Answer, // If no majority, fallback to Q4's answer
    };
}

const riskDescByName = [
    {
        name: "Tiana",
        shortDesc: "Patient, Long-term thinker with high need for control",
        longDesc:
            "Like Princess Tiana, you're hardworking and disciplined about money. You value financial independence and security, carefully planning for the future. Your patience and long-term perspective help you build wealth steadily, though you might sometimes need to remember to enjoy the present.",
        riskAnalysis: "Not Experience-oriented",
        riskDescription: "You may tend to prioritize future security over present enjoyment.",
    },
    {
        name: "Moana",
        shortDesc: "Balanced optimist with moderate risk tolerance",
        longDesc:
            "Like Moana, you seek balance in your financial life. You're willing to take calculated risks for meaningful experiences and believe in finding your own path. You're neither reckless nor overly cautious, valuing freedom and new horizons over pure wealth accumulation.",
        riskAnalysis: "Inconsistent financial focus",
        riskDescription: "You may struggle with sticking to a single long-term financial plan or investment strategy.",
    },
    {
        name: "Ariel",
        shortDesc: "Impulsive with short-term focus",
        longDesc:
            "Like Ariel, you're drawn to novelty and immediate gratification. Your impulsive nature makes you spontaneous with money—quick to spend on things that catch your eye. While this brings excitement, it can sometimes lead to financial challenges when you act without considering long-term consequences.",
        riskAnalysis: "Not Disciplined",
        riskDescription:
            "You may have significant challenges with financial self-control and a tendency toward emotional spending.",
    },
    {
        name: "Elsa",
        shortDesc: "Optimistic with low need for control",
        longDesc:
            "Like Elsa, you have a more relaxed attitude toward money, believing things will work out. You're comfortable with uncertainty and don't feel the need to micromanage your finances. This positive attitude helps you stay calm when the market goes up and down, though sometimes more active planning could benefit you.",
        riskAnalysis: "Neglecting detail",
        riskDescription: "You might overlook important financial warning signs.",
    },
];

function findItemByNameACB(name) {
    return function compareItemByNameACB(item) {
        return item.name === name;
    };
}

export function getDescByName(name) {
    const riskDesc = riskDescByName.find(findItemByNameACB(name));
    return {
        shortDesc: riskDesc?.shortDesc || "",
        longDesc: riskDesc?.longDesc || "",
    };
}

export function getShortDescByName(name) {
    const desc = getDescByName(name);
    return desc.shortDesc;
}

function getRiskByName(name) {
    const riskDesc = riskDescByName.find(findItemByNameACB(name));
    return {
        name: name,
        riskAnalysis: riskDesc?.riskAnalysis || "",
        riskDescription: riskDesc?.riskDescription || "",
    };
}

export function mapRiskByNames(names) {
    return [...names].map(getRiskByName);
}
