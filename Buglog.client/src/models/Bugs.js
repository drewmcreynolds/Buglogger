export class Bugs {
  constructor(bData) {
    this.closed = bData.closed
    this.closedDate = bData.closedDate
    this.creatorId = bData.creatorId
    this.creatorName = bData.creator.name
    this.description = bData.description
    this.id = bData.id
    this.title = bData.title
    this.priority = bData.priority
    this.updatedAt = bData.updatedAt
  }
}
