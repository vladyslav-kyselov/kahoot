import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const RedirectPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const isAuth = sessionStorage.getItem('isAuth');
        if (!isAuth) {
            navigate('/');
        } else {
            navigate('/home-host');
        }
    }, [])

    return (
        <div>

        </div>
    );
};

export default RedirectPage;
