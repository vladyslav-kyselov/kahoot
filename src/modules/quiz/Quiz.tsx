import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";

import './index.scss';
import Question from "../question/Question.tsx";
import {getEmptyQuestion} from "./utils/getEmptyQuestion.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {QuestionType} from "../../components/card/Card.tsx";
import {onValue, ref, set} from "firebase/database";
import {db} from "../../firebase/firebase.ts";


const Quiz = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<QuestionType[]>([]);

    useEffect(() => {
        const refQuestions = ref(db, '/quizzes/' + location?.state?.quizId + '/questions');
        onValue(refQuestions, (snapshot) => {
            const question = snapshot.val();
            if (question) {
                setQuestions(question.filter((i: QuestionType) => i));
            } else {
                setQuestions([]);
            }
        });
    }, []);

    const onAddNewQuestion = () => {
        const nextIndex = questions[questions.length - 1]?.id + 1 || 0;
        setQuestions(prevState => ([...prevState, getEmptyQuestion(nextIndex)]));
    };

    const onStartGame = () => {
        const refStartGame = ref(db, '/game');

        set(refStartGame, {
            quizId: location?.state?.quizId,
            startedGame: false,
            showUsersRating: false,
            // stage 0 === 'START'
            stage: 0,
            questions: questions,
            currentQuestion: 0,
            playersAnswered: {}
        });

        navigate('/game');
    };

    const onDelete = (id: number) => {
        setQuestions(prevState => prevState.filter((question) => question.id !== id));
        const refQuestions = ref(db, '/quizzes/' + location?.state?.quizId + '/questions/' + id);
        set(refQuestions, null);
    };

    return (
        <div className="quizzes">
            <div className="quizzes__create-new">
                <Button variant="contained" onClick={onAddNewQuestion}>Додати нове запитання</Button>
                <Button variant="contained" color="success" onClick={onStartGame}>Почати гру</Button>
            </div>
            <div className="quizzes__wrapper">
                {questions.map((question) => (
                    <Question
                        key={question.id}
                        img={question.img}
                        isNew={question.isNew}
                        questionType={question.questionType}
                        onDelete={onDelete}
                        {...question}
                    />
                ))}
            </div>

        </div>
    );
};

export default Quiz;
