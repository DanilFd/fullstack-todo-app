import {ApiError} from "../exceptions/apiError.js";
import TokenService from "../services/TokenService.js";

export default function (req, res, next) {
    try {
        const accessToken = req.headers["authorization"]
        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }
        const userData = TokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }
        req.user = userData
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}