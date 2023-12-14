import React from 'react';
import SquareIcon from "@mui/icons-material/CropSquare";
import CircleIcon from "@mui/icons-material/PanoramaFishEye";
import TriangleIcon from "@mui/icons-material/ChangeHistory";
import StarIcon from "@mui/icons-material/StarBorderOutlined";
import {QuizTypes} from "../../../../../../types.ts";

type Props = {
    currentQuestion?: QuizTypes
};
export const StageFourthQuizView = ({currentQuestion}: Props) => {
    return (
        <>
            {currentQuestion?.variantA && <div className="first-button quiz">
                <SquareIcon className="icon"/>
                {currentQuestion?.variantA}
            </div>}

            {currentQuestion?.variantB && <div className="second-button">
                <CircleIcon className="icon"/>
                {currentQuestion?.variantB}
            </div>}

            {currentQuestion?.variantC && <div className="third-button">
                <TriangleIcon className="icon"/>
                {currentQuestion?.variantC}
            </div>}

            {currentQuestion?.variantD && <div className="fourth-button">
                <StarIcon className="icon"/>
                {currentQuestion?.variantD}
            </div>}
        </>
    );
};
