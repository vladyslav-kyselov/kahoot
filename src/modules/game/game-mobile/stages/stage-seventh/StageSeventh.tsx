import React, {useEffect, useState} from 'react';
import './index.scss';
import {Zoom} from "@mui/material";
import Typography from "@mui/material/Typography";
import {onValue, ref} from "firebase/database";
import {db} from "../../../../../firebase/firebase.ts";
import {User} from "../../../types.ts";
import {getCorrectImg} from "./utils/getCorrectImg.tsx";
const StageSeventh = () => {
    const [place, setPlace] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [showStatistic, setShowStatistic] = useState<boolean>(false);

    useEffect(() => {
        const showRatingRef = ref(db, '/game/showUsersRating');
        onValue(showRatingRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setShowStatistic(data);
            }
        });

        const name = sessionStorage.getItem("name");
        const userRef = ref(db, `/game/players/${name}`);

        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setScore(data.score);
            }
        }, {
            onlyOnce: true
        });

        const playersRef = ref(db, `/game/players/`);
        onValue(playersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const players = Object.values(data) as User[];
                players.sort((a, b) => b.score - a.score);
                const plc = players.findIndex(player => player.name === name);

                if (plc !== -1) {
                    setPlace(plc + 1);
                }
            }
        }, {
            onlyOnce: true
        });

    }, [])

    return (
        <div className="seventh-stage">
            <Zoom in={true} timeout={500}>
                <div className="seventh-stage__score-wrapper">
                    <Typography variant="h3" gutterBottom className="seventh-stage__score">
                        Місце: {showStatistic ? place: '...'}
                        <div className="score__wrapper">{score}</div>

                        <div className="image__wrapper">
                            {showStatistic ? getCorrectImg(place) : null}
                        </div>
                    </Typography>
                </div>

            </Zoom>
        </div>
    );
};

export default StageSeventh;
