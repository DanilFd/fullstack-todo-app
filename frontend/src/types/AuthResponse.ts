import {UserDto} from "./UserDto";

export type AuthResponse = {
    accessToken: string,
    refreshToken: string,
    user: UserDto

}