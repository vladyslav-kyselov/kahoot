import React, {useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, TextField} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {CorrectAnswers} from "../select/Select.tsx";

import './index.scss';
import {ref, set} from "firebase/database";
import {db} from "../../firebase/firebase.ts";
import Confirmation from "../confirmation/Confirmation.tsx";

type Props = {
    id: number,
    title: string,
    questions?: QuestionType[],
    deleteQuiz: (id: number) => void
};

export type QuestionType = {
    id: number,
    isNew?: boolean,
    title: string,
    time: number,
    img: string,
    variantA: string,
    variantB: string,
    variantC: string,
    variantD: string,
    correctVariant: CorrectAnswers
};
export default function QuizCard(props: Props) {
    const {title, id, questions, deleteQuiz} = props;
    const [newTitle, setNewTitle] = useState(title);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    const onClick = () => {
        if (!editMode) {
            navigate('/quiz/' + id, {state: {quizId: id, questions}});
        }
    };

    const onDelete = () => {
        const quizRef = ref(db, '/quizzes/' + id);
        set(quizRef, null);
        deleteQuiz(id);
    };

    const onEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();

        setEditMode(prevState => !prevState);
    }

    const onSave = () => {
        const quizRef = ref(db, '/quizzes/' + id);

        if (newTitle !== title) {
            set(quizRef, {
                id,
                title: newTitle,
                questions: questions || null
            });
        }
        setEditMode(false);
    };

    return (
        <Card sx={{maxWidth: 345}} className="card">
            <CardActionArea className="card__action-area" onClick={onClick}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className="card__title">
                        {editMode ?
                            <TextField
                                size="small"
                                value={newTitle}
                                variant="standard"
                                onChange={e => setNewTitle(e.target.value)}
                            /> : title}
                    </Typography>
                </CardContent>
                <div className="card__action-buttons">
                    {editMode ? (<>
                        <Button color="success" onClick={onSave}>
                            Save
                        </Button>
                        <Button color="primary" onClick={() => setEditMode(false)}>
                            Cancel
                        </Button>
                    </>) : (<>
                        <Button color="primary" onClick={onEdit}>
                            Edit
                        </Button>
                        <Confirmation buttonHandler={onDelete} />

                    </>)}

                </div>
            </CardActionArea>
        </Card>
    );
}
