import { prisma } from "@/database/prisma"
import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import { AppError } from "@/utils/AppError"

class VerifyController {
    async handle(request: Request, response: Response, next: NextFunction) {
        try {
            const { token } = request.params

            const payload = verify(token, process.env.EMAIL_SECRET!) as { email: string }

            const user = await prisma.user.findFirst({ where: { email: payload.email } })

            if (!user) throw new AppError("Usuário não encontrado!", 404)

            if (user.isVerified) {
                return response.json({ message: "Conta já verificada!" })
            }

            await prisma.user.update({
                where: { id: user.id },
                data: { isVerified: true }
            })

            return response.json({ message: "Conta verificada com sucesso!" })
        } catch (error) {
            next(error)
        }
    }
}

export { VerifyController }
