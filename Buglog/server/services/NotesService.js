import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class NotesService {
  async createNote(nData) {
    const note = await dbContext.Notes.create(nData)
    await dbContext.Notes.findById(note.id)
    await note.populate('creator').execPopulate
    await note.populate('bug').populate
    return note
  }

  async getNotesByAccount(accountId) {
    const notes = await dbContext.Notes.find({ accountId: accountId }).populate('note')
    return notes
  }

  async getNoteBugById(id) {
    const notes = await dbContext.Notes.find({ bugId: id }).populate('creator')
    if (!notes) {
      throw new BadRequest('Invalid Bug ID')
    }
    return notes
  }

  async removeNote(noteId, userId) {
    const note = await dbContext.Notes.findById(noteId)
    if (!note) {
      throw new BadRequest('Invalid')
    }
    if (note.creatorId.toString() !== userId) {
      throw new Forbidden('You are not authorized')
    }
    await dbContext.Notes.findByIdAndDelete(noteId)
    await note.delete()
    return note
  }
}

export const notesService = new NotesService()
