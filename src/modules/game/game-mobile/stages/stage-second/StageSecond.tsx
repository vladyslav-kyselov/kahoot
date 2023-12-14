import React from 'react';
import './index.scss';
import Typography from "@mui/material/Typography";
import {Zoom} from "@mui/material";

const StageSecond = () => {


    return (
        <div className="second-stage">
            <Zoom in={true} timeout={500}>
                <Typography variant="h6" gutterBottom className="second-stage__font">
                    Приготовся до гри!
                </Typography>
            </Zoom>
        </div>
    );
};

export default StageSecond;
