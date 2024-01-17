const   mongoose = require('mongoose');
const Schema = mongoose.Schema

const timerSchema = new Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  });

module.exports = mongoose.model('Timer', timerSchema)