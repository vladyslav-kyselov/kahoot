import React from 'react';
import SquareIcon from "@mui/icons-material/CropSquare";
import CircleIcon from "@mui/icons-material/PanoramaFishEye";

export const StageFourthTrueFalseView = () => {
    return (
        <div>
            <div className="first-button" style={{height: '100%', fontSize: '50px', padding: '50px'}}>
                <SquareIcon className="icon"/>
                Правда
            </div>

            <div className="second-button" style={{height: '100%', fontSize: '50px', padding: '50px'}}>
                <CircleIcon className="icon"/>
                Не правда
            </div>
        </div>
    );
};
