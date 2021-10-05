import { AppState } from '../AppState.js'
import { api } from './AxiosService.js'
import { router } from '../router.js'
import { logger } from '../utils/Logger.js'

class BugsService {
  async getBugs() {
    const res = await api.get('api/bugs')
    logger.log('get the bugs log the res', res)
    AppState.bugs = res.data
    AppState.sortedBugs = res.data
  }

  async getBugById(bugId) {
    AppState.currentBug = {}
    const res = await api.get(`api/bugs/${bugId}`)
    logger.log('getting bugs by id log the res', res)
    AppState.currentBug = res.data
  }

  async getTrackedBugs(bugId) {
    AppState.trackedBugs = []
    const res = await api.get(`api/bugs/${bugId}/trackedbugs`)
    logger.log('tracked bugs log the res', res)
    AppState.trackedBugs = res.data
    logger.log('tracked bugs in appstate', AppState.trackedBugs)
  }

  async getBugsNotes(bugId) {
    AppState.notes = []
    const res = await api.get(`api/bugs/${bugId}/notes`)
    logger.log('getting notes log the res', res)
    AppState.notes = res.data
  }

  async createBug(bugData) {
    const res = await api.post('api/bugs', bugData)
    logger.log('creating a bug log the res', res)
    AppState.bugs.unshift(res.data)
    router.push({ name: 'BugDetails', params: { bugId: res.data.id } })
  }

  async editBug(edited, bugId) {
    AppState.currentBug = {}
    const res = await api.put(`api/bugs/${bugId}`, edited)
    logger.log('change the bug up log the res', res)
    AppState.currentBug = res.data
  }

  async closeBug(bugId) {
    const res = await api.delete(`api/bugs/${bugId}`)
    logger.log('closing the bug log the res', res)
    AppState.currentBug = res.data
  }
}

export const bugsService = new BugsService()
