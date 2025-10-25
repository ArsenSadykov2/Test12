export interface User {
    _id: string;
    email: string;
    token: string;
    role: string;
    displayName: string;
}

export interface RegisterMutation {
    email: string;
    password: string;
    displayName: string;
}

export interface LoginMutation {
    email: string;
    password: string;
}

export interface Recipe {
    _id: string;
    author: User;
    title: string;
    recipe: string;
    image?: string | null;
}

interface RecipeMutation {
    author: string;
    title: string;
    recipe: string;
    image: File | null;
}

export interface Comment {
    _id: string;
    author: User;
    recipe: Recipe;
    comment: string;
}

export interface CommentMutation {
    comment: string;
    recipe: string;
}

interface FormErrors {
    title?: string;
    recipe?: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            message: string;
            name: string;
        },
        messages: string;
        name: string;
        _message: string;
    }
}

export interface GlobalError {
    error: string;
}