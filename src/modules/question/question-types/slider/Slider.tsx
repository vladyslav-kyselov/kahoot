import React, {useEffect} from 'react';
import {Slider as SliderMaterial, TextField} from "@mui/material";

import {SliderTypes} from "../../../../types.ts";

import './styles.scss';


type Props = {
    questionTypeParams: SliderTypes | null,
    setQuestionTypeParams: (questionParams: SliderTypes) => void,
};
const Slider = (props: Props) => {
    const {questionTypeParams, setQuestionTypeParams} = props;

    useEffect(() => {
        setQuestionTypeParams({
            min: questionTypeParams?.min || 0,
            max: questionTypeParams?.max || 100,
            correctVariant: questionTypeParams?.correctVariant || 0
        })
    }, []);

    const setValue = (key: string, value: number) => {
        setQuestionTypeParams({
            ...questionTypeParams,
            [key]: value
        })
    };

    return (
        <>
            <TextField
                size="small"
                className="question__input"
                label="Start value"
                variant="outlined"
                value={questionTypeParams?.min || 0}
                type="number"
                onChange={e => setValue('min', +e.target.value)}
            />

            <TextField
                size="small"
                className="question__input"
                label="End value"
                variant="outlined"
                value={questionTypeParams?.max || 100}
                type="number"
                onChange={e => setValue('max', +e.target.value)}
            />
            <TextField
                size="small"
                className="question__input"
                label="Answer"
                variant="outlined"
                value={questionTypeParams?.correctVariant || 0}
                type="number"
                onChange={e => setValue('correctVariant', +e.target.value)}
            />

            <SliderMaterial
                aria-label="Temperature"
                valueLabelDisplay="on"
                step={1}
                defaultValue={+(questionTypeParams?.correctVariant || 0)}
                value={+(questionTypeParams?.correctVariant || 0)}
                marks
                min={+(questionTypeParams?.min || 0)}
                max={+(questionTypeParams?.max || 100)}
                onChange={(_, newValue) => setValue('correctVariant', newValue as number)}
            />

        </>
    );
};

export default Slider;
