
type VariantsType = {
    variantA: string;
    variantB: string;
    variantC?: string;
    variantD?: string;
};
export const getCorrectAnswer = (variants: VariantsType , correctVariant:'A' | 'B' | 'C' | 'D') => {
    const mapCorrectAnswer = {
        'A': variants.variantA,
        'B': variants.variantB,
        'C': variants.variantC,
        'D': variants.variantD
    }

    return mapCorrectAnswer[correctVariant] || '';
}
