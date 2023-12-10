import {QuestionType} from "../../../components/card/Card.tsx";

export const getEmptyQuestion = (id: number): QuestionType => {
    return {
        id,
        img: '',
        time: 10,
        title: '',
        isNew: true
    }
}
