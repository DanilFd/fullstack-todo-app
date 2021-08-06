import User from "../models/User.js";
import TokenService from "./TokenService.js";
import {UserDto} from "../dtos/user-dtos.js";
import {ApiError} from "../exceptions/apiError.js";
import bcryptjs from "bcryptjs"

class AuthService {
    async registration(username, password) {
        const candidate = await User.findOne({username})
        if (candidate) {
            throw ApiError.BadRequest("User was exists")
        }
        const hashedPassword = await bcryptjs.hash(password, 7)
        const user = await User.create({username, password: hashedPassword})
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async login(username, password) {
        const user = await User.findOne({username})
        if (!user) {
            throw ApiError.BadRequest("User not found")
        }
        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) {
            throw ApiError.BadRequest("Wrong password")
        }
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        return TokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = await TokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await TokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

}

export default new AuthService()