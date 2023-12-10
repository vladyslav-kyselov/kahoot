import React, {useEffect} from 'react';
import {TextField} from "@mui/material";

import {PuzzleTypes} from "../../../../types.ts";

import './styles.scss';

type Props = {
    questionTypeParams: PuzzleTypes | null,
    setQuestionTypeParams: (questionParams: PuzzleTypes) => void,
};
const Puzzle = (props: Props) => {
    const {questionTypeParams, setQuestionTypeParams} = props;

    useEffect(() => {
        setQuestionTypeParams({
            variantA: questionTypeParams?.variantA || '',
            variantB: questionTypeParams?.variantB || '',
            variantC: questionTypeParams?.variantC || '',
            variantD: questionTypeParams?.variantD || ''
        })
    }, []);

    const setValue = (key: string, value: string) => {
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
                label="Variant  A*"
                variant="outlined"
                value={questionTypeParams?.variantA || ''}
                onChange={e => setValue('variantA', e.target.value)}
            />
            <TextField
                size="small"
                className="question__input"
                label="Variant  B*"
                variant="outlined"
                value={questionTypeParams?.variantB || ''}
                onChange={e => setValue('variantB', e.target.value)}
            />
            <TextField
                size="small"
                className="question__input"
                label="Variant  C*"
                variant="outlined"
                value={questionTypeParams?.variantC || ''}
                onChange={e => setValue('variantC', e.target.value)}
            />
            <TextField
                size="small"
                className="question__input"
                label="Variant  D"
                variant="outlined"
                value={questionTypeParams?.variantD || ''}
                onChange={e => setValue('variantD', e.target.value)}
            />
        </>
    );
};

export default Puzzle;
