import React, {useEffect, useState} from 'react';
import './index.scss';
import Typography from "@mui/material/Typography";
import {Zoom} from "@mui/material";
import {onValue, ref} from "firebase/database";
import {db} from "../../../../../firebase/firebase.ts";
const StageSixth = () => {
    const [score, setScore] = useState(0);
    useEffect(() => {
        const name = sessionStorage.getItem("name");
        const userRef = ref(db, `/game/players/${name}/score`);

        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setScore(data);
            }
        }, {
            onlyOnce: true
        });
    }, []);

    return (
        <div className="sixth-stage">
            <Zoom in={true} timeout={500}>
                <div className="sixth-stage__score-wrapper">
                    <Typography variant="h3" gutterBottom className="sixth-stage__score">
                        Your score:
                        <div>{score}</div>
                    </Typography>
                </div>

            </Zoom>
        </div>
    );
};

export default StageSixth;
