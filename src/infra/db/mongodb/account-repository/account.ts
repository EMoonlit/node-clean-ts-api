import { AddAccountRepository } from "../../../../data/protocols/add-account-repository";
import { AccountModel } from "../../../../domain/models/account";
import { AddAccountModel } from "../../../../domain/usecases/add-account";
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne(result.insertedId)
    const { _id, ...accountSemOId } = account
    const formatedAccount = Object.assign({}, {
      id: _id.toString(),
      name: accountSemOId.name,
      email: accountSemOId.email,
      password: accountSemOId.password
    })
    return formatedAccount
  }
}