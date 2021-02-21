export type TutorOrStudentAccount = {
    id: number;
    name: string;
    email: string;
    isTutor: boolean;
    isStudent: boolean;
}

export type CredentialType = {
    name: string;
    email: string;
    password: string;
    isTutor: boolean;
    isStudent: boolean;
}