import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO"
import { UserToken } from "../infra/typeorm/entities/UserTokens"


interface IUsersTokenRepository {
  create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserToken>;
  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserToken>
}

export { IUsersTokenRepository }