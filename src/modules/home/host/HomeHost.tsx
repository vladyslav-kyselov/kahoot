import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";

import './index.scss';
import {Link, useNavigate} from "react-router-dom";
import {onValue, ref} from "firebase/database";
import {db} from "../../../firebase/firebase.ts";

const HomeHost = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [warningMessage, setWarning] = useState<string | null>(null);
    const onClick = () => {
        const adminRef = ref(db, '/admin');

        onValue(adminRef, (snapshot) => {
            const data = snapshot.val();
            if (data.login === login && data.password === password) {
                sessionStorage.setItem("isAuth", "true");
                navigate('/quizzes');
            } else {
                setWarning('Incorrect login or password');
            }
        }, {onlyOnce: true});
    };

    return (
        <div className="home-host">
            <div className="home-host__title">Секретний кабінет</div>
            <TextField className="home-host__login" label="Ім'я" variant="outlined"
                       onChange={e => setLogin(e.currentTarget.value)} error={!!warningMessage}/>
            <TextField className="home-host__password" label="Пароль" variant="outlined"
                       onChange={e => setPassword(e.currentTarget.value)}
                       error={!!warningMessage}
                       helperText={warningMessage}
                       type="password"
            />
            <Button variant="outlined" color="success" onClick={onClick} className="home-host__log-in">
                Увійти
            </Button>
            <div className="home-host__return-link">
                <Link to='/'>
                    Повернутись назад
                </Link>
            </div>
        </div>
    );
};

export default HomeHost;
