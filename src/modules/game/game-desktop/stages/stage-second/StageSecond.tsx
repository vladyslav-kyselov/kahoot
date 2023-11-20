import React, {useState} from 'react';
import {QuestionType} from "../../../../../components/card/Card.tsx";
import {Zoom} from "@mui/material";
import './index.scss';

type Props = {
    questions: QuestionType[] | null,
    changeStage: () => void
}
const StageSecond = ({questions, changeStage}: Props) => {
    const [state, setState] = useState(true);

    setTimeout(() => {
        setState(false);
    }, 2500)

    setTimeout(() => {
        console.log('click')
        changeStage();
    }, 2700)
    return (
            <Zoom in={state} className="game__stage-second" timeout={1000}>
                <div>
                    <div className="quantity-question">{questions?.length} Questions.</div>
                    <div className="">Are you ready?</div>
                </div>
            </Zoom>
    );
};

export default StageSecond;
