angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state,$ionicSideMenuDelegate) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.loginData.isLogged = false;

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  if ($scope.loginData.isLogged === false) {
    $state.go('login');
  }
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
    //console.log("asda");
    $ionicSideMenuDelegate.canDragContent(true);
    $state.go('app.main');
    $ionicSideMenuDelegate.canDragContent(true);
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

    if ($scope.loginData.username == "mekhti" && $scope.loginData.password == "mekhti") {
      $scope.loginData.isLogged = true;
      console.log('Doing login', $scope.loginData);
      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      //$timeout(function() {
      $scope.closeLogin();
      //}, 1000);
    }
    else{
      $scope.loginData.isLogged = false;
      $scope.loginData.username = "";
      $scope.loginData.password = "";
    }
  };
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
});
