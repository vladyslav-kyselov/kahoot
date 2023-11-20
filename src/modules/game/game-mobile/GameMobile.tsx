import React, {useEffect, useState} from 'react';
import {onChildChanged, onValue, ref} from "firebase/database";
import {db} from "../../../firebase/firebase.ts";
import './index.scss';
import {STAGE} from "../constants.ts";
import {StageFifth, StageFirst, StageSecond, StageSeventh,StageFourth, StageSixth, StageThird} from "./stages";
import {QuestionType} from "../../../components/card/Card.tsx";

type Props = {
    stage: string,
    currentQuestion: QuestionType | null
}
const GameMobile = ({stage, currentQuestion}: Props) => {
    const [startedGame, setStartedGame] = useState(true);

    useEffect(() => {
        onValue(ref(db, '/game/startedGame'), (snapshot) => {
            const data = snapshot.val();
            if (data && !startedGame) {
                setStartedGame(true);
            }
        });
    }, []);

    const startedGameRef = ref(db, '/game');
    onChildChanged(startedGameRef, (snapshot) => {
        const data = snapshot.val();
        if (typeof data === 'boolean' && data && !startedGame) {
            setStartedGame(true);
        }
    });

    return (
        <div className="mobile-wrapper-game">
            {stage === STAGE.START && <StageFirst/>}
            {stage === STAGE.PREVIEW_QUIZ && <StageSecond/>}
            {stage === STAGE.PREVIEW_QUESTION && <StageThird currentQuestion={currentQuestion}/>}
            {stage === STAGE.QUESTION_AND_ANSWER && <StageFourth currentQuestion={currentQuestion} />}
            {stage === STAGE.RESULT && <StageFifth currentQuestion={currentQuestion} />}
            {stage === STAGE.SCORE_RESULT && <StageSixth/>}
            {stage === STAGE.FINISH && <StageSeventh/>}

        </div>
    );
};

export default GameMobile;
