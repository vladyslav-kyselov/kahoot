import React from 'react';
import {Button, InputAdornment, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {PuzzleType} from "../../../../types.ts";

import './styles.scss';

type Props = {
    questionTypeParams: PuzzleType[],
    setQuestionTypeParams: (questionParams: PuzzleType[]) => void,
};
const Puzzle = ({questionTypeParams, setQuestionTypeParams}: Props) => {

    const setValue = (value: string, index: number) => {

        const puzzles: PuzzleType[] = [...questionTypeParams];
        if (puzzles[index]) {
            puzzles[index] = {
                ...puzzles[index],
                value
            };
        }

        setQuestionTypeParams(puzzles);
    };

    const addNewTextField = () => {
        const newElement = {
            id: questionTypeParams.length + 1,
            value: ''
        };

        setQuestionTypeParams([...questionTypeParams, newElement]);
    };

    const onDelete = (id: number) => {
        const puzzles = questionTypeParams.filter(item => item.id !== id);
        setQuestionTypeParams(puzzles);
    };

    return (
        <>
            <div className="question__inputs">
                {questionTypeParams.map((item, index) => (
                    <TextField
                        key={item.id}
                        size="small"
                        label={`Елемент ${index + 1}`}
                        placeholder={`Елемент ${index + 1}`}
                        className="question__input"
                        variant="outlined"
                        value={item.value}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <DeleteIcon className="question__delete-icon"  onClick={() => onDelete(item.id)}/>
                            </InputAdornment>,
                        }}
                        onChange={e => setValue(e.target.value, index)}
                        autoFocus
                    />
                ))}
            </div>

            <Button variant="outlined" color="success" onClick={addNewTextField} className="question__add-button">
                Додати елемент
            </Button>
        </>
    );
};

export default Puzzle;
