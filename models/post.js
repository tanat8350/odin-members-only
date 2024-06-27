const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, minLength: 3, maxLength: 100, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

PostSchema.virtual('url').get(function () {
  return `/post/${this._id}`;
});

module.exports = mongoose.model('Post', PostSchema);
