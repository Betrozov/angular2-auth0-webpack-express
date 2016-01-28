var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  user_id: String,
  role: String
});

mongoose.model('Users', usersSchema);
