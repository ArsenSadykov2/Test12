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