import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController'
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController'
import { Router } from 'express'

const passwordRoutes = Router()

const sendForgotPasswordMailUseCase = new SendForgotPasswordMailController()
const resetPasswordUserController = new ResetPasswordUserController()

passwordRoutes.post("/forgot", sendForgotPasswordMailUseCase.handle)
passwordRoutes.post("/reset", resetPasswordUserController.handle)


export { passwordRoutes }