// Code goes here
/**
 * main javascript code. 
 * including custom directives for 3 components
 * planker link:http://next.plnkr.co/edit/ueqbw49sDMKtdRbX
 * @author: Grace Song
 */

var userAccountApp = angular.module("userAccountApp", []);
userAccountApp.service("getDataService", GetDataService);

userAccountApp.controller("userDetailController", ["$scope", "$http", "getDataService",
  function userDetailController($scope, $http, getDataService) {

    // dummy data for loged in user
    $scope.account = {
      name: "Peter Hoang",
      img: "http://www.sixsigmahospital.com/wp-content/uploads/2018/04/person-icon.png"
    };

    // user list to display in sidebar
    $scope.users = [];

    // selected user to display detail in right panel
    $scope.activeUser = {};

    // keep track of keyword entered in search box
    $scope.searchKeyword = "";

    // get data from service at the beginning of app
    $scope.loadData = function() {
      var req = getDataService.getData();
      req.then(function(res) {
        $scope.users = res.data.People;
      //  $scope.title = res.data.People;
        $scope.loadUser($scope.users[0]);
      },
      function errorCallbck(res){
        $scope.title = res;
      });
    }

    $scope.loadData();

    // load user detail to the right panel. at the beginning, load the first user
    $scope.loadUser = function(user) {
      // for rating with heart array
      user.ratingArray = [];
      for(var i = 1; i <= 5; i++) {
        if(user.rating >= i) {
          user.ratingArray.push(true);
        } else {
          user.ratingArray.push(false);
        }
      }

      // for the preference table
      var maxLen = Math.max(user.Likes.length, user.Dislikes.length);
      user.preferences = [];
      for(var i = 0; i < maxLen; i++) {
        user.preferences.push({like: user.Likes[i], dislike: user.Dislikes[i]});
      }
      $scope.activeUser = user;
    }

}]);

// custom directive for header
userAccountApp.directive("header", function header() {
  var directive = {};
  directive.templateUrl = "header.component.html";
  directive.restrict = "E";
  directive.scope = {
    user: "=",
    searchKeyword: "=",
    search: "&"
  };

  return directive;
});
 
// custom directive for sidebar 
userAccountApp.directive("sidebar", function sidebarDirective() {
  var directive = {};
  directive.templateUrl = "sidebar.component.html";
  directive.restrict = "E";
  directive.scope = {
    users: "=",
    searchKeyword: "=",
    click: "&"
  };
  directive.controller = function($scope) {
    // keep track of active/selected user
    $scope.selectedArray = [];

    // defaul is the first user
    $scope.selectedArray[0] = true;

    // check if target is selected
    $scope.getClass = function(index) {
      return $scope.selectedArray[index] ? "active" : "";
    }

    // event handler of clicking new user
    $scope.selectNew = function(index) {
      $scope.click({user: $scope.users[index]});
      $scope.selectedArray = [];
      $scope.selectedArray[index] = true;
    }
  };

  return directive;
});

// custom directive for user detail panel
userAccountApp.directive("userDetail", function userDetailDirective() {
  var directive = {};
  directive.templateUrl = "userDetail.component.html";
  directive.restrict = "E";
  directive.scope = {
    user: "="
  };

  return directive;
});
