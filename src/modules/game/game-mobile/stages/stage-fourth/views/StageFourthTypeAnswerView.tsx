import React, {useState} from 'react';

import {onValue, ref, set} from "firebase/database";

import {QuestionType} from "../../../../../../components/card/Card";
import {db} from "../../../../../../firebase/firebase";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

import './index.scss';

type Props = {
    setWaitingState: (state: boolean) => void,
    currentQuestion: QuestionType | null
}

export const StageFourthTypeAnswerView = ({currentQuestion, setWaitingState}: Props) => {
    const [value, setValue] = useState('');

    const chooseVariant = (variant: string) => {
        setWaitingState(false);

        const time = sessionStorage.getItem("time");
        const name = sessionStorage.getItem("name");

        const correctVariant = currentQuestion?.TYPE_ANSWER?.correctVariant || '';
        const isCorrectedAnswer = correctVariant.toLowerCase() === variant.toLowerCase();
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
                const winValue = Math.floor((+time / 100) * (10 * streak)) + (+time);
                sessionStorage.setItem("lastScore", `${winValue}`);
                set(refMyScore, +data + winValue);
            }, {onlyOnce: true});
        }
    };

    const onSave = () => {
        chooseVariant(value);
    }

    return (
        <div className="stage-fourth__type-answer-view-mobile">
            <TextField
                className="stage-fourth__type-answer-view-mobile-input"
                label="Ваша відповідь"
                variant="outlined"
                value={value}
                onChange={e => setValue(e.currentTarget.value)}
            />
            <Button variant="contained" onClick={onSave} className="stage-fourth__type-answer-view-mobile-button">
                Зберегти
            </Button>
        </div>
    );
};
