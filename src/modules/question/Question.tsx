import React, {useEffect, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Button, TextField} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from "@mui/material/Typography";

import {ref, set} from "firebase/database";
import {db} from "../../firebase/firebase.ts";
import {useLocation} from "react-router-dom";
import {QuestionType} from "../../components/card/Card.tsx";
import Confirmation from "../../components/confirmation/Confirmation.tsx";
import {QuestionVariant} from '../../components/question-type-select'
import {QUESTION_TYPE} from "../../constants.ts";
import {QuizType} from "./question-types/quiz";
import {TrueFalse} from "./question-types/true-false";
import {TypeAnswer} from "./question-types/type-answer";
import {Slider} from "./question-types/slider";
import {Puzzle} from "./question-types/puzzle";
import {
    PuzzleTypes,
    QuizTypes,
    SliderTypes,
    TrueOrFalseTypes,
    TypeAnswerTypes
} from "../../types.ts";

import './index.scss';

type Props = QuestionType;

const Question = (props: Props) => {
    const location = useLocation();
    const [expanded, setExpanded] = useState(false);
    const [questionType, setQuestionType] = useState<QUESTION_TYPE | null>(null);
    // TODO: rework any type

    const [quizParams, setQuizParams] = useState<QuizTypes | null>(null);
    const [trueFalseParams, setTrueFalseParams] = useState<TrueOrFalseTypes | null>(null);
    const [typeAnswerParams, setTypeAnswerParams] = useState<TypeAnswerTypes | null>(null);
    const [sliderParams, setSliderParams] = useState<SliderTypes | null>(null);
    const [puzzleParams, setPuzzleParams] = useState<PuzzleTypes | null>(null);

    const [title, setTitle] = useState('');
    const [time, setTime] = useState<number>(10);
    const [img, setUrl] = useState('');

    useEffect(() => {
        setTitle(props.title);
        setUrl(props.img || '');
        setTime(props.time || 10)
        setExpanded(props.isNew || false);
        setQuestionType(props.questionType || null);

        setQuizParams(props[QUESTION_TYPE.QUIZ] || null);
        setTrueFalseParams(props[QUESTION_TYPE.TRUE_OR_FALSE] || null);
        setTypeAnswerParams(props[QUESTION_TYPE.TYPE_ANSWER] || null);
        setSliderParams(props[QUESTION_TYPE.SLIDER] || null);
        setPuzzleParams(props[QUESTION_TYPE.PUZZLE] || null);
    }, []);


    const onSave = () => {
        const refQuestions = ref(db, '/quizzes/' + location?.state?.quizId + '/questions/' + props.id);

        // TODO: add validation
        if (!title) {
            alert('Please fill question title');
            return;
        }

        const newQuestion = {
            id: props.id,
            title,
            time,
            img,
            questionType,
            [QUESTION_TYPE.QUIZ]: {...quizParams},
            [QUESTION_TYPE.TRUE_OR_FALSE]: {...trueFalseParams},
            [QUESTION_TYPE.TYPE_ANSWER]: {...typeAnswerParams},
            [QUESTION_TYPE.SLIDER]: {...sliderParams},
            [QUESTION_TYPE.PUZZLE]: {...puzzleParams}
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
                        size="small"
                        className="question__input" label="Title*"
                        variant="outlined"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <TextField
                        size="small"
                        className="question__input"
                        label="Image Link"
                        variant="outlined"
                        value={img}
                        onChange={e => setUrl(e.target.value)}
                    />

                    <TextField
                        size="small"
                        className="question__input"
                        label="Time for question"
                        variant="outlined"
                        value={time}
                        type="number"
                        onChange={e => setTime(+e.target.value)}
                    />

                    <QuestionVariant
                        questionType={questionType}
                        setQuestionType={setQuestionType}
                    />

                    {questionType === QUESTION_TYPE.QUIZ && <QuizType
                        questionTypeParams={quizParams}
                        setQuestionTypeParams={setQuizParams}
                    />}

                    {questionType === QUESTION_TYPE.TRUE_OR_FALSE && <TrueFalse
                        questionTypeParams={trueFalseParams}
                        setQuestionTypeParams={setTrueFalseParams}
                    />}

                    {questionType === QUESTION_TYPE.TYPE_ANSWER && <TypeAnswer
                        questionTypeParams={typeAnswerParams}
                        setQuestionTypeParams={setTypeAnswerParams}
                    />}

                    {questionType === QUESTION_TYPE.SLIDER && <Slider
                        questionTypeParams={sliderParams}
                        setQuestionTypeParams={setSliderParams}
                    />}

                    {questionType === QUESTION_TYPE.PUZZLE && <Puzzle
                        questionTypeParams={puzzleParams}
                        setQuestionTypeParams={setPuzzleParams}
                    />}



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
