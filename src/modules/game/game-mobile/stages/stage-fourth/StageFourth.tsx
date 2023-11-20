import React, {useEffect, useState} from 'react';
import './index.scss';
import SquareIcon from "@mui/icons-material/CropSquare";
import CircleIcon from "@mui/icons-material/PanoramaFishEye";
import TriangleIcon from "@mui/icons-material/ChangeHistory";
import StarIcon from "@mui/icons-material/StarBorderOutlined";
import Typography from "@mui/material/Typography";
import {Zoom} from "@mui/material";
import {QuestionType} from "../../../../../components/card/Card.tsx";
import Countdown from "../../../utils/getScoreForWinner.ts";
import {db} from "../../../../../firebase/firebase.ts";
import {onValue, ref, set} from "firebase/database";

type Props = {
    currentQuestion: QuestionType | null
};

const StageFourth = ({currentQuestion}: Props) => {
    const [waitingState, setWaitingState] = useState(true);
    useEffect(() => {
        if (currentQuestion) {
            const count = new Countdown(null, currentQuestion?.time, () => {
            });
            count.start();
        }
    }, [])

    const chooseVariant = (variant: string) => {
        setWaitingState(false);

        const time = sessionStorage.getItem("time");

        if (time) {
            sessionStorage.setItem("lastScore", time);
        }

        const name = sessionStorage.getItem("name");

        const isCorrectedAnswer = currentQuestion?.correctVariant === variant;

        const lastAnswerAnswerRef = ref(db, `/game/players/${name}/lastAnswer/answer`);
        set(lastAnswerAnswerRef, variant);

        const lastAnswerQuestionIdRef = ref(db, `/game/players/${name}/lastAnswer/questionId`);
        set(lastAnswerQuestionIdRef, currentQuestion?.id);

        if (time && isCorrectedAnswer) {
            const refMyScore = ref(db, `/game/players/${name}/score`);
            onValue(refMyScore, (snapshot) => {
                const data = snapshot.val();
                set(refMyScore, +data + (+time));
            }, {onlyOnce: true});
        }

        const winStreakRef = ref(db, `/game/players/${name}/winStreak`);
        onValue(winStreakRef, (snapshot) => {
            const winStreak = snapshot.val();

            if (isCorrectedAnswer) {
                set(winStreakRef, winStreak + 1);
            } else {
                set(winStreakRef, 0);
            }
        }, {onlyOnce: true});

    };

    return (<div className="fourth-stage">
        {waitingState ? (
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
            ) :
            (<>
                <Zoom in={true} timeout={500}>
                    <div className="fourth-stage__font-wrapper">
                        <Typography variant="h6" gutterBottom className="fourth-stage__font">
                            Waiting for result
                        </Typography>
                    </div>
                </Zoom>
            </>)
        }
    </div>);
};

export default StageFourth;
