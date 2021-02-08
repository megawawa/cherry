import {hashSync, compareSync, genSaltSync} from "bcrypt"

export function generateHash(password: string) {
    return hashSync(password, genSaltSync(8), null);
};

// checking if password is valid
export function validPassword(password: string, user: any) {
    return compareSync(password, user.password);
};