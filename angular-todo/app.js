var app = angular.module("todoApp", []);

app.controller("TodoController", function ($scope) {
  var STORAGE_KEY = "cs1510_todo_users";

  function loadUsers() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  $scope.saveUsers = function () {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify($scope.users));
    } catch (e) {
      // Ignore storage errors when running in restricted modes
    }
  };

  $scope.page = "register";
  $scope.loggedIn = false;
  $scope.users = loadUsers();
  $scope.tasks = [];
  $scope.registerError = "";
  $scope.registerMessage = "";
  $scope.loginMessage = "";

  $scope.switchPage = function (target) {
    $scope.page = target;
    $scope.registerError = "";
    $scope.loginMessage = "";
    if (target === "register") {
      $scope.registerMessage = "";
    }
  };

  // REGISTER USER
  $scope.register = function () {
    var username = ($scope.registerUsername || "").trim();
    var password = $scope.registerPassword || "";

    if (!username || !password) {
      $scope.registerError = "Please enter username and password.";
      return;
    }

    // Check whether username already exists
    var existingUser = $scope.users.find(function (user) {
      return user.username === username;
    });

    if (existingUser) {
      $scope.registerError = "Username already exists.";
      return;
    }

    // Create new user
    $scope.users.push({
      username: username,
      password: password,
      tasks: []
    });
    $scope.saveUsers();

    $scope.registerError = "";
    $scope.registerMessage = "Registration successful! Please login.";
    $scope.registerUsername = "";
    $scope.registerPassword = "";
    $scope.page = "login";
  };

  // LOGIN
  $scope.login = function () {
    var username = ($scope.loginUsername || "").trim();
    var password = $scope.loginPassword || "";

    var user = $scope.users.find(function (u) {
      return u.username === username && u.password === password;
    });

    if (user) {
      $scope.loggedIn = true;
      $scope.currentUser = user.username;
      $scope.currentUserObject = user;
      $scope.tasks = user.tasks;
      $scope.loginMessage = "";
      $scope.registerMessage = "";
    } else {
      $scope.loginMessage = "Invalid username or password.";
    }
  };

  // LOGOUT
  $scope.logout = function () {
    $scope.loggedIn = false;
    $scope.currentUser = "";
    $scope.currentUserObject = null;
    $scope.loginUsername = "";
    $scope.loginPassword = "";
    $scope.tasks = [];
    $scope.loginMessage = "";
    $scope.page = "login";
  };

  // ADD TASK
  $scope.addTask = function () {
    if ($scope.newTask && $scope.newTask.trim() !== "") {
      $scope.tasks.push({
        name: $scope.newTask.trim(),
        completed: false
      });
      $scope.newTask = "";
      $scope.saveUsers();
    }
  };

  // DELETE TASK
  $scope.deleteTask = function (index) {
    $scope.tasks.splice(index, 1);
    $scope.saveUsers();
  };

  // COUNT COMPLETED TASKS
  $scope.getCompletedCount = function () {
    return $scope.tasks.filter(function (task) {
      return task.completed;
    }).length;
  };
});

