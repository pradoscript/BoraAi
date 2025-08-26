import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { Request, Response, NextFunction } from "express"
import { z } from "zod"

class RoomsGuestsController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                event_name: z.string(),
                event_password: z.string()
            })

            const { event_name, event_password } = bodySchema.parse(request.body)
            const guestId = request.user!.id
            const room = await prisma.room.findFirst({
                where: {
                    event: event_name,
                }
            })

            if (!room) {
                throw new AppError("Essa sala não existe!")
            }

            if (room?.password_room !== event_password) {
                throw new AppError("Nome e/ou senhas incorreto(s)")
            }

            await prisma.roomGuests.create({
                data: {
                    user_id: guestId,
                    room_id: room.id,
                    is_host: false,
                    confirmed: true
                }
            })

            return response.json()
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const { roomId } = request.params
            const userId = request.user!.id

            // Busca a entrada do usuário na sala
            const guest = await prisma.roomGuests.findFirst({
                where: { room_id: roomId, user_id: userId }
            })

            if (!guest) {
                throw new AppError("Você não está participando dessa sala")
            }

            // Alterna entre confirmado e cancelado
            const updatedGuest = await prisma.roomGuests.update({
                where: {
                    room_id_user_id: {
                        user_id: request.user!.id,
                        room_id: roomId
                    }
                },
                data: { confirmed: !guest.confirmed }
            })

            return response.json()

        } catch (error) {
            next(error)
        }
    }

    async leave(request: Request, response: Response, next: NextFunction) {
        try {
            const { roomId } = request.params

            const isUserOwner = await prisma.user.findFirst({
                where: {
                    id: request.user!.id
                }
            })

            const room = await prisma.room.findFirst({
                where: {
                    id: roomId
                }
            })

            if (!room) {
                throw new AppError("Sala não encontrada!")
            }


            if (isUserOwner?.id === room?.owner_id) {
                await prisma.room.delete({
                    where: {
                        id: roomId
                    }
                })
            } else {
                await prisma.roomGuests.delete({
                    where: {
                        room_id_user_id: {
                            user_id: request.user!.id,
                            room_id: roomId
                        }
                    }
                })
            }

            return response.json()
        } catch (error) {
            next(error)
        }
    }
}

export { RoomsGuestsController }