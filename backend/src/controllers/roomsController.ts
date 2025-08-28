import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { Request, Response, NextFunction } from "express"
import { z } from "zod"

class RoomsController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                name_event: z.string(),
                description: z.string(),
                total_price: z.number(),
                date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida, use yyyy-mm-dd"),
                start_at: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Hora inválida, use HH:mm"),
                end_at: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Hora inválida, use HH:mm"),

                password_room: z.string()
            })
            const { name_event, description, total_price, date, start_at, end_at, password_room } = bodySchema.parse(request.body)

            const checkingIfNameAlreadyExists = await prisma.room.findFirst({
                where: { event: name_event }
            })

            if (checkingIfNameAlreadyExists) {
                throw new AppError("Uma sala já possui esse nome!")
            }

            const startDateTime = new Date(`${date}T${start_at}:00`);
            const endDateTime = new Date(`${date}T${end_at}:00`);
            const onlyDate = new Date(date);

            await prisma.$transaction(async (tx) => {
                const createdRoom = await tx.room.create({
                    data: {
                        owner_id: request.user!.id,
                        event: name_event,
                        description,
                        total_price,
                        date: onlyDate,
                        start_at: startDateTime,
                        end_at: endDateTime,
                        password_room
                    }
                })

                await tx.roomGuests.create({
                    data: {
                        user_id: request.user!.id,
                        room_id: createdRoom.id,
                        is_host: true,
                        confirmed: true
                    }
                })

                return createdRoom
            })

            return response.status(201).json()

        } catch (error) {
            next(error)
        }
    }

    async index(request: Request, response: Response, next: NextFunction) {

        try {
            const userId = request.user!.id
            const rooms = await prisma.room.findMany({
                where: {
                    guests: {
                        some: { user_id: userId }
                    }
                },
                select: {
                    id: true,
                    event: true,
                    description: true,
                    owner_id: true,
                    total_price: true,
                    date: true,
                    start_at: true,
                    end_at: true,
                    guests: {
                        select: {
                            is_host: true,
                            confirmed: true,
                            user: {
                                select: { name: true }
                            }
                        }
                    }
                }
            })

            return response.json(rooms)
        } catch (error) {
            next(error)
        }

    }

    async show(request: Request, response: Response, next: NextFunction) {
        try {
            const { roomId } = request.params

            const room = await prisma.room.findFirst({
                where: {
                    id: roomId
                },
                select: {
                    event: true,
                    description: true,
                    total_price: true,
                    date: true,
                    start_at: true,
                    end_at: true,
                    guests: {
                        select: {
                            is_host: true,
                            confirmed: true,
                            user: {
                                select: {
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    }
                }
            })

            return response.json(room)
        } catch (error) {
            next(error)
        }
    }



}

export { RoomsController }