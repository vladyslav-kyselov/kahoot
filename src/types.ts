

export type CorrectQuizAnswer = 'A' | 'B' | 'C' | 'D';

export type QuizTypes = {
    variantA?: string,
    variantB?: string,
    variantC?: string,
    variantD?: string,
    correctVariant?: CorrectQuizAnswer
};

export type TrueOrFalseTypes = {
    correctVariant?: string
};
export type TypeAnswerTypes = {
    correctVariant?: string
};
export type SliderTypes = {
    min?: number,
    max?: number,
    correctVariant?: number
};

export type PuzzleType = {
    id: number,
    value: string
};
export type PuzzleTypes = { [key: string]: PuzzleType };

export type AllQuestionVariantsType = QuizTypes | TrueOrFalseTypes | TypeAnswerTypes | SliderTypes | PuzzleTypes;

