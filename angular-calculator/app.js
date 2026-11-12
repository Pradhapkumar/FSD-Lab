var app = angular.module("calculatorApp", []);

app.controller("CalculatorController", function ($scope) {
  $scope.display = "";

  // Add number or operator
  $scope.append = function (value) {
    if ($scope.display === "Error") {
      $scope.display = value;
      return;
    }
    $scope.display = String($scope.display) + value;
  };

  // Clear calculator
  $scope.clear = function () {
    $scope.display = "";
  };

  // Delete last character
  $scope.delete = function () {
    if ($scope.display === "Error") {
      $scope.display = "";
      return;
    }
    $scope.display = String($scope.display).slice(0, -1);
  };

  // Calculate arithmetic expression safely
  $scope.calculate = function () {
    var expression = String($scope.display).trim();
    if (!expression) {
      return;
    }

    // Permit only numeric arithmetic expressions
    if (!/^[0-9+\-*/.%() ]+$/.test(expression)) {
      $scope.display = "Error";
      return;
    }

    try {
      var result = Function('"use strict"; return (' + expression + ");")();
      if (typeof result !== "number" || !Number.isFinite(result)) {
        $scope.display = "Error";
      } else {
        $scope.display = String(result);
      }
    } catch (error) {
      $scope.display = "Error";
    }
  };
});

