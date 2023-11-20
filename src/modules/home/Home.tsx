import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from "react-router-dom";
import {Button, TextField} from "@mui/material";

import {onValue, ref, set} from "firebase/database";
import {db} from "../../firebase/firebase.ts";

import './index.scss';

const WARNING_MESSAGE = {
    req_name: 'Name is required! Please enter name.',
    uniq_name: 'This name is already taken. Please enter another name.'
};
const Home = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [warning, setWarning] = useState<string | null>(null);
    const [isStartedQuiz, setIsStartedQuiz] = useState(false);

    useEffect(() => {
        const name = sessionStorage.getItem("name");
        if (name) {
            navigate('/game');
        }
    }, []);

    const starCountRef = ref(db, '/game/quizId');
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        if (!isStartedQuiz && data) {
            setIsStartedQuiz(true);
        }
    });
    const addNewUser = () => {
        if (!name) {
            setWarning(WARNING_MESSAGE.req_name);
            return;
        }

        const gameRef = ref(db, '/game/players/' + name);
        onValue(gameRef, (snapshot) => {
            const existingName = snapshot.val();
            if (existingName) {
                setWarning(WARNING_MESSAGE.uniq_name);
            } else {
                const usersRef = ref(db, '/users/' + name);
                onValue(usersRef, (snapshot) => {
                    const userName = snapshot.val();
                    if (!userName) {
                        set(usersRef, {
                            name,
                            totalScore: "0"
                        });
                    }

                    set(gameRef, {
                        name,
                        score: 0,
                        winStreak: 0,
                        lastAnswer: {
                            questionId: '',
                            answer: ''
                        }
                    })
                }, {onlyOnce: true});
                navigate('/game');
            }

            sessionStorage.setItem("name", name);
        }, {
            onlyOnce: true
        });
    };


    return (
        <div className="home">
            <div className="home__inputs">
                <div>&nbsp;</div>
                <TextField
                    disabled={!isStartedQuiz}
                    error={!!warning}
                    helperText={warning}
                    className="home__input"
                    label="Name"
                    variant="outlined"
                    onChange={(e) => {
                        setName(e.target.value);
                        if (warning) {
                            setWarning(null);
                        }
                    }}
                />
                <Button disabled={!isStartedQuiz} variant="outlined" className="home__join-room" onClick={addNewUser}>
                    Start Game
                </Button>
                <div className="home__host-join">
                    <Link to='/home-host'>
                        Join like a admin
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Home;
