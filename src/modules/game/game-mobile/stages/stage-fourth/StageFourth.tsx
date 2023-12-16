import React, {useEffect, useState} from 'react';
import './index.scss';
import Typography from "@mui/material/Typography";
import {CircularProgress, Zoom} from "@mui/material";
import {QuestionType} from "../../../../../components/card/Card.tsx";
import Countdown from "../../../utils/getScoreForWinner.ts";
import {QUESTION_TYPE} from "../../../../../constants.ts";
import {
    StageFourthPuzzleView,
    StageFourthQuizView,
    StageFourthSliderView,
    StageFourthTrueFalseView,
    StageFourthTypeAnswerView
} from "./views";
import {onValue, ref} from "firebase/database";
import {db} from "../../../../../firebase/firebase";

type Props = {
    currentQuestion: QuestionType | null
};

const StageFourth = ({currentQuestion}: Props) => {
    const [waitingState, setWaitingState] = useState(true);
    useEffect(() => {
        if (currentQuestion) {
            const count = new Countdown(null, currentQuestion?.time, () => {
            });
            count.start();
        }

        const name = sessionStorage.getItem("name");
        const userRef = ref(db, `/game/players/${name}/lastAnswer`);

        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.questionId === currentQuestion?.id) {
                setWaitingState(false);
            }
        }, {
            onlyOnce: true
        });
    }, [])


    return (<div className="fourth-stage">
        {waitingState ? (
                <>
                    {currentQuestion?.questionType === QUESTION_TYPE.QUIZ &&
                        <StageFourthQuizView
                            currentQuestion={currentQuestion}
                            setWaitingState={setWaitingState}
                        />
                    }
                    {currentQuestion?.questionType === QUESTION_TYPE.TRUE_OR_FALSE &&
                        <StageFourthTrueFalseView
                            currentQuestion={currentQuestion}
                            setWaitingState={setWaitingState}
                        />
                    }
                    {currentQuestion?.questionType === QUESTION_TYPE.TYPE_ANSWER &&
                        <StageFourthTypeAnswerView
                            currentQuestion={currentQuestion}
                            setWaitingState={setWaitingState}
                        />
                    }
                    {currentQuestion?.questionType === QUESTION_TYPE.SLIDER &&
                        <StageFourthSliderView
                            currentQuestion={currentQuestion}
                            setWaitingState={setWaitingState}
                        />
                    }
                    {currentQuestion?.questionType === QUESTION_TYPE.PUZZLE &&
                        <StageFourthPuzzleView
                            currentQuestion={currentQuestion}
                            setWaitingState={setWaitingState}
                        />
                    }
                </>
            ) :
            (<>
                <Zoom in={true} timeout={500}>
                    <div className="fourth-stage__font-wrapper">
                        <Typography variant="h6" gutterBottom className="fourth-stage__font">
                            Очікування результатів
                        </Typography>
                        <CircularProgress className="fourth-stage__circular-progress" size={70}/>
                    </div>
                </Zoom>
            </>)
        }
    </div>);
};

export default StageFourth;
