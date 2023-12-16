import React from 'react';
import StarIcon from "@mui/icons-material/StarBorderOutlined";
import TriangleIcon from "@mui/icons-material/ChangeHistory";
import CircleIcon from "@mui/icons-material/PanoramaFishEye";
import SquareIcon from "@mui/icons-material/CropSquare";

import {onValue, ref, set} from "firebase/database";

import {QuestionType} from "../../../../../../components/card/Card";
import {db} from "../../../../../../firebase/firebase";

type Props = {
    setWaitingState: (state: boolean) => void,
    currentQuestion: QuestionType | null
}

export const StageFourthQuizView = ({currentQuestion, setWaitingState}: Props) => {
    const chooseVariant = (variant: string) => {
        setWaitingState(false);

        const time = sessionStorage.getItem("time");
        const name = sessionStorage.getItem("name");

        const isCorrectedAnswer = currentQuestion?.QUIZ?.correctVariant === variant;
        let streak = 0;
        const winStreakRef = ref(db, `/game/players/${name}/winStreak`);
        onValue(winStreakRef, (snapshot) => {
            const winStreak = snapshot.val();

            if (isCorrectedAnswer) {
                streak = winStreak + 1;
                set(winStreakRef, winStreak + 1);
            } else {
                streak = 0;
                set(winStreakRef, 0);
            }
        }, {onlyOnce: true});

        const lastAnswerAnswerRef = ref(db, `/game/players/${name}/lastAnswer/answer`);
        set(lastAnswerAnswerRef, variant);

        const lastAnswerQuestionIdRef = ref(db, `/game/players/${name}/lastAnswer/questionId`);
        set(lastAnswerQuestionIdRef, currentQuestion?.id);

        if (time && isCorrectedAnswer) {
            const refMyScore = ref(db, `/game/players/${name}/score`);
            onValue(refMyScore, (snapshot) => {
                const data = snapshot.val();
                const winValue = Math.floor((+time / 100 ) * (10 * streak)) + (+time);
                sessionStorage.setItem("lastScore", `${winValue}`);
                set(refMyScore, +data + winValue);
            }, {onlyOnce: true});
        }
    };

    return (
        <>
            <div onClick={() => chooseVariant('A')} className="fourth-stage__icon square-icon">
                <SquareIcon className="icon"/>
            </div>
            <div onClick={() => chooseVariant('B')} className="fourth-stage__icon circle-icon">
                <CircleIcon className="icon"/>
            </div>
            <div onClick={() => chooseVariant('C')} className="fourth-stage__icon triangle-icon">
                <TriangleIcon className="icon"/>
            </div>
            <div onClick={() => chooseVariant('D')} className="fourth-stage__icon star-icon">
                <StarIcon className="icon"/>
            </div>
        </>
    );
};
