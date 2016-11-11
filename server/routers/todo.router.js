var express = require('express');
var router = express.Router();
var Todo = require('../models/todo.model.js');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/todos', function(req, res){
  Todo.find({}, function(err, foundTodos){
    if(err){
      res.status(500).json({
        err: err
      });
    } else {
      res.status(200).json({
        todos: foundTodos
      });
    }
  });
});

router.get('/todos/:id', function (req, res){
  Todo.find({_id: req.params.id}, function(err, foundTodo){
    if(err){
      res.status(500).json({
        err: err
      });
    } else {
      res.status(200).json({
        todo: foundTodo
      });
    }
  });
});

router.get('/todos/description/:desc', function(req, res){
  Todo.find({description: req.params.desc}, function(err, foundTodos){
    if(err){
      res.status(500).json({
        err: err
      });
    } else {
      res.status(200).json({
        todos: foundTodos
      });
    }
  });
});

router.post('/todos', function(req, res){
  var todo = new Todo(req.body);
  todo.save(function(err){
    if(err){
      res.status(500).json({
        err: err
      });
    } else {
      res.status(201).json({
        msg: 'Successfully created todo'
      });
    }
  });
});

router.put('/todos/:id', function(req, res){
  Todo.findOneAndUpdate({_id: req.params.id}, req.body, function(err, oldTodo){
    if(err){
      res.status(500).json({
        err: err
      });
    } else {
      res.status(200).json({
        msg: oldTodo
      });
    }
  });
});

router.delete('/todos/:id', function(req, res){
  Todo.findOneAndRemove({_id: req.params.id}, function(err, deletedTodo){
    if(err){
      res.status(500).json({
        err: err
      });
    } else {
      res.status(200).json({
        msg: deletedTodo
      });
    }
  });
});

module.exports = router;
