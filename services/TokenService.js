import jwt from "jsonwebtoken"
import {config} from "../config/default.js";
import Token from "../models/Token.js";

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, config.jwtSecret, {expiresIn: "30m"})
        const refreshToken = jwt.sign(payload, config.jwtSecret, {expiresIn: "30d"})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, config.jwtSecret)
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, config.jwtSecret)
        } catch (e) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        return Token.create({user: userId, refreshToken})
    }

    async removeToken(refreshToken) {
        return Token.deleteOne({refreshToken})
    }

    async findToken(refreshToken) {
        return Token.findOne({refreshToken});
    }
}

export default new TokenService()