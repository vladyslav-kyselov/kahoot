import React, {useEffect, useState} from 'react';
import {onValue, ref} from "firebase/database";
import {db} from "../../firebase/firebase.ts";
import Typography from "@mui/material/Typography";

import './index.scss';
import Paper from "@mui/material/Paper";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

type User = {
    name: string,
    totalScore: number
}
const Rating = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const usersRef = ref(db, '/users');
        onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            const users = Object.values(data) as User[];
            if (users.length) {
                setUsers(users.sort((a: User, b: User) => b.totalScore - a.totalScore));
            }
        });

        const isAdmin = sessionStorage.getItem("isAuth");
        setIsAdmin(!!isAdmin);
    }, []);

    const getRatingClass = (index: number) => {
        if (index !== 0 && index !== 1 && index !== 2) {
            return '';
        }

        const rating = {
            0: 'gold',
            1: 'silver',
            2: 'bronze'
        }

        return rating[index] ? rating[index] : ''
    }

    const onClick = () => {
        const isAuth = sessionStorage.getItem("isAuth");
        if (isAuth) {
            navigate('/game');
        }
        navigate('/quizzes');
    };

    return (
        <div className="rating__wrapper">

                <Button variant="outlined" color="success" onClick={onClick} className="rating__come-back-button">
                    {isAdmin ? 'TO QUIZZES' : 'TO START'}
                </Button>

            <Typography variant="h3" gutterBottom className="rating__title">
                Rating
            </Typography>
            <div className="rating__users">
                {users && users.map(({name, totalScore}, index) => (
                    <Paper elevation={3} key={index} className={`rating__user ${getRatingClass(index)}`}>
                        <div className="name">{name}</div>
                        <div className="total-score">{totalScore}</div>
                    </Paper>

                ))}
            </div>
        </div>
    );
};

export default Rating;
