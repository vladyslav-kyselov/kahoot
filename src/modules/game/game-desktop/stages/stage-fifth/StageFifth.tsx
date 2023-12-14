import React from 'react';

import {QuestionType} from "../../../../../components/card/Card.tsx";
import {QUESTION_TYPE} from "../../../../../constants.ts";
import {
    StageFifthPuzzleView,
    StageFifthQuizView,
    StageFifthSliderView,
    StageFifthTrueFalseView,
    StageFifthTypeAnswerView
} from "./views";

import './index.scss';

type Props = {
    changeStage: () => void,
    currentQuestion: QuestionType | null,
    lastQuestion?: QuestionType
};


const StageFifth = ({changeStage, currentQuestion, lastQuestion}: Props) => {

    const onClick = () => {
        changeStage();
    };

    return (
        <div className="stage-fourth stage-fifth">
            <div className="stage-fourth__header">
                {currentQuestion?.title}
            </div>

            {currentQuestion?.questionType === QUESTION_TYPE.QUIZ &&
                <StageFifthQuizView
                    currentQuestion={currentQuestion}
                    lastQuestion={lastQuestion}
                    onClickNextStage={onClick}
                />
            }
            {currentQuestion?.questionType === QUESTION_TYPE.TRUE_OR_FALSE &&
                <StageFifthTrueFalseView
                    currentQuestion={currentQuestion}
                    lastQuestion={lastQuestion}
                    onClickNextStage={onClick}
                />
            }
            {currentQuestion?.questionType === QUESTION_TYPE.TYPE_ANSWER &&
                <StageFifthTypeAnswerView
                    currentQuestion={currentQuestion}
                    lastQuestion={lastQuestion}
                    onClickNextStage={onClick}
                />
            }
            {currentQuestion?.questionType === QUESTION_TYPE.SLIDER &&
                <StageFifthSliderView
                    currentQuestion={currentQuestion}
                    lastQuestion={lastQuestion}
                    onClickNextStage={onClick}
                />
            }
            {currentQuestion?.questionType === QUESTION_TYPE.PUZZLE &&
                <StageFifthPuzzleView
                    currentQuestion={currentQuestion}
                    lastQuestion={lastQuestion}
                    onClickNextStage={onClick}
                />
            }
        </div>
    );
};

export default StageFifth;
