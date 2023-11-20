import React from 'react';
import './index.scss';
import Typography from "@mui/material/Typography";
import {Zoom} from "@mui/material";

const StageFirst = () => {
    return (
        <div className="stage-first">
        <Zoom in={true} timeout={500}>
                <div className="stage-first__wrapper">
                    <Typography variant="h6" gutterBottom className="stage-first__font">
                        You're in the game!
                    </Typography>
                    <Typography variant="h6" gutterBottom className="stage-first__font">
                        Check your name on the desktop!
                    </Typography>
                </div>
        </Zoom>
        </div>
    );
};

export default StageFirst;
