import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService.js'
import BaseController from '../utils/BaseController.js'
export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
      .delete('/:noteId', this.removeNote)
  }

  async createNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const note = await notesService.createNote(req.body)
      note.creator = req.userInfo
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async removeNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.bugId = req.params.bugId
      const note = await notesService.removeNote(req.params.noteId, req.userInfo.id)
      note.creator = req.userInfo
      res.send(note)
    } catch (error) {
      next(error)
    }
  }
}
