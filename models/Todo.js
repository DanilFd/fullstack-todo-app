import mongoose from "mongoose"

const Todo = new mongoose.Schema({
    title: {type: String, required: true},
    completed: {type: Boolean, required: true, default: false},
    owner: {type: mongoose.Types.ObjectId, ref: "User"}

})

export default mongoose.model('Todo', Todo)