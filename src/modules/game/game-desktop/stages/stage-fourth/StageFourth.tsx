import React, {useEffect, useRef, useState} from 'react';
import SquareIcon from "@mui/icons-material/CropSquare";
import CircleIcon from "@mui/icons-material/PanoramaFishEye";
import TriangleIcon from "@mui/icons-material/ChangeHistory";
import StarIcon from "@mui/icons-material/StarBorderOutlined";

import {QuestionType} from "../../../../../components/card/Card.tsx";
import Countdown from "../../../utils/getScoreForWinner.ts";

import './index.scss';
import {User} from "../../../types.ts";
import {onValue, ref} from "firebase/database";
import {db} from "../../../../../firebase/firebase.ts";

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
            count.start();
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
                </div>

                <div className="stage-fourth__img">
                    {currentQuestion?.img && <img src={currentQuestion?.img} alt="image"/>}
                </div>

                <div className="stage-fourth__number-of-question">
                    {answered}
                    <div>
                        Answers
                    </div>
                </div>
            </div>

            <div className="stage-fourth__footer">
                {currentQuestion?.variantA && <div className="first-button">
                    <SquareIcon className="icon"/>
                    {currentQuestion?.variantA}
                </div>}

                {currentQuestion?.variantB && <div className="second-button">
                    <CircleIcon className="icon"/>
                    {currentQuestion?.variantB}
                </div>}

                {currentQuestion?.variantC && <div className="third-button">
                    <TriangleIcon className="icon"/>
                    {currentQuestion?.variantC}
                </div>}

                {currentQuestion?.variantD && <div className="fourth-button">
                    <StarIcon className="icon"/>
                    {currentQuestion?.variantD}
                </div>}
            </div>
        </div>
    );
};

export default StageFourth;
