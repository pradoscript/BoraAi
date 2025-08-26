import { UsersController } from "@/controllers/usersControllers"
import { VerifyController } from "@/controllers/verifyController"
import { Router } from "express"

const usersRoutes = Router()
const usersController = new UsersController()
const verifyController = new VerifyController()

usersRoutes.get("/", usersController.show)
usersRoutes.post("/", usersController.create)
usersRoutes.get("/verify/:token", verifyController.handle)

export { usersRoutes } 