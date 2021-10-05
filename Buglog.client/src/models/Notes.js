export class Note {
  constructor(nData) {
    this.body = nData.body
    this.bugId = nData.bugId
    this.creatorId = nData.creator.id
    this.creatorName = nData.creator.name
    this.id = nData.id
  }
}
