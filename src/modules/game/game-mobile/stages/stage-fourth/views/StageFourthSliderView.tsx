import React, {useState} from 'react';

import {onValue, ref, set} from "firebase/database";

import {QuestionType} from "../../../../../../components/card/Card";
import {db} from "../../../../../../firebase/firebase";
import {Slider as SliderMaterial} from "@mui/material";
import Button from "@mui/material/Button";

import './index.scss';

type Props = {
    setWaitingState: (state: boolean) => void,
    currentQuestion: QuestionType | null
}

export const StageFourthSliderView = ({currentQuestion, setWaitingState}: Props) => {
    const [value, setValue] = useState(+(currentQuestion?.SLIDER?.min || 0));

    const chooseVariant = (variant: number) => {
        setWaitingState(false);

        const time = sessionStorage.getItem("time");
        const name = sessionStorage.getItem("name");

        const isCorrectedAnswer = currentQuestion?.SLIDER?.correctVariant === variant;
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
            <SliderMaterial
                valueLabelDisplay="on"
                step={1}
                value={value}
                marks
                min={+(currentQuestion?.SLIDER?.min || 0)}
                max={+(currentQuestion?.SLIDER?.max || 100)}
                onChange={(_, newValue) => setValue(newValue as number)}
            />
            <Button variant="contained" onClick={onSave} className="stage-fourth__type-answer-view-mobile-button">
                Зберегти
            </Button>
        </div>
    );
};
