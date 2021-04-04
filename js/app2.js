var app = angular.module('myApp',["ngRoute"]);
app.config(function($routeProvider){
  $routeProvider
  .when('/',{
    templateUrl:'/html/signIn.html'
  })
  .when('/signUp',{
    templateUrl:'/html/signUp.html'
  })
  .otherwise({
    redirectTo:'/'
  });
});
