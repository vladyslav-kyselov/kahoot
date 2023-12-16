import React, {useEffect} from 'react';
import {TextField} from "@mui/material";

import {TypeAnswerTypes} from "../../../../types.ts";

import './styles.scss';

type Props = {
    questionTypeParams: TypeAnswerTypes | null,
    setQuestionTypeParams: (questionParams: TypeAnswerTypes) => void,
};
const TypeAnswer = (props: Props) => {
    const {questionTypeParams, setQuestionTypeParams} = props;

    useEffect(() => {
        setQuestionTypeParams({
            correctVariant: questionTypeParams?.correctVariant || ''
        })
    }, []);

    const setValue = (key: string, value: string) => {
        setQuestionTypeParams({
            ...questionTypeParams,
            [key]: value
        })
    };

    return (
        <TextField
            size="small"
            className="question__input"
            label="Правильна відповідь*"
            variant="outlined"
            value={questionTypeParams?.correctVariant || ''}
            onChange={e => setValue('correctVariant', e.target.value)}
        />
    );
};

export default TypeAnswer;
