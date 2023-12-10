import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

import './index.scss';
import {useEffect, useState} from "react";
import {CorrectQuizAnswer} from "../../types.ts";
import {QUESTION_TYPE} from "../../constants.ts";

type Props = {
    type: QUESTION_TYPE,
    defaultValue?: CorrectQuizAnswer,
    setCorrectAnswer: (key: string, correctAnswer: CorrectQuizAnswer) => void
};
export default function CustomSelect({defaultValue = 'A', setCorrectAnswer, type}: Props) {
    const [value, setValue] = useState<CorrectQuizAnswer>(defaultValue);

    useEffect(() => {
        if (value !== defaultValue) {
            setValue(defaultValue);
        }
    }, [defaultValue])
    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as CorrectQuizAnswer);
        setCorrectAnswer('correctAnswer', event.target.value as CorrectQuizAnswer);
    };

    return (
        <FormControl fullWidth className="custom-select" size="small">
            <InputLabel id="demo-simple-select-label">Correct Answer</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Correct Answer"
                onChange={handleChange}
            >
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                {type === QUESTION_TYPE.QUIZ &&
                    <div>
                        <MenuItem value="C">C</MenuItem>
                        <MenuItem value="D">D</MenuItem>
                    </div>
                }
            </Select>
        </FormControl>
    );
}
