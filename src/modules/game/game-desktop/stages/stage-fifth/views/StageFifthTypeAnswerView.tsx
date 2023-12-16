import React, {useEffect, useState} from 'react';
import {Button, TextField, Zoom} from "@mui/material";
import {onValue, ref} from "firebase/database";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import {QuestionType} from "../../../../../../components/card/Card";
import {db} from "../../../../../../firebase/firebase";
import {User} from "../../../../types";

import './index.scss';

type Props = {
    currentQuestion: QuestionType | null,
    lastQuestion?: QuestionType,
    onClickNextStage: () => void
};

type Accumulator = string[];


export const StageFifthTypeAnswerView = ({currentQuestion, lastQuestion, onClickNextStage}: Props) => {
    const [playersAnswered, setPlayersAnswered] = useState<Accumulator>([]);
    useEffect(() => {
        const playersRef = ref(db, `/game/players`);

        onValue(playersRef, (snapshot) => {
            const players = snapshot.val();
            const answers = Object.values(players) as User[];

            const mappedAnswers = answers.length > 0 && answers
                .reduce((acc: Accumulator, player: User) => {
                    const lastAnswer = player.lastAnswer.answer as string;

                    if (lastAnswer && currentQuestion?.id === player.lastAnswer.questionId) {
                        return [...acc, lastAnswer];
                    }
                    return acc;
                }, [])
                .filter((item, pos, self) => self.indexOf(item) == pos)
                .filter(i => i !== currentQuestion?.TYPE_ANSWER?.correctVariant)
                .filter((_: string, index: number) => index < 8);


            const firstChunkAnswers = mappedAnswers && mappedAnswers.length ?
                mappedAnswers.slice(0, mappedAnswers.length / 2) : [];
            const secondChunkAnswers = mappedAnswers && mappedAnswers.length ?
                mappedAnswers.slice(mappedAnswers.length / 2, mappedAnswers.length) : [];

            if (mappedAnswers) {
                setPlayersAnswered([...firstChunkAnswers, `${currentQuestion?.TYPE_ANSWER?.correctVariant}`, ...secondChunkAnswers]);

            }
        }, {onlyOnce: true});
    }, []);


    return (
        <>
            <div className="stage-fifth__body">
                <Button variant="outlined" color="success" onClick={onClickNextStage}
                        className="stage-fourth__next-button">
                    {currentQuestion?.id !== lastQuestion?.id ? 'Далі' : 'Результати'}
                </Button>

                <div className="stage-fourth__img stage-fifth__type-answer">
                    {playersAnswered.map((answer) => (
                        <Zoom in={true} timeout={
                            answer === currentQuestion?.TYPE_ANSWER?.correctVariant ? 4000 : 2000
                        }>
                            <div className="stage-fifth__answer-wrapper">
                                <TextField
                                    value={answer}
                                    className={`stage-fifth__answer 
                                ${answer === currentQuestion?.TYPE_ANSWER?.correctVariant ?
                                        'stage-fifth__answer_true' :
                                        'stage-fifth__answer_wrong'}`
                                    }
                                    variant="outlined"
                                    color="success"
                                    size={answer === currentQuestion?.TYPE_ANSWER?.correctVariant ? 'medium' : 'small'}
                                    focused={answer === currentQuestion?.TYPE_ANSWER?.correctVariant}
                                    disabled={!(answer === currentQuestion?.TYPE_ANSWER?.correctVariant)}
                                />
                                {
                                    answer === currentQuestion?.TYPE_ANSWER?.correctVariant ?
                                        <CheckIcon color="success" className="stage-fifth__answer-icon"/>
                                        : <CloseIcon color="disabled" className="stage-fifth__answer-wrong-icon"/>
                                }
                            </div>
                        </Zoom>
                    ))}

                </div>
            </div>

        </>
    );
};
