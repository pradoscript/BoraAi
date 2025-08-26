import { RoomsController } from "@/controllers/roomsController"
import { RoomsGuestsController } from "@/controllers/roomsGuestsController"
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated"
import { Router } from "express"

const roomsRoutes = Router()
const roomsController = new RoomsController()
const roomsGuestsController = new RoomsGuestsController()

roomsRoutes.post("/create", ensureAuthenticated, roomsController.create)
roomsRoutes.get("/user/:userId", ensureAuthenticated, roomsController.index)
roomsRoutes.get("/:roomId", ensureAuthenticated, roomsController.show)
/////////

roomsRoutes.post("/join", ensureAuthenticated, roomsGuestsController.create)
roomsRoutes.patch("/:roomId/confirmation", ensureAuthenticated, roomsGuestsController.update)
roomsRoutes.delete("/leave/:roomId", ensureAuthenticated, roomsGuestsController.leave)
export { roomsRoutes }