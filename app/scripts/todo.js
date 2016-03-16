;
(function(){
  'use strict';

  // constructor for inputting a new task
  function taskAdded(todo){
    this.todo = ko.observable(todo);
    this.completed = ko.observable(false);
    this.editing = ko.observable();
  };

  // root ViewModel; instantiates list of tasks, and exposes methods associated with adding task to the list
  function ToDoViewModel(){
    var self = this;

    this.thisToDo = ko.observable('');
    this.tasks = ko.observableArray([
      new taskAdded('Drink the beers'),
      new taskAdded('Read the books'),
      new taskAdded('Watch the shows')
    ]);
    this.addTask = function(){
      if (this.thisToDo().length > 0) {
        this.tasks.push(new taskAdded(self.thisToDo()));
      }
      this.thisToDo('');
    };
    this.enterAdd = function(unused, event){
      if (this.thisToDo().length > 0 && event.keyCode === 13) {
        this.addTask();
      }
    };

    // looks for a task that hasn't been completed and returns true or false as appropriate
    this.tasksRemaining = ko.pureComputed(function(){
      return !!_.find(this.tasks(), function(task){
        return !task.completed();
      });
    }, this);
  };

  // custom binding for handling keyup events when editing an existing task
  ko.bindingHandlers.keyUpHandler = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext){
      var value = ko.unwrap(valueAccessor()),
          context = bindingContext.$data,
          rootContext = bindingContext.$component,
          keyUpHandler = function(e){
            if (e.keyCode === 13) {
              rootContext.saveEditing(context);
            } else if (e.keyCode === 27){
              rootContext.cancelEditing(context);
            }
          };

      if (value) {
        $(element).focus();
        $(element).on('keyup', keyUpHandler);
      }
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext){
      var value = ko.unwrap(valueAccessor()),
          keyUpHandler = function(e){
            if (e.keyCode === 13) {
              rootContext.saveEditing(context);
            } else if (e.keyCode === 27){
              rootContext.cancelEditing(context);
            }
          };

      if (!value) {
        $(element).off('keyup', keyUpHandler);
      }
    }
  };

  // custom binding to launch modal when there are no remaining tasks left
  ko.bindingHandlers.noTaskModal = {
    update: function(element, valueAccessor){
      var remainingTasksLeft = ko.unwrap(valueAccessor());

      !remainingTasksLeft ? $(element).modal('show') : null;
      setTimeout(function(){
        $(element).modal('hide');
      }, 2500);
    }
  };

  // taskList component reusable for various lists, exposes methods for changing existing tasks
  function taskListViewModel(params){
    params = params || {};

    this.tasks = params.tasks;
    this.removeTask = function(task){
      this.tasks.remove(task);
    }.bind(this);

    this.editTask = function(task){
      task.originalTodo = ko.unwrap(task.todo);
      task.editing(true);
    };

    this.saveEditing = function(task){
      var todo = ko.unwrap(task.todo);

      if (!todo && todo.length === 0){
        this.tasks.remove(task);
      } else {
        task.editing(false);
      }
    }.bind(this);

    this.cancelEditing = function(task){
      task.todo(task.originalTodo);
      task.editing(false);
    };
  };

  // custom component registration using template element from index.html and viewModel above
  ko.components.register('task-list', {
    viewModel: taskListViewModel,
    template: { element: 'task-list-component' }
  });

  // apply main app bindings to the browser
  ko.applyBindings(new ToDoViewModel());
})();
