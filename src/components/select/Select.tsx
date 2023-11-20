import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

import './index.scss';
import {useEffect, useState} from "react";

export type CorrectAnswers = 'A' | 'B' | 'C' | 'D';

type Props = {
    defaultValue: CorrectAnswers,
    setCorrectAnswer: (correctAnswer: CorrectAnswers) => void
};
export default function CustomSelect({defaultValue, setCorrectAnswer}: Props) {
    const [value, setValue] = useState<CorrectAnswers>(defaultValue);

    useEffect(() => {
        if (value !== defaultValue) {
            setValue(defaultValue);
        }
    }, [defaultValue])
    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as CorrectAnswers);
        setCorrectAnswer(event.target.value as CorrectAnswers);
    };

    return (
        <FormControl fullWidth className="custom-select">
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
                <MenuItem value="C">C</MenuItem>
                <MenuItem value="D">D</MenuItem>
            </Select>
        </FormControl>
    );
}
