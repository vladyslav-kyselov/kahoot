import React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import Typography from "@mui/material/Typography";

export const StageFourthPuzzleView = () => {
    return (
        <>
            <Typography variant="h6" gutterBottom className="fourth-stage__font">
                Від найбільшого до найменшого <FilterListIcon className="fourth-stage__puzzle-icon"/>
            </Typography>
        </>
    );
};
