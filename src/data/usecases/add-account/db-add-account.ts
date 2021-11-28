import { AccountModel, AddAccount, AddAccountModel, Encryper } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encryper

  constructor(encrypter: Encryper) {
    this.encrypter = encrypter
  }
  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return new Promise(resolve => resolve(null))
  }
}