const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({ // Schema de Table de Data Base
  title: { type: String, required: true },
  content: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }
});

module.exports = mongoose.model('Comment', commentSchema);
