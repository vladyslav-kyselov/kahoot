import React from 'react';
import './index.scss';
import Typography from "@mui/material/Typography";
import {Zoom} from "@mui/material";
import {QuestionType} from "../../../../../components/card/Card.tsx";

type Props = {
    currentQuestion: QuestionType | null
}

const StageThird = ({currentQuestion}: Props) => {
    return (
        <div className="third-stage">
            <Zoom in={true} timeout={500}>
                <div className="third-stage__wrapper">
                    <Typography variant="h6" gutterBottom className="third-stage__font">
                        Запитання № {(currentQuestion?.id || 0) + 1}
                    </Typography>
                </div>
            </Zoom>
        </div>
    );
};

export default StageThird;
