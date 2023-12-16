import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import './styles.scss';
import {QUESTION_TYPE} from "../../constants.ts";

type Props = {
    questionType: QUESTION_TYPE | null,
    setQuestionType: (type: QUESTION_TYPE) => void
}

export default function QuestionVariant(props: Props) {
    const {questionType, setQuestionType} = props;
    const handleChange = (event: SelectChangeEvent) => {
        setQuestionType(event.target.value as QUESTION_TYPE);
    };

    return (
        <FormControl fullWidth size="small" className="question-type-select">
            <InputLabel id="demo-select-small-label">Тип запитання</InputLabel>
            <Select
                className="question-type-select__select"
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={questionType || ''}
                label="Тип запитання"
                onChange={handleChange}
            >
                <MenuItem value={QUESTION_TYPE.QUIZ} className="question-type-select__item">
                    <img className="question-type-select__img" src="/abcd.png" alt="Quiz" height={50} width={50}/>
                    Quiz
                </MenuItem>
                <MenuItem value={QUESTION_TYPE.TRUE_OR_FALSE} className="question-type-select__item">
                    <img className="question-type-select__img" src="/boolean.png" alt="true/false" height={50} width={50}/>
                    True or False
                </MenuItem>
                <MenuItem value={QUESTION_TYPE.TYPE_ANSWER} className="question-type-select__item">
                    <img className="question-type-select__img" src="/any-value.png" alt="type answer" height={50} width={50}/>
                    Type answer
                </MenuItem>
                <MenuItem value={QUESTION_TYPE.SLIDER} className="question-type-select__item">
                    <img className="question-type-select__img" src="/percentage.png" alt="Slider" height={50} width={40}/>
                    Slider
                </MenuItem>
                <MenuItem value={QUESTION_TYPE.PUZZLE} className="question-type-select__item">
                    <img className="question-type-select__img puzzle" src="/drug-and-drop.png" alt="Puzzle" height={50} width={50}/>
                    Puzzle
                </MenuItem>
            </Select>
        </FormControl>
    );
}
