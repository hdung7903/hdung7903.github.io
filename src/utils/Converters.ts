
export const numberToLetter = (num: number): string => {
    // Ensure the number is between 1 and 26
    if (num < 1) return '';
    // Convert to letter (A=1, B=2, etc.)
    return String.fromCharCode(64 + num);
};

export const letterToNumber = (letter: string): number => {
    // Convert single uppercase letter to number (A=1, B=2, etc.)
    return letter.toUpperCase().charCodeAt(0) - 64;
};