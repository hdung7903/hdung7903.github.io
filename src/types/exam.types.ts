export type Exam = {
    exam_id: string;
    account_id: string;
    title: string;
    exam_type: string;

}

export type Module = {
    module_id: string;
    exam_id: string;
    module_name: string;
    instruction: string;
}

export type Domain = {
    domain_id: string;
    module_id: string;
    domain_name: string;
}

export type Question = {
    question_id: string;
    skill_id: string;
    level: string;
}

export type QuestionContent = {
    question_content_id: string;
    question_id: string;
    content: string;
    content_type: string;
}

export type Skill = {
    skill_id: string;
    domain_id: string;
    skill_name: string;
}

export type Answer = {
    answer_id: string;
    question_id: string;
}

export type AnswerContent = {
    answer_content_id: string;
    answer_id: string;
    content: string;
    content_type: string;
    isCorrect: boolean;
    answerExplanation: string;
}
