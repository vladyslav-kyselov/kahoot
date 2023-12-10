

export type CorrectQuizAnswer = 'A' | 'B' | 'C' | 'D';

export type QuizTypes = {
    variantA?: string,
    variantB?: string,
    variantC?: string,
    variantD?: string,
    correctVariant?: CorrectQuizAnswer
};

export type TrueOrFalseTypes = {
    correctVariant?: boolean
};
export type TypeAnswerTypes = {
    correctVariant?: string
};
export type SliderTypes = {
    min?: number,
    max?: number,
    correctVariant?: number
};
export type PuzzleTypes = {
    variantA?: string,
    variantB?: string,
    variantC?: string,
    variantD?: string
};

export type AllQuestionVariantsType = QuizTypes | TrueOrFalseTypes | TypeAnswerTypes | SliderTypes | PuzzleTypes;

