import * as React from 'react';
import {useEffect, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

import './index.scss';
import {CorrectQuizAnswer} from "../../types.ts";

type Props = {
    defaultValue?: CorrectQuizAnswer,
    setCorrectAnswer: (key: string, correctAnswer: CorrectQuizAnswer) => void
};
export default function CustomSelect({defaultValue = 'A', setCorrectAnswer}: Props) {
    const [value, setValue] = useState<CorrectQuizAnswer>(defaultValue);

    useEffect(() => {
        if (value !== defaultValue) {
            setValue(defaultValue);
        }
    }, [defaultValue])


    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as CorrectQuizAnswer);
        setCorrectAnswer('correctVariant', event.target.value as CorrectQuizAnswer);
    };

    return (
        <FormControl fullWidth className="custom-select" size="small">
            <InputLabel id="demo-simple-select-label">Правильна відповідь</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Правильна відповідь"
                onChange={handleChange}
            >
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">Б</MenuItem>
                <MenuItem value="C">В</MenuItem>
                <MenuItem value="D">Г</MenuItem>
            </Select>
        </FormControl>
    );
}
