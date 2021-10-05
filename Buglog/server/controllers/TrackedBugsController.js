import { Auth0Provider } from '@bcwdev/auth0provider'
import { trackedBugsService } from '../services/TrackedBugsService.js'
import BaseController from '../utils/BaseController.js'
export class TrackedBugsController extends BaseController {
  constructor() {
    super('api')
    this.router
      .get('/bugs/:bugId/trackedbugs', this.getTrackedAccBug)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/trackedbugs', this.createTrackedBug)
      .delete('/trackedbugs/:trackedBugId', this.removeTrackedBug)
  }

  async createTrackedBug(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const trackedBug = await trackedBugsService.createTrackedBug(req.body)
      res.send(trackedBug)
    } catch (error) {
      next(error)
    }
  }

  async removeTrackedBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const trackedBug = await trackedBugsService.removeTrackedBug(req.params.trackedBugId)
      res.send(trackedBug)
    } catch (error) {
      next(error)
    }
  }

  async getTrackedAccBug(req, res, next) {
    try {
      const accs = await trackedBugsService.getTrackedAccBug(req.params.accountId)
      res.send(accs)
    } catch (error) {

    }
  }
}
