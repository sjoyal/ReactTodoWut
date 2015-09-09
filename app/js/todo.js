(function(){

  // this is the ViewModel
  function ToDoViewModel(){
    var self = this;
    // constructor for inputting a new task
    function taskAdded(todo){
      this.todo = todo;
      this.completed = ko.observable(false);
    };
    this.tasks = ko.observableArray([
      new taskAdded('Drink the beers'),
      new taskAdded('Read the books'),
      new taskAdded('Watch the shows')
    ]);
    this.addTask = function(task){
      self.tasks.push(new taskAdded(task));
    };
    // research this .remove() method, is this from knockout and reads the index #?
    this.removeTask = function($index){
      self.tasks.remove($index);
      // self.tasks.splice(index, 1);
    };
    // FIXME: This probably isn't right, research how to feed it the approp. index
    // this.completeTask = function($index){
    //   self.tasks[$index].completed = true;
    // };
  };

  // apply bindings to the browser
  ko.applyBindings(new ToDoViewModel());

})();
