angular.module('chatroom').controller('mainCtrl', function($scope, messageService){
  //Handles toggling b/w Message and Cookie input
  $scope.show = true;

//Functions for GET messages or cookie
  $scope.getMessages = function () {
    messageService.getMessages().then( function ( messages ) {
      console.log( messages[0] );
      $scope.messages = messages;
    })
  };

  $scope.getCookie = function () {
    messageService.getCookie().then( function ( cookie ) {
      console.log( cookie );
      $scope.cookie = cookie;
    })
  };

  //functions for POST messages or cookie
  $scope.postMessage = function ( newMessage ) {
    // var obj2POST = {
    //   message: newMessage
    // }

    messageService.postMessage( newMessage ).then( function ( ) {
      $scope.getMessages();
    } );
    $scope.message = "";
  };

  $scope.postCookie = function ( newCookie ) {
    var cookieObj = {
      "Great Butter Cookie": false
      , "Flavorful Butter Cookie": false
    };
    if ( newCookie.toLowerCase() === "great butter cookie" ) {
      cookieObj["Great Butter Cookie"] = true;
    }
    else if ( newCookie.toLowerCase() === "flavorful butter cookie" ) {
      cookieObj["Flavorful Butter Cookie"] = true;
    }
    else {
      $scope.cookiez = "";
      return console.log("Your cookie is inferior, please send a valid cookie type");
    }
    messageService.postCookie( cookieObj ).then( function () {
      $scope.getCookie();
    } );
    $scope.cookiez = "";
  };

  //GET messages and cookies on angular module load
  $scope.getMessages();
  $scope.getCookie();

  //This goes and gets new data every 1500ms, which mimicks a chat room experience.
  setInterval(function(){
    $scope.getMessages();
  }, 1500)
  setInterval(function(){
    $scope.getCookie();
  }, 1500)

});
