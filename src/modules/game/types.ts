export type User = {
    name: string,
    score: number,
    winStreak: number,
    lastAnswer: {
        answer: string,
        questionId: number,
        winStreak: number
    }
};
