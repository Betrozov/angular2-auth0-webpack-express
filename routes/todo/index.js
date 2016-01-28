var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Todo = mongoose.model('Todo');
var hasUser = require('../requiresLogin');

module.exports = function router(app) {
  app.get('/todo-list', hasUser, getTodo);

  app.post('/todo', hasUser, editTodo);
  app.put('/todo/:id', hasUser, editTodo);
  app.put('/todo-list-mark', hasUser, editTodoListMark);
  app.delete('/todo/:id', hasUser, removeTodo);
};

function getTodo(req, res) {
  var userId = mongoose.Types.ObjectId(req.user.userDbId);

  Todo.find({author: userId}).lean().exec(function (err, data) {
    res.json({success: !err, msg: [], data: data, error: err});
  });
}

function editTodo(req, res) {
  var params = req.params;
  var todo = req.body;

  if (!todo._id) {
    todo.author = req.user.userDbId;
    var newTodo = new Todo(todo);

    newTodo.save(function (err, todo) {
      res.json({success: !err, msg: [], data: todo, error: err});
    });

    return;
  }

  delete todo._id;

  Todo.update({_id: params.id}, {$set: todo}).exec(function (err, num) {
    res.json({success: !err, msg: [], data: num, error: err});
  });
}

function editTodoListMark(req, res) {
  var options = req.body;
  var userId = mongoose.Types.ObjectId(req.user.userDbId);

  Todo.update({author: userId}, {$set: {completed: options.completed}}, {multi: true}).exec(function (err, num) {
    res.json({success: !err, msg: [], data: num, error: err});
  });
}

function removeTodo(req, res) {
  var todoListId = req.params.id.split(',');

  Todo.remove({_id: {$in: todoListId}}).exec(function (err, num) {
    res.json({success: !err, msg: [], data: num, error: err});
  });
}
