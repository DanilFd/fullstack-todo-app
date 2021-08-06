export type RequestBodyRegistration = {
    email: string,
    username: string,
    password: string
}
export type RequestBodyLogin = {
    username: string,
    password: string
}

export type ResponseDataLogin = {
    token: string,
    id: string

}