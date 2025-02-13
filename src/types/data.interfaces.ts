import { ReactNode } from 'react';
import { User } from './user.types';

export interface LoadingState {
    isLoading: boolean;
    loadingItems: { [key: string]: boolean };
}

export interface CustomLinkProps {
    to: string;
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export interface AuthState {
    user: User | null;
    token: string;
    isLoading: boolean;
    error: string | null;
}

export interface Choice {
    id: number;
    value: string;
}

export interface Question {
    no: number;
    type: string;
    question: string;
    choices: Choice[];
}

export interface Part {
    id: number;
    name: string;
    time: number;
    questions: Question[];
    totalQuestion?: number;
}

export interface Section {
    id: number;
    name: string;
    part: Part[];
}
