(function(){

  // constructor for inputting a new task
  function taskAdded(task){
    this.task = task;
    this.completed = false;
  };

  // this is the ViewModel
  function ToDoViewModel(){
    var self = this;
    this.tasks = ko.observableArray([
      new taskAdded('Drink the beers'),
      new taskAdded('Read the books'),
      new taskAdded('Watch the shows')
    ]);
    this.addTask = function(task){
      self.tasks.push(new taskAdded(task));
    };
    // research this .remove() method, is this from knockout and reads the index #?
    this.removeTask = function(task){
      self.tasks.remove(task);
      // self.tasks.splice(index, 1);
    };
    // FIXME: This probably isn't right, research how to feed it the approp. index
    this.completeTask = function(index){
      self.tasks[index].completed = true;
    };
  };

  // apply bindings to the browser
  ko.applyBindings(new ToDoViewModel());

})();
