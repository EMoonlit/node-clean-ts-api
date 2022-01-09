import { Router } from "express";
import { makeSignUpController } from '../factories/signup/signup-factory'
import { adapterRoute } from '../adapters/express-route-adaoter'

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignUpController()))
}
