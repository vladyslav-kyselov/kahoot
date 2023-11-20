import {QuestionType} from "../../../components/card/Card.tsx";

export const getEmptyQuestion = (id: number): QuestionType => {
    return {
        isNew: true,
        id,
        img: '',
        time: 10,
        title: '',
        variantA: '',
        variantB: '',
        variantC: '',
        variantD: '',
        correctVariant: 'A'
    }
}
