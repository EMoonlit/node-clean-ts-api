import { Authentication } from '../../../domain/usecases/authentication'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols'
import { Controller } from '../../protocols/controller'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor(emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        const result = await badRequest(new MissingParamError('email'))
        return result
      }
      if (!password) {
        const result = await badRequest(new MissingParamError('password'))
        return result
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        const result = await badRequest(new InvalidParamError('email'))
        return result
      }
      await this.authentication.auth(email, password)

    } catch (error) {
      return serverError(error)
    }
  }
}
