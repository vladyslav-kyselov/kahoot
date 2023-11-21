import React, {useEffect, useState} from 'react';
import {Button, Slide, Zoom} from "@mui/material";
import './index.scss';
import {User} from "../../../types.ts";
import {db} from "../../../../../firebase/firebase.ts";
import {onValue, ref, set} from "firebase/database";
import {useNavigate} from "react-router-dom";

const StageSeventh = () => {
    const [players, setPlayers] = useState<User[]>([]);
    const [allPlayers, setAllPlayers] = useState<User[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const playersRef = ref(db, '/game/players');
        onValue(playersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const players: User[] = Object.values(data);
                setAllPlayers(players);

                const mappedPlayers = players.sort((a: User, b: User) => b.score - a.score).slice(0, 3);
                setPlayers(mappedPlayers);

            }
        }, {onlyOnce: true})

        setTimeout(() => {
            const showRatingRef = ref(db, '/game/showUsersRating');
            set(showRatingRef, true);
        }, 9000);
    }, []);

    const saveScores = () => {
        allPlayers.forEach((player: User) => {
            const userRef = ref(db, `/users/${player.name}`);
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const totalScore = (+data.totalScore) + (+player.score);
                    set(userRef, {
                        ...data,
                        totalScore
                    });
                }
            }, {onlyOnce: true});
        });
    };
    const onClick = () => {
        saveScores();

        const gameRef = ref(db, '/game');
        set(gameRef, null);
        navigate('/quizzes');
    };
    return (
        <div className="seventh-stage">
            <Button variant="outlined" color="success" onClick={onClick} className="seventh-stage__close-button">
                CLOSE GAME
            </Button>

            {players.length ? <>
                {
                    players[2] && <div className="third-wrapper">
                        <Zoom in={true} timeout={1000} style={{transitionDelay: '3000ms'}}>
                            <div className="result-wrapper" style={{marginTop: 250}}>
                                <div className="title">
                                    {players[2]?.name}
                                </div>
                                <div className="score">
                                    {players[2]?.score}
                                </div>

                                <div className="img">
                                    <img
                                        src='public/third.PNG'
                                        alt='Bronze image'
                                    />
                                </div>
                            </div>
                        </Zoom>
                        <Slide direction="up" in={true} timeout={2000} mountOnEnter unmountOnExit
                               className="castle__wrapper">
                            <div className="castle"></div>
                        </Slide>
                    </div>
                }

                {players[0] &&  <div className="first-wrapper">
                    <Zoom in={true} timeout={1000} style={{transitionDelay: '8800ms'}}>
                        <div className="result-wrapper">
                            <div className="title">
                                {players[0]?.name}
                            </div>
                            <div className="score">
                                {players[0]?.score}
                            </div>

                            <div className="img">
                                <img
                                    src='public/first.PNG'
                                    alt='Gold image'
                                />
                            </div>
                        </div>
                    </Zoom>

                    <Slide direction="up" in={true} timeout={2000} mountOnEnter unmountOnExit
                           className="castle__wrapper">
                        <div className="castle"></div>
                    </Slide>
                </div>}

                {
                    players[1] &&  <div className="second-wrapper">
                        <Zoom in={true} timeout={1000} style={{transitionDelay: '5800ms'}}>
                            <div className="result-wrapper" style={{marginTop: 250}}>
                                <div className="title">
                                    {players[1]?.name}
                                </div>
                                <div className="score">
                                    {players[1]?.score}
                                </div>

                                <div className="img">
                                    <img
                                        src='public/second.PNG'
                                        alt='Silver image'
                                    />
                                </div>
                            </div>
                        </Zoom>

                        <Slide direction="up" in={true} timeout={2000} mountOnEnter unmountOnExit
                               className="castle__wrapper">
                            <div className="castle"></div>
                        </Slide>
                    </div>
                }
            </> : null}
        </div>
    );
};

export default StageSeventh;
