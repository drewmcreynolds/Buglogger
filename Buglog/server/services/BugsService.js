import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class BugsService {
  async getTrackedById(id) {
    const trackedBugs = await dbContext.TrackedBugs.find({ bugId: id }).populate('bug').populate('tracker')
    return trackedBugs
  }

  async getBugs(query) {
    const bugs = await dbContext.Bugs.find(query).sort('-updatedAt').populate('creator')
    return bugs
  }

  async getBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId).populate('creator')
    if (!bug) {
      throw new BadRequest('Invalid Bug ID')
    }
    return bug
  }

  async getByAccount(accountId) {
    const bugs = await dbContext.TrackedBugs.find({ accountId: accountId }).sort('-tracked').populate('bug')
    return bugs
  }

  async editBug(bugId, userId, bData) {
    const bug = await this.getBugById(bugId)
    if (userId !== bug.creatorId.toString()) {
      throw new Forbidden('You are not Authorized')
    }
    if (bug.closed === true) {
      throw new Forbidden('Closed can no longer edit')
    }
    bug.closed = bData.closed || bug.closed
    bug.closedDate = bData.closedDate || bug.closedDate
    bug.creator = bData.creator || bug.creator
    bug.creatorId = bData.creatorId || bug.creatorId
    bug.description = bData.description || bug.description
    bug.priority = bData.priority || bug.priority
    bug.title = bData.title || bug.title
    await bug.save()
    return bug
  }

  async createBug(bData) {
    const bug = await dbContext.Bugs.create(bData)
    await bug.populate('creator')
    return bug
  }

  async removeBug(bugId, userId) {
    const bug = await this.getBugById(bugId)
    if (userId !== bug.creatorId.toString()) {
      throw new Forbidden('You are not Authorized')
    }
    bug.closed = true
    await bug.save()
    return bug
  }
}

export const bugsService = new BugsService()
