import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols'
import { Controller } from '../../protocols/controller'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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
  }
}