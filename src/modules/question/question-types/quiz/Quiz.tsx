import React, {useEffect} from 'react';
import {TextField} from "@mui/material";

import {CustomSelect} from "../../../../components/select";
import {QuizTypes} from "../../../../types.ts";

import './styles.scss';

type Props = {
    questionTypeParams: QuizTypes | null,
    setQuestionTypeParams: (questionParams: QuizTypes) => void,
};
const Quiz = (props: Props) => {
    const {questionTypeParams, setQuestionTypeParams} = props;

    useEffect(() => {
        setQuestionTypeParams({
            variantA: questionTypeParams?.variantA || '',
            variantB: questionTypeParams?.variantB || '',
            variantC: questionTypeParams?.variantC || '',
            variantD: questionTypeParams?.variantD || '',
            correctVariant: questionTypeParams?.correctVariant || 'A'
        })
    }, []);

    const setValue = (key: string, value: string) => {
        setQuestionTypeParams({
            ...questionTypeParams,
            [key]: value
        })
    };

    return (
        <div>
            <TextField
                size="small"
                className="question__input"
                label="Варіант  A*"
                variant="outlined"
                value={questionTypeParams?.variantA || ''}
                onChange={e => setValue('variantA', e.target.value)}
            />
            <TextField
                size="small"
                className="question__input"
                label="Варіант Б*"
                variant="outlined"
                value={questionTypeParams?.variantB || ''}
                onChange={e => setValue('variantB', e.target.value)}
            />
            <TextField
                size="small"
                className="question__input"
                label="Варіант В*"
                variant="outlined"
                value={questionTypeParams?.variantC || ''}
                onChange={e => setValue('variantC', e.target.value)}
            />
            <TextField
                size="small"
                className="question__input"
                label="Варіант Г*"
                variant="outlined"
                value={questionTypeParams?.variantD || ''}
                onChange={e => setValue('variantD', e.target.value)}
            />

            <CustomSelect defaultValue={questionTypeParams?.correctVariant} setCorrectAnswer={setValue}/>
        </div>
    );
};

export default Quiz;
