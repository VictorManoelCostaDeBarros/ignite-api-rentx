import { AppError } from './../../../../shared/errors/AppError';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvidere';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory

describe("Send forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    mailProvider = new MailProviderInMemory()
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })

  it("should be able to send a forgot password mail an user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail")

    await usersRepositoryInMemory.create({
      driver_license: "1234",
      email: "test@email.com",
      name: "teste",
      password: "1234"
    })

    await sendForgotPasswordMailUseCase.execute("test@email.com")

    expect(sendMail).toHaveBeenCalled()
  })

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("asda@123.com")
    ).rejects.toEqual(new AppError("User does not exists!"))
  })

  it("should be able to create an users token", async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create")

    await usersRepositoryInMemory.create({
      driver_license: "1234",
      email: "test@email.com",
      name: "teste",
      password: "1234"
    })

    await sendForgotPasswordMailUseCase.execute("test@email.com")

    expect(generateTokenMail).toBeCalled()

  })
})