import React, {useEffect, useState} from 'react';
import {onValue, ref} from "firebase/database";
import {Zoom} from "@mui/material";
import Typography from "@mui/material/Typography";
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

import {db} from "../../../../../firebase/firebase.ts";
import {QuestionType} from "../../../../../components/card/Card.tsx";

import './index.scss';

type Answer = {
    questionId: number,
    answer: string
};

type Props = {
    currentQuestion: QuestionType | null
}
const StageFifth = ({currentQuestion}: Props) => {
    const [lastAnswer, setLastAnswer] = useState<Answer | null>(null);
    const [streak, setStreak] = useState<number>(0);
    const [lastScore, setLastScore] = useState(0);

    useEffect(() => {
        const name = sessionStorage.getItem("name");
        const userRef = ref(db, `/game/players/${name}/lastAnswer`);

        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setLastAnswer(data);
            }
        }, {
            onlyOnce: true
        });

        const streakRef = ref(db, `/game/players/${name}/winStreak`);

        onValue(streakRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data !== streak) {
                setStreak(data);
            }
        }, {
            onlyOnce: true
        });

        const lastScore = sessionStorage.getItem("lastScore");
        if (lastScore) {
            setLastScore(+lastScore);
        }

    }, []);


    const condition = lastAnswer?.questionId === currentQuestion?.id && lastAnswer?.answer === currentQuestion?.correctVariant;
    return (
        <div className="stage-fifth">
            {condition ? (
                <div className="stage-fifth__correct">
                    <Zoom in={true} timeout={500}>
                        <div className="correct-answer__wrapper">
                            <Typography variant="h3" gutterBottom className="correct-answer__title">
                                Correct!
                                <br/>
                                (+ {lastScore})
                            </Typography>
                            <CheckIcon className="correct-answer__icon" />

                            <Typography variant="h3" gutterBottom className="correct-answer__streak">
                                Answer streak <span>{streak}</span>
                            </Typography>
                        </div>

                    </Zoom>
                </div>
            ): <div className="stage-fifth__incorrect">
                <Zoom in={true} timeout={500}>
                    <div className="incorrect-answer__wrapper">
                        <Typography variant="h3" gutterBottom className="incorrect-answer__title">
                            Помилка :(
                        </Typography>
                        <DoNotDisturbAltIcon className="incorrect-answer__icon" />

                        <Typography variant="h3" gutterBottom className="incorrect-answer__streak">
                            Ти втратив послідовність перемог.
                        </Typography>
                    </div>

                </Zoom>
            </div>}
        </div>
    );
};

export default StageFifth;
