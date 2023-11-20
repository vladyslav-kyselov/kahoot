import React, {useState} from 'react';
import {Zoom} from "@mui/material";
import {QuestionType} from "../../../../../components/card/Card.tsx";
import './index.scss';
import {Progress} from "../../../../../components/progress";

type Props = {
    changeStage: () => void,
    currentQuestion: QuestionType | null
}
const StageThird = ({changeStage, currentQuestion}: Props) => {
    const [state, setState] = useState(true);

    setTimeout(() => {
        setState(false);
    }, 5000);
    setTimeout(() => {
        changeStage();
    }, 5500);

    return (
        <div>
            <Zoom in={state} className="game__stage-second" timeout={1000}>
                <div>
                    {currentQuestion?.title}
                </div>
            </Zoom>
            <Progress/>
        </div>
    );
};

export default StageThird;
