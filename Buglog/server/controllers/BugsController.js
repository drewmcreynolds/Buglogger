import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService.js'
import { notesService } from '../services/NotesService.js'
import BaseController from '../utils/BaseController.js'
import { logger } from '../utils/Logger.js'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getBugs)
      .get('/:bugId', this.getBug)
      .get('/:bugId/notes', this.getNoteBugById)
      .get('/:bugId/trackedbugs', this.getTrackedById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .put('/:bugId', this.editBug)
      .delete('/:bugId', this.removeBug)
  }

  async getNoteBugById(req, res, next) {
    try {
      const notes = await notesService.getNoteBugById(req.params.bugId)
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getTrackedById(req, res, next) {
    try {
      const trackedBugs = await bugsService.getTrackedById(req.params.bugId)
      res.send(trackedBugs)
    } catch (error) {
      next(error)
    }
  }

  async getBug(req, res, next) {
    try {
      const bug = await bugsService.getBugById(req.params.bugId)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getBugs(req, res, next) {
    try {
      const bugs = await bugsService.getBugs(req.query)
      res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      const bug = await bugsService.editBug(req.params.bugId, req.userInfo.id, req.body)
      res.send(bug)
    } catch (error) {
      next(error)
      logger.error('edit Error', error)
    }
  }

  async removeBug(req, res, next) {
    try {
      const bug = await bugsService.removeBug(req.params.bugId, req.userInfo.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.createBug(req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }
}
