import CircleIcon from "@mui/icons-material/PanoramaFishEye";
import TriangleIcon from "@mui/icons-material/ChangeHistory";
import StarIcon from "@mui/icons-material/StarBorderOutlined";
import React from "react";

export const getChartElements = (playersAnswered: {[key: string]: number}) => {
    return [
        {
            answer: playersAnswered.A,
            variant: 'A',
            className: 'stage-fifth__first-result',
            icon: <StarIcon className="check-icon"/>
        },
        {
            answer: playersAnswered.B,
            variant: 'B',
            className: 'stage-fifth__second-result',
            icon: <CircleIcon className="check-icon"/>
        },
        {
            answer: playersAnswered.C,
            variant: 'C',
            className: 'stage-fifth__third-result',
            icon: <TriangleIcon className="check-icon"/>
        },
        {
            answer: playersAnswered.D,
            variant: 'D',
            className: 'stage-fifth__fourth-result',
            icon: <StarIcon className="check-icon"/>
        }
    ];
}
