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

    const questionMin = +(questionTypeParams?.min || 0);
    const questionMax = +(questionTypeParams?.max || 100);
    const min = questionMin > questionMax ? questionMax : questionMin;
    const max = questionMax < questionMin ? questionMin : questionMax;
    return (
        <>
            <TextField
                size="small"
                className="question__input"
                label="Початкове значення"
                variant="outlined"
                value={questionMin}
                type="number"
                onChange={e => setValue('min', +e.target.value)}
            />

            <TextField
                size="small"
                className="question__input"
                label="Кінцеве значення"
                variant="outlined"
                value={questionMax}
                type="number"
                onChange={e => setValue('max', +e.target.value)}
            />
            <TextField
                size="small"
                className="question__input"
                label="Правильна відповідь"
                variant="outlined"
                value={questionTypeParams?.correctVariant || 0}
                type="number"
                onChange={e => setValue('correctVariant', +e.target.value)}
            />

            <SliderMaterial
                valueLabelDisplay="on"
                step={1}
                defaultValue={+(questionTypeParams?.correctVariant || 0)}
                value={+(questionTypeParams?.correctVariant || 0)}
                marks
                min={min}
                max={max}
                onChange={(_, newValue) => setValue('correctVariant', newValue as number)}
            />

        </>
    );
};

export default Slider;
