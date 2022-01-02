import { AccountModel } from "../../../domain/models/account"
import { LoadAccountByEmailRepository } from "../../protocols/load-account-by-email-repository"
import { DbAuthentication } from "./db-authentication"

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
      async load(email: string): Promise<AccountModel> {
        const account: AccountModel = {
          id: 'any_id',
          email: 'any_email@mail.com',
          name: 'any_name',
          password: 'any_password'
        }
        return new Promise(resolve => resolve(account))
      }
    }
    const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})