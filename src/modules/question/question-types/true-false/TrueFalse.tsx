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
    const [radioButtonValue, setRadioButtonValue] = useState<boolean>(true);

    useEffect(() => {
        const correctVariant = questionTypeParams?.correctVariant === undefined ? true : questionTypeParams?.correctVariant;
        setRadioButtonValue(correctVariant);
        setQuestionTypeParams({correctVariant});
    }, []);

    const setValue = (key: string, value: boolean) => {
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
                onChange={e => setValue('correctVariant', e.target.value === 'true')}
            >
                <FormControlLabel value={true} control={<Radio/>} label="True"/>
                <FormControlLabel value={false} control={<Radio/>} label="False"/>
            </RadioGroup>
        </>
    );
};

export default TrueFalse;
