import mongoose from "mongoose"

const User = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    todos: [{type: mongoose.Types.ObjectId, ref: "Todo"}]
})

export default mongoose.model('User', User)