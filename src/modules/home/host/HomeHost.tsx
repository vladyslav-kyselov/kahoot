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
            <div className="home-host__title">LOG IN</div>
            <TextField className="home-host__login" label="Login" variant="outlined"
                       onChange={e => setLogin(e.currentTarget.value)} error={!!warningMessage}/>
            <TextField className="home-host__password" label="Password" variant="outlined"
                       onChange={e => setPassword(e.currentTarget.value)}
                       error={!!warningMessage}
                       helperText={warningMessage}
                       type="password"
            />
            <Button variant="outlined" color="success" onClick={onClick} className="home-host__log-in">
                LOG IN
            </Button>
            <div className="home-host__return-link">
                <Link to='/'>
                    Back to user log in page
                </Link>
            </div>
        </div>
    );
};

export default HomeHost;
