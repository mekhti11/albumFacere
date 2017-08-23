angular.module('starter.controllers', [])


.service("myProjectsSerice",function () {
  this.projects = [];
  //this.projects.items=[];


  this.saveProject = function(argument) {
    argument.items = [];
    this.projects.push(argument);

  };

  this.deleteProject = function(id){

    this.projects.splice(this.findProjectById(id),1);

  };

  this.addItemToProject = function (projectIndex,item) {
    
    this.projects[projectIndex].items.push(item);
  
  };

  this.deleteItemFromProject = function(projectIndex,itemId){

    this.projects[projectIndex].items.splice(this.findItemById(projecIndex,itemId),1);

  };

  this.findProjectById = function (id) {
    for (var i = 0; i < this.projects.length; i++) {
      if (this.projects[i].id == id) {
        return i;
      }
    }
    
  };

  this.findItemById = function (projectIndex,itemId) {
    for (var i = 0 ;i < this.projects[projectIndex].items.length;  i++) 
      if (this.projects[projectId].items[i].id == id) 
        return i;
  };

})


.controller('AppCtrl', function($scope, $ionicModal, $rootScope,$state,$ionicSideMenuDelegate,myProjectsSerice) {

  //init datas for this controller
  $scope.newProject = {};
  $scope.projects = myProjectsSerice.projects;
  $scope.loginData = {};
  $scope.menuInput ={};
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
      $scope.closeLogin();
    }
    else{
      $scope.loginData.isLogged = false;
      $scope.loginData.username = "";
      $scope.loginData.password = "";
      $state.go('login');
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

      $scope.newProject = {
        id : $scope.maxIdOfProjects + 1 , 
        title : param , 
        done : false  
      };

      myProjectsSerice.saveProject($scope.newProject);
      $scope.menuInput.title = "";
    }
  };

  $scope.deleteProject = function(id){
    myProjectsSerice.deleteProject(id);
    $state.go('app.main');
    $ionicSideMenuDelegate.canDragContent(true);
  };


})
.controller('ProjectCtrl', function($scope,$rootScope,$ionicSideMenuDelegate, $stateParams,myProjectsSerice) {
  
  //init datas for this controller
    $scope.projectIndex = myProjectsSerice.findProjectById($stateParams.id);
    $scope.project = myProjectsSerice.projects[$scope.projectIndex];


  $scope.addItemToProject = function () {
    console.log(1);
    console.log($scope.project);
    $scope.maxIdOfItems = 0;
    if($scope.project.items.length > 0){
      $scope.maxIdOfItems = $scope.project.items[0].itemId;
      for (var i = $scope.project.items.length - 1; i > 0; i--) {
        if($scope.maxIdOfItems < $scope.project.items[i].itemId)
          $scope.maxIdOfItems = $scope.project.items[i].itemId;
      }
    }
    $scope.newItem = {
      itemId : $scope.maxIdOfItems + 1,
      itemTitle : "param + 1",
      done : false
    };
    myProjectsSerice.addItemToProject($scope.projectIndex,$scope.newItem);
    
    
  };

});


