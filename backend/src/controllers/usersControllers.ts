import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { hash } from "bcrypt"
import { sign } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import nodemailer from "nodemailer"
import { z } from "zod"

class UsersController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                name: z.string(),
                email: z.string(),
                password: z.string()
            })

            const { name, email, password } = bodySchema.parse(request.body)

            const checkingIfAccountExists = await prisma.user.findFirst({
                where: {
                    email
                }
            })

            if (checkingIfAccountExists) {
                throw new AppError("Essa conta já existe!")
            }

            const hashedPassword = await hash(password, 8)

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            })

            const token = sign(
                { email: user.email },
                process.env.EMAIL_SECRET!,
                { expiresIn: "1d" }
            )

            const verificationLink = `${process.env.URL_REQUEST_VERIFY}/register/verify/${token}`

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            })

            await transporter.sendMail({
                from: `"BoraAi" <${process.env.EMAIL_USER}>`,
                to: user.email,
                subject: "Confirme seu cadastro",
                html: `<p>Olá, ${user.name}!</p>
               <p>Confirme sua conta clicando no link abaixo:</p>
               <a href="${verificationLink}">${verificationLink}</a>`
            })

            return response.status(201).json({ message: "Verifique o Email Para Confirmar a Conta" })
        }
        catch (error) {
            next(error)
        }
    }
}

export { UsersController }