import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";

import QuizCard from "../../components/card/Card.tsx";
import type {QuestionType} from "../../components/card/Card.tsx";
import {db} from "../../firebase/firebase.ts";
import {onValue, ref, set} from "firebase/database";

import './index.scss';
import {CustomModal} from "../../components/modal";

type Quiz = {
    id: number,
    title: string,
    questions?: QuestionType[]
};
const Quizzes = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [startedGame, setStartedGame] = useState(false);
    const quizzesRef = ref(db, '/quizzes');

    useEffect(() => {
        onValue(quizzesRef, (snapshot) => {
            const quizzes = snapshot.val();
            if (quizzes) {
                setQuizzes(Object.values(quizzes));
            }
        });

        const gameQuizRef = ref(db, '/game/quizId');
        onValue(gameQuizRef, (snapshot) => {
            const quiz = snapshot.val();
            setStartedGame(!!quiz);
        });
    }, []);

    const createNewQuiz = (title: string) => {
        const id = +new Date();
        const quizzesRef = ref(db, '/quizzes/' + id);
        const newQuiz = {
            id,
            title
        };

        set(quizzesRef, newQuiz);
    };

    const deleteQuiz = (id: number) => {
        const newQuizzes = quizzes.filter((quiz) => quiz.id !== id);
        setQuizzes(newQuizzes);
    }

    const finishGame = () => {
        const gameQuizRef = ref(db, '/game');
        set(gameQuizRef, null);
    }
    return (
        <div className="quizzes">
            <div className="quizzes__create-new">
                <CustomModal buttonHandler={createNewQuiz}/>
                <Button variant="contained" color="error" onClick={finishGame} className="rating__come-back-button"
                        disabled={!startedGame}>
                    Завершити гру
                </Button>
            </div>

            <div className="quizzes__wrapper">
                {quizzes.map(({title, id, questions}) => (
                    <QuizCard title={title} id={id} key={id} questions={questions} deleteQuiz={deleteQuiz}/>
                ))}
            </div>

        </div>
    );
};

export default Quizzes;
