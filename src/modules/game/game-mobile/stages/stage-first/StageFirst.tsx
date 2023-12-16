import React from 'react';
import './index.scss';
import Typography from "@mui/material/Typography";
import {Zoom} from "@mui/material";

const StageFirst = () => {
    return (
        <div className="stage-first">
        <Zoom in={true} timeout={500}>
                <div className="stage-first__wrapper">
                    <Typography variant="h2" gutterBottom className="stage-first__font">
                        Ти в грі!
                    </Typography>
                    <Typography variant="h6" gutterBottom className="stage-first__font">
                        Перевірь своє ім'я на екрані.
                    </Typography>
                </div>
        </Zoom>
        </div>
    );
};

export default StageFirst;
