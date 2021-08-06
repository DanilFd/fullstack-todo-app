import {createContext} from "react";
import {UserDto} from "../types/UserDto";

const noop = (username: string, password: string) => {

}
export const AuthContext = createContext({
    user: {} as UserDto | null,
    isAuth: false,
    login: noop,
    registration: noop,
    logout: () => {
    },
    error: "" as string | null,
})