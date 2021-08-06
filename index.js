import express from "express"
import mongoose from "mongoose"
import router from "./router.js"
import {config} from "./config/default.js";
import cors from "cors"
import cookieParser from "cookie-parser"
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: config.CLIENT_URL
}))
app.use("/api", router)
app.use(errorMiddleware)


const startApp = async () => {
    try {
        await mongoose.connect(config.dbUrl, {
            useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
        })
        app.listen(config.PORT, () => console.log(`Server started at ${config.PORT} PORT`))
    } catch (e) {
        console.log(e)
    }
}
startApp()