import React, {useEffect, useState} from 'react';
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";

import {TrueOrFalseTypes} from "../../../../types.ts";

import './styles.scss';

type Props = {
    questionTypeParams: TrueOrFalseTypes | null,
    setQuestionTypeParams: (questionParams: TrueOrFalseTypes) => void,
};
const TrueFalse = (props: Props) => {
    const {questionTypeParams, setQuestionTypeParams} = props;
    const [radioButtonValue, setRadioButtonValue] = useState<string>('A');

    useEffect(() => {
        const correctVariant = questionTypeParams?.correctVariant === undefined ? 'A' : questionTypeParams?.correctVariant;
        setRadioButtonValue(correctVariant);
        setQuestionTypeParams({correctVariant});
    }, []);

    const setValue = (key: string, value: string) => {
        setQuestionTypeParams({
            ...questionTypeParams,
            [key]: value
        });

        setRadioButtonValue(value);
    };

    return (
        <>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={radioButtonValue}
                name="radio-buttons-group"
                onChange={e => setValue('correctVariant', e.target.value)}
            >
                <FormControlLabel value='A' control={<Radio/>} label="Правда"/>
                <FormControlLabel value='B' control={<Radio/>} label="Не правда"/>
            </RadioGroup>
        </>
    );
};

export default TrueFalse;
