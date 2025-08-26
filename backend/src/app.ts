import express from "express"
import { routes } from "@/routes"
import { errorHandling } from "./middlewares/errorHandling"
import cors from "cors"

const app = express()
app.use(cors({
    origin: process.env.URL_REQUEST
}))
app.use(express.json())
app.use(routes)
app.use(errorHandling)
export { app }