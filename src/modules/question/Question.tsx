import React, {useEffect, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Button, TextField} from "@mui/material";
import {CustomSelect} from "../../components/select";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './index.scss';
import {ref, set} from "firebase/database";
import {db} from "../../firebase/firebase.ts";
import {useLocation} from "react-router-dom";
import {CorrectAnswers} from "../../components/select/Select.tsx";
import {QuestionType} from "../../components/card/Card.tsx";
import Confirmation from "../../components/confirmation/Confirmation.tsx";

type Props = QuestionType;

const Question = (props: Props) => {
    const location = useLocation();
    const [expanded, setExpanded] = useState(false);
    const [title, setTitle] = useState('');
    const [time, setTime] = useState<number>(10);
    const [img, setUrl] = useState('');
    const [variantA, setVarA] = useState('');
    const [variantB, setVarB] = useState('');
    const [variantC, setVarC] = useState('');
    const [variantD, setVarD] = useState('');
    const [correctVariant, setCorrectAnswer] = useState<CorrectAnswers>('A');

    useEffect(() => {
        setTitle(props.title);
        setUrl(props.img || '');
        setVarA(props.variantA || '');
        setVarB(props.variantB || '');
        setVarC(props.variantC || '');
        setVarD(props.variantD || '');
        setCorrectAnswer(props.correctVariant);
        console.log(props.correctVariant, '!!!');
        setExpanded(props.isNew || false);

        setTime(props.time || 10)
    }, []);


    const onSave = () => {
        const refQuestions = ref(db, '/quizzes/' + location?.state?.quizId + '/questions/' + props.id);
        if (!title || !variantA || !variantB) {
            alert('Please fill all required fields');
            return;
        }

        const newQuestion = {
            id: props.id,
            title,
            time,
            img,
            variantA,
            variantB,
            variantC,
            variantD,
            correctVariant
        };
        set(refQuestions, newQuestion);
        setExpanded(false);
    };

    const onDelete = () => {
        const refQuestions = ref(db, '/quizzes/' + location?.state?.quizId + '/questions/' + props.id);
        set(refQuestions, null);
    };

    return (
        <div className="question">
            <Accordion expanded={expanded}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    onClick={() => setExpanded(!expanded)}
                >
                    <Typography>{props.isNew && !title ? 'New Question' : title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        className="question__input" label="Title*"
                        variant="outlined"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <TextField
                        className="question__input"
                        label="Image Link"
                        variant="outlined"
                        value={img}
                        onChange={e => setUrl(e.target.value)}
                    />

                    <TextField
                        className="question__input"
                        label="Variant  A*"
                        variant="outlined"
                        value={variantA}
                        onChange={e => setVarA(e.target.value)}
                    />
                    <TextField
                        className="question__input"
                        label="Variant  B*"
                        variant="outlined"
                        value={variantB}
                        onChange={e => setVarB(e.target.value)}
                    />
                    <TextField
                        className="question__input"
                        label="Variant  C"
                        variant="outlined"
                        value={variantC}
                        onChange={e => setVarC(e.target.value)}
                    />
                    <TextField
                        className="question__input"
                        label="Variant  D"
                        variant="outlined"
                        value={variantD}
                        onChange={e => setVarD(e.target.value)}
                    />

                    <TextField
                        className="question__input"
                        label="Time for question"
                        variant="outlined"
                        value={time}
                        type="number"
                        onChange={e => setTime(+e.target.value)}
                    />

                    <CustomSelect defaultValue={correctVariant} setCorrectAnswer={setCorrectAnswer}/>

                    <div className="question__action-button">
                        <Button variant="outlined" color="success" onClick={onSave}>
                            Save
                        </Button>

                        <Confirmation buttonHandler={onDelete} variant="outlined"/>

                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default Question;
