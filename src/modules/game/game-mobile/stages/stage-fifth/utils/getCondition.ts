import {QuestionType} from "../../../../../../components/card/Card";
import {QUESTION_TYPE} from "../../../../../../constants";
import {Answer} from "../StageFifth";
import {PuzzleType} from "../../../../../../types";

export const getCondition = (lastAnswer: Answer | null, currentQuestion: QuestionType | null) => {
    const isCurrentQuestion = lastAnswer?.questionId === currentQuestion?.id;
    switch (currentQuestion?.questionType) {
        case QUESTION_TYPE.QUIZ: {
            return isCurrentQuestion && lastAnswer?.answer === currentQuestion?.QUIZ?.correctVariant;
        }
        case QUESTION_TYPE.TRUE_OR_FALSE: {
            return isCurrentQuestion && lastAnswer?.answer === currentQuestion?.TRUE_OR_FALSE?.correctVariant;
        }
        case QUESTION_TYPE.TYPE_ANSWER: {
            const answer = lastAnswer?.answer as string;
            const equalAnswers = answer.toLowerCase() === currentQuestion?.TYPE_ANSWER?.correctVariant?.toLowerCase();
            return isCurrentQuestion && equalAnswers;
        }
        case QUESTION_TYPE.SLIDER: {
            return isCurrentQuestion && lastAnswer?.answer === currentQuestion?.SLIDER?.correctVariant;
        }
        case QUESTION_TYPE.PUZZLE: {
            let countOfCorrectAnswers = 0;
            const lastAnswerPuzzle = lastAnswer?.answer as PuzzleType[];
            const currentQuestionPuzzle = currentQuestion?.PUZZLE;


            lastAnswerPuzzle?.length && lastAnswerPuzzle[0] && [...lastAnswerPuzzle].forEach((item, index) => {
                if (item?.id === currentQuestionPuzzle?.[index]?.id) {
                    countOfCorrectAnswers++;
                }
            })
            return countOfCorrectAnswers > 0;
        }
        default:
            return false;
    }
}
