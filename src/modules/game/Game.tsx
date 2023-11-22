import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {useNavigate} from "react-router-dom";

import {onChildAdded, onChildRemoved, onValue, ref, set} from "firebase/database";
import {db} from "../../firebase/firebase.ts";
import {GameMobile} from "./game-mobile";

import './index.scss';
import {GameDesktop} from "./game-desktop";
import {QuestionType} from "../../components/card/Card.tsx";
import {STAGES} from "./constants.ts";
import {User} from "./types.ts";


const Game = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [questions, setQuestions] = useState<QuestionType[] | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null);
    const [currentStage, setCurrentStage] = useState(null);
    const [isGameStarted, setIsGameStarted] = useState(null);

    useEffect(() => {
        const startedGameRef = ref(db, '/game/startedGame');
        onValue(startedGameRef, (snapshot) => {
            const isGameStarted = snapshot.val();
            setIsGameStarted(isGameStarted);
        });

        const game = ref(db, '/game');
        onValue(game, (snapshot) => {
            const game = snapshot.val();
            const {currentQuestion: currQServer, stage, questions: questions_server} = game;

            if (stage !== currentStage) {
                setCurrentStage(stage);
            }

            if (currentQuestion !== currQServer) {
                setCurrentQuestion(questions_server[currQServer]);
            }

            if (!questions) {
                setQuestions(questions_server);
            }
        });

        const name = sessionStorage.getItem("name");
        if (isMobile && !name) {
            navigate('/');
        }

        const gamePlayersRef = ref(db, '/game/players/');
        if (!isMobile) {
            onChildAdded(gamePlayersRef, (snapshot) => {
                const user = snapshot.val();
                const hasThisPlayer = users.some(el => (el.name === user.name));
                if (!hasThisPlayer) {
                    setUsers(prevState => ([...new Set([...prevState, user])]));
                }
            });

            onChildRemoved(gamePlayersRef, (snapshot) => {
                const user = snapshot.val();
                setUsers(prevState => (prevState.filter(el => el.name !== user.name)));
            });
        }
    }, []);

    useEffect(() => {
        if (isMobile) {
            window.onunload = window.onbeforeunload = function () {
                const name = sessionStorage.getItem("name");
                if (name && !isGameStarted) {
                    const playerRef = ref(db, '/game/players/' + name);
                    set(playerRef, null);
                    sessionStorage.removeItem('name');
                    navigate('/');
                }
            };
        }
    }, [isGameStarted]);


    const changeStage = () => {
        const stageRef = ref(db, '/game/stage');

        if (!questions) {
            console.error('Questions is not defined');
            return;
        }

        if (currentStage === STAGES.length - 1) {
            console.error('Game is finished');
            return;
        }

        const lastQuestion = questions?.[questions.length - 1];
        if (currentQuestion?.id !== lastQuestion?.id && currentStage === 5) {
            // set stage "PREVIEW QUESTION"
            set(stageRef, 2);
            changeQuestion();
        } else if(currentQuestion?.id === lastQuestion?.id && currentStage === 4) {
            set(stageRef, 6);
        } else {
            set(stageRef, (currentStage || 0) + 1);
        }
    };

    const changeQuestion = () => {
        const questionRef = ref(db, '/game/currentQuestion');
        if (!questions && !currentQuestion) {
            console.error('Questions is not defined');
            return;
        }

        const nextQuestion = (currentQuestion?.id || 0) + 1;

        if (nextQuestion) {
            set(questionRef, nextQuestion);
        }

    }


    return (<>
        {
            isMobile ?
                <GameMobile stage={STAGES[currentStage || 0]} currentQuestion={currentQuestion}/> :
                <GameDesktop
                    users={users}
                    lastQuestion={questions?.[questions.length - 1]}
                    changeStage={changeStage}
                    stage={STAGES[currentStage || 0]}
                    questions={questions}
                    currentQuestion={currentQuestion}
                />
        }
    </>);
};

export default Game;
