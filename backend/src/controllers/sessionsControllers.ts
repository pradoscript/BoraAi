import { authConfig } from "@/configs/auth"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { compare, hash } from "bcrypt"
import { Request, Response, NextFunction } from "express"
import { sign, SignOptions } from "jsonwebtoken"
import { z } from "zod"

class SessionsController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                email: z.string().email(),
                password: z.string()
            })

            const { email, password } = bodySchema.parse(request.body)

            const checkingIfAccountExists = await prisma.user.findFirst({
                where: { email }
            })

            if (!checkingIfAccountExists) {
                throw new AppError("Email ou senha incorreto(s)!")
            }

            if (!checkingIfAccountExists.isVerified) {
                throw new AppError("Confirme seu e-mail antes de fazer login!")
            }


            const passwordMatch = await compare(password, checkingIfAccountExists.password)

            if (!passwordMatch) {
                throw new AppError("Email ou senha incorreto(s)!")
            }
            const { secret, expiresIn } = authConfig.jwt
            const token = sign({}, secret, {
                subject: checkingIfAccountExists.id,
                expiresIn
            } as SignOptions)

            const { password: hashedPassword, ...userWithoutPassword } = checkingIfAccountExists

            return response.json({ token, user: userWithoutPassword })
        }
        catch (error) {
            next(error)
        }
    }
}

export { SessionsController }