import React, {useEffect, useRef, useState} from 'react';

import {QuestionType} from "../../../../../components/card/Card.tsx";
import Countdown from "../../../utils/getScoreForWinner.ts";

import './index.scss';
import {User} from "../../../types.ts";
import {onValue, ref} from "firebase/database";
import {db} from "../../../../../firebase/firebase.ts";
import {QUESTION_TYPE} from "../../../../../constants.ts";
import {
    StageFourthPuzzleView,
    StageFourthQuizView,
    StageFourthSliderView,
    StageFourthTrueFalseView,
    StageFourthTypeAnswerView
} from "./views";

type Props = {
    changeStage: () => void,
    currentQuestion: QuestionType | null
};
const StageFourth = ({changeStage, currentQuestion}: Props) => {
    const timerRef = useRef(null);
    const [answered, setAnswered] = useState<number>(0);

    useEffect(() => {
        if (timerRef.current && currentQuestion?.time) {
            const count = new Countdown(timerRef.current, currentQuestion.time, () => {
                changeStage();
            });
           // count.start();
        }

        const playersRef = ref(db, `/game/players`);
        onValue(playersRef, (snapshot) => {
            const players = snapshot.val();
            const arrayPlayers = Object.values(players) as User[];

            const answered = arrayPlayers.reduce((acc: number, player: User) => {
                if (player.lastAnswer.questionId === currentQuestion?.id) {
                    return acc + 1;
                }
                return acc;
            }, 0);
            setAnswered(answered);

        });
    }, []);


    return (
        <div className="stage-fourth">
            <div className="stage-fourth__header">
                {currentQuestion?.title}
            </div>

            <div className="stage-fourth__body">
                <div className="stage-fourth__timer">
                    <span ref={timerRef}>{currentQuestion?.time}</span>
                    <div>Час</div>
                </div>

                <div className="stage-fourth__img">
                    {currentQuestion?.img && <img src={currentQuestion?.img} alt="image"/>}
                </div>

                <div className="stage-fourth__number-of-question">
                    <div className="stage-fourth__number-of-question-count">
                        {answered}
                    </div>
                    <div>
                        Відповіло
                    </div>
                </div>
            </div>

            <div className="stage-fourth__footer">
                {currentQuestion?.questionType === QUESTION_TYPE.QUIZ && <StageFourthQuizView currentQuestion={currentQuestion.QUIZ}/>}
                {currentQuestion?.questionType === QUESTION_TYPE.TRUE_OR_FALSE && <StageFourthTrueFalseView/>}
                {currentQuestion?.questionType === QUESTION_TYPE.TYPE_ANSWER && <StageFourthTypeAnswerView/>}
                {currentQuestion?.questionType === QUESTION_TYPE.SLIDER && <StageFourthSliderView currentQuestion={currentQuestion.SLIDER}/>}
                {currentQuestion?.questionType === QUESTION_TYPE.PUZZLE && <StageFourthPuzzleView/>}
            </div>
        </div>
    );
};

export default StageFourth;
