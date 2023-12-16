import React from 'react';
import {Button, Paper, Zoom} from "@mui/material";

import {QuestionType} from "../../../../../../components/card/Card";

import './index.scss';

type Props = {
    currentQuestion: QuestionType | null,
    lastQuestion?: QuestionType,
    onClickNextStage: () => void
};


export const StageFifthPuzzleView = ({currentQuestion, lastQuestion, onClickNextStage}: Props) => {
    return (
        <div className="stage-fifth__body">
            <Button variant="outlined" color="success" onClick={onClickNextStage}
                    className="stage-fourth__next-button">
                {currentQuestion?.id !== lastQuestion?.id ? 'Далі' : 'Результати'}
            </Button>

            <div className="stage-fourth__img stage-fifth__puzzle">
                {
                    currentQuestion?.PUZZLE ? Object.values(currentQuestion?.PUZZLE).map(({value}, index) => (
                        <Zoom in={true} timeout={2000 * (index + 1)}>
                            <Paper elevation={3} className="stage-fifth__puzzle-element">
                                {value}
                            </Paper>
                        </Zoom>
                    )) : null
                }
            </div>
        </div>
    );
};
