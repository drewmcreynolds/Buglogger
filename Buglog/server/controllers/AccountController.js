import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { trackedBugsService } from '../services/TrackedBugsService.js'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/trackedbugs', this.getTrackedByAccount)
      .get('', this.getUserAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getTrackedByAccount(req, res, next) {
    try {
      const bugs = await trackedBugsService.getTrackedByAcc(req.userInfo.id)
      res.send(bugs)
    } catch (error) {
      next(error)
    }
  }
}
