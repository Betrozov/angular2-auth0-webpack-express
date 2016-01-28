var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  title: String,
  completed: Boolean,
  author: {type: Schema.Types.ObjectId, ref: 'Users'}
});

mongoose.model('Todo', todoSchema);
