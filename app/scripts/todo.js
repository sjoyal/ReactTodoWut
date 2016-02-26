;
(function(){
  'use strict';

  // constructor for inputting a new task
  function taskAdded(todo){
    this.todo = ko.observable(todo);
    this.completed = ko.observable(false);
    this.editing = ko.observable();
    this.updateTodo = function(){
      this.editing(false);
    };
  };

  // this is the ViewModel
  function ToDoViewModel(){
    var self = this;

    this.thisToDo = ko.observable('');
    this.tasks = ko.observableArray([
      new taskAdded('Drink the beers'),
      new taskAdded('Read the books'),
      new taskAdded('Watch the shows')
    ]);
    this.addTask = function(){
      self.tasks.push(new taskAdded(self.thisToDo()));
      self.thisToDo('');
    };
    this.enterAdd = function(unused, event){
      if (self.thisToDo().length > 0 && event.keyCode === 13) {
        self.addTask();
      }
    };
    this.removeTask = function(task){
      self.tasks.remove(task);
    };

    // looks for a task that hasn't been completed and returns true or false as appropriate
    this.tasksRemaining = ko.pureComputed(function(){
      return !!_.find(this.tasks(), function(task){
        return !task.completed();
      });
    }, this);
  };

  // custom binding to set dialogue and launch modal
  ko.bindingHandlers.noTaskModal = {
    init: function(element, valueAccessor){
      $('.modal-text').text('No tasks to complete. Add some!');
    },
    update: function(element, valueAccessor){
      var remainingTasksLeft = ko.unwrap(valueAccessor());

      !remainingTasksLeft ? $(element).modal('show') : null;
      setTimeout(function(){
        $(element).modal('hide');
      }, 2500);
    }
  };

  // taskList component  reusable for various lists
  function taskListViewModel(params){
    params = params || {};

    this.tasks = params.tasks;
    this.removeTask = params.removeTask;
  };

  // custom component registration using template element from index.html and viewModel above
  ko.components.register('task-list', {
    viewModel: taskListViewModel,
    template: { element: 'task-list-component' }
  });

  // apply main app bindings to the browser
  ko.applyBindings(new ToDoViewModel());
})();
