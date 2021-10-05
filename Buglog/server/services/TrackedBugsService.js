import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class TrackedBugsService {
  async getTrackedAccBug(id) {
    const accs = await dbContext.TrackedBugs.find({ accountId: id }).populate('tracker').populate('bug')
    return accs
  }

  async getTrackedByAcc(id) {
    const bugs = await dbContext.TrackedBugs.find({ accountId: id }).populate('tracker').populate('bug')
    return bugs
  }

  async createTrackedBug(tData) {
    const trackedBug = await dbContext.TrackedBugs.create(tData)
    await trackedBug.populate('tracker')
    await trackedBug.populate('bug')
    return trackedBug
  }

  async removeTrackedBug(id) {
    const trackedBug = await dbContext.TrackedBugs.findByIdAndRemove(id)
    return trackedBug
  }

  // async removeTrackedBug(id, userId) {
  //   const trackedBug = await dbContext.TrackedBugs.findByIdAndRemove(id, userId)
  //   if (!trackedBug) {
  //     throw new BadRequest('Invalid')
  //   }
  //   if (trackedBug.accountId.toString() !== userId) {
  //     throw new Forbidden('You are not authorized')
  //   }
  //   return trackedBug
  // }
}

export const trackedBugsService = new TrackedBugsService()
