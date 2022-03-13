import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenReposiotry';
import { compare } from 'bcrypt'
import { inject, injectable } from "tsyringe";
import { sign } from 'jsonwebtoken'

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from '@shared/errors/AppError'
import auth from '@config/auth';


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  },
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("dayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Usuário  existe
    const user = await this.userRepository.findByEmail(email)
    const {
      expires_in_token,
      secret_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days
    } = auth

    if (!user) {
      throw new AppError("Email or password incorrect!")
    }

    // Senha esta correta
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!")
    }

    // Gerar jsonwebtoken
    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token
    })

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token
    })

    const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days)

    await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    })

    const tokenReturn: IResponse = {
      token,
      refresh_token,
      user: {
        email: user.email,
        name: user.name
      }
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase }