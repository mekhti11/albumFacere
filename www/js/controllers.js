angular.module('starter.controllers', ['firebase'])



.controller('AppCtrl', function($scope,$firebaseAuth,$firebaseArray,$ionicModal,$ionicPopup, $rootScope,$state,$ionicSideMenuDelegate) {

  //init datas for this controller
  var ref  = firebase.database().ref().child('projects');

  $scope.newProject = {};
  $scope.projects = $firebaseArray(ref);
  $scope.loginData = {};
  $scope.menuInput ={};
  $scope.loginData.isLogged = false;

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
 /* if ($scope.loginData.isLogged === false) {
    $state.go('login');
  }
*/

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

    var username = $scope.loginData.username;
    var password = $scope.loginData.password;
    var auth = $firebaseAuth();
    auth.$signInWithEmailAndPassword(username,password).then(function(){
      console.log("Logged in Successfully");
      $scope.loginData.isLogged = true;
      $scope.closeLogin();
    }).catch(function(error){
      var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
      $scope.loginData.isLogged = false;
      $scope.loginData.username = "";
      $scope.loginData.password = "";
      $state.go('login');
    });

  };

  $scope.getHelp = function () {
    var alertPopup = $ionicPopup.alert({
                title: 'Login Details!',
                template: 'username : mekhti11@gmail.com  password : mekhti11 '
            });
  };

  $scope.findProjectById = function (id) {
    for (var i = 0; i < $scope.projects.length; i++) {
      if ($scope.projects[i].id == id) {
        return i;
      }
    }
    
  };



  //menu.addNewProject()
  $scope.addNewProject = function(param){
    if(param){

      //To avoiding to assign same id for orojects
      $scope.maxIdOfProjects = 0 ;
      if($scope.projects.length > 0){
        $scope.maxIdOfProjects = $scope.projects[0].id;      
        for (var i = 1; i < $scope.projects.length; i++) 
          if($scope.maxIdOfProjects < $scope.projects[i].id)
              $scope.maxIdOfProjects = $scope.projects[i].id;
      }

      $scope.projects.$add({
        id : $scope.maxIdOfProjects + 1 , 
        title : param , 
        done : false ,
      }).then(function(ref){
        console.log("add works ok");
      });

      $scope.menuInput.title = "";
      console.log($scope.projects.length);
    }
  };

  $scope.deleteProject = function(param){
    
    var fer  = firebase.database().ref().child('items');
    $scope.itemsAll = $firebaseArray(fer);
    $scope.itemsAll.$loaded()
    .then(function(){
        angular.forEach($scope.itemsAll, function(item) {
          if(item.projectId == param.id)
            $scope.itemsAll.$remove(item);
        });
    });
    $scope.projects.$remove(param);
    $state.go('app.main');
    $ionicSideMenuDelegate.canDragContent(true);
  };

  $scope.chosenProject = function(id){
    $scope.chosenProjectId = id;
    console.log($scope.projects[$scope.findProjectById(id)]);

  };

})
.controller('ProjectCtrl', function($scope,$firebaseArray,$rootScope,$ionicSideMenuDelegate, $stateParams) {
  
  //init datas for this controller
    var ref  = firebase.database().ref().child('items');
    $scope.itemsAll = $firebaseArray(ref);
    $scope.items = [];
    $scope.projectInput = {};
    
  // initing items
  
  $scope.init = function(){
    $scope.items = [];
    $scope.itemsAll.$loaded()
    .then(function(){
        angular.forEach($scope.itemsAll, function(item) {
          if(item.projectId == $stateParams.id)
            $scope.items.push(item);
        });
    });   
  };$scope.init();
  


  $scope.addItemToProject = function (param) {

    if (param) {
      $scope.itemsAll.$add({
        projectId : $stateParams.id,
        itemTitle : param,
        itemDone : false
      }).then(function(ref){
        //
      });

      
      $scope.projectInput.newItemTitle = "";
      $scope.init();
    } 
  };

  $scope.deleteItemFromProject = function (item) {
      $scope.itemsAll.$remove(item);
      $scope.init();
  };

  $scope.itemChanged = function(param){
    $scope.itemsAll.$loaded()
    .then(function(){
        angular.forEach($scope.itemsAll, function(item) {
          if(item == param){
            $scope.itemsAll.$remove(item);
            $scope.itemsAll.$add(param);
            //$scope.init();
          }
        });
      });
  };

});
