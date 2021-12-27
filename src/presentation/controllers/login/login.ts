import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols'
import { Controller } from '../../protocols/controller'

export class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      const result = await badRequest(new MissingParamError('email'))
      return result
    }
    if (!httpRequest.body.password) {
      const result = await badRequest(new MissingParamError('password'))
      return result
    }
  }
}