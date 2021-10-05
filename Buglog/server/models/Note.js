import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const NoteSchema = new Schema(
  {
    body: { type: String, required: true },
    bugId: { type: Schema.Types.ObjectId, ref: 'bug', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

NoteSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
NoteSchema.virtual('bug', {
  localField: 'bugId',
  foreignField: '_id',
  ref: 'Bug',
  justOne: true
})
