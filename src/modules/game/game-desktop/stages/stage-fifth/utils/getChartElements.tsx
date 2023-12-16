import CircleIcon from "@mui/icons-material/PanoramaFishEye";
import SquareIcon from "@mui/icons-material/CropSquare";
import TriangleIcon from "@mui/icons-material/ChangeHistory";
import StarIcon from "@mui/icons-material/StarBorderOutlined";
import React from "react";
import {QUESTION_TYPE} from "../../../../../../constants";

export const getChartElements = (playersAnswered: {[key: string]: number}, type?: QUESTION_TYPE) => {
    const variants = [
        {
            answer: playersAnswered.A,
            variant: 'A',
            className: 'stage-fifth__first-result',
            icon: <SquareIcon className="check-icon"/>
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
    if (type === QUESTION_TYPE.TRUE_OR_FALSE) {
        return variants.slice(0, 2);
    }

    else return variants;
}
