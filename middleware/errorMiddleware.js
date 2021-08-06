import {ApiError} from "../exceptions/apiError.js";

export default function (err, req, res) {
    console.log(err)
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: "Server error"})
}