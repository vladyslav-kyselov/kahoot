import React, {useEffect, useState} from 'react';
import {Button, Slider as SliderMaterial, Zoom} from "@mui/material";
import {onValue, ref} from "firebase/database";

import {QuestionType} from "../../../../../../components/card/Card";
import {db} from "../../../../../../firebase/firebase";
import {User} from "../../../../types";

import './index.scss';

type Props = {
    currentQuestion: QuestionType | null,
    lastQuestion?: QuestionType,
    onClickNextStage: () => void
};

type Accumulator = number[];


export const StageFifthSliderView = ({currentQuestion, lastQuestion, onClickNextStage}: Props) => {
    const [playersAnswered, setPlayersAnswered] = useState<Accumulator>([]);
    useEffect(() => {
        const playersRef = ref(db, `/game/players`);

        onValue(playersRef, (snapshot) => {
            const players = snapshot.val();
            const answers = Object.values(players) as User[];

            const mappedAnswers = answers.length > 0 && answers
                .reduce((acc: Accumulator, player: User) => {
                    const lastAnswer = +player.lastAnswer.answer;

                    // TODO:  set checker
                    if (lastAnswer && currentQuestion?.id === player.lastAnswer.questionId) {
                        return [...acc, lastAnswer];
                    }
                    return acc;
                }, [])
                .filter((item, pos, self) => self.indexOf(item) == pos)
                .filter(i => i !== currentQuestion?.SLIDER?.correctVariant)
                .filter((_: number, index: number) => index < 8);


            const firstChunkAnswers = mappedAnswers && mappedAnswers.length ?
                mappedAnswers.slice(0, mappedAnswers.length / 2) : [];
            const secondChunkAnswers = mappedAnswers && mappedAnswers.length ?
                mappedAnswers.slice(mappedAnswers.length / 2, mappedAnswers.length) : [];


            const correctVariant = currentQuestion?.SLIDER?.correctVariant;

            if (mappedAnswers && correctVariant) {
                setPlayersAnswered([...firstChunkAnswers, correctVariant, ...secondChunkAnswers]);

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
                    <Zoom in={true} timeout={2000}>
                        <div className="slider-wrapper">
                            <SliderMaterial
                                className="slider slider-disabled"
                                valueLabelDisplay="on"
                                value={playersAnswered}
                                min={+(currentQuestion?.SLIDER?.min || 0)}
                                max={+(currentQuestion?.SLIDER?.max || 100)}
                                disabled
                            />
                            <SliderMaterial
                                className="slider slider-active"
                                valueLabelDisplay="on"
                                step={1}
                                defaultValue={[currentQuestion?.SLIDER?.correctVariant || 0]}
                                min={+(currentQuestion?.SLIDER?.min || 0)}
                                max={+(currentQuestion?.SLIDER?.max || 100)}
                                marks
                            />

                        </div>
                    </Zoom>
                </div>
            </div>

        </>
    );
};
