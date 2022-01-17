import { LogControllerDecorator } from "../../../decorators/log-controller-decorator"
import { makeLoginValidation } from './login-validation-factory'
import { Controller } from "../../../../presentation/protocols"
import { LoginController } from "../../../../presentation/controllers/login/login-controller"
import { LogMongoRepository } from '../../../../infra/db/mongodb/log/log-mongo-repository'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeDbAuthentication(), makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}