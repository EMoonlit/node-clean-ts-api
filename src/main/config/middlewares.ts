import { Express } from 'express'
import { bodyParser } from '../middlewares/bosy-parser'

export default (app: Express): void => {
  app.use(bodyParser)
}
