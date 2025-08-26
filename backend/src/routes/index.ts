import { Router } from "express"
import { usersRoutes } from "./usersRoutes"
import { sessionsRoutes } from "./sessionsRoutes"
import { roomsRoutes } from "./roomsRoutes"

const routes = Router()

routes.use("/register", usersRoutes)
routes.use("/login", sessionsRoutes)
routes.use("/rooms", roomsRoutes)


export { routes }