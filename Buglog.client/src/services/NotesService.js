import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class NotesService {
  async createNote(nData) {
    const res = await api.post('api/notes', nData)
    logger.log('createNote', res)
    AppState.notes = [...AppState.notes, res.data]
  }

  async deleteNote(noteId) {
    const res = await api.delete(`api/notes/${noteId}`)
    logger.log('delortNotes', res)
    AppState.notes = AppState.notes.filter(n => n.id !== noteId)
  }
}

export const notesService = new NotesService()
