import {api} from "../http";
import {AuthResponse} from "../types/AuthResponse";

export const loginApi = (username: string, password: string) => {
    return api.post<AuthResponse>("/login", {username, password})
}
export const registerApi = (username: string, password: string) => {
    return api.post<AuthResponse>("/registration", {username, password})
}
export const logoutApi = () => {
    return api.post("/logout")
}