;
(function(){

  // constructor for inputting a new task
  function taskAdded(todo){
    this.todo = todo;
    this.completed = ko.observable(false);
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
    this.removeTask = function($index){
      self.tasks.remove($index);
    };
  };

  // apply bindings to the browser
  ko.applyBindings(new ToDoViewModel());

})();
