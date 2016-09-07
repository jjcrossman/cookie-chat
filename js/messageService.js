angular.module('chatroom').service('messageService', function($http, baseURL, cookieURL) {

    //Methods that GET messages or cookies
    this.getMessages = function() {
        return $http.get(baseURL).then(function(response) {
            if (response.status === 200) {
                return response.data.reverse();
            }
            return "Error: " + response.status;
        })
    };

    this.getCookie = function () {
      return $http( {
        method: 'GET'
        , url: cookieURL
      } )
      .then( function ( response ) {
          if ( response.status === 200 ) {
            return response.data.cookies;
          }
      });
    }

    //Methods that POST message or cookie
    this.postMessage = function(newMessage) {
        return $http.post(baseURL, {message: newMessage})
            .then( function( response ) {
                console.log("message POST successful: " + newMessage.message);
            })

    };



  this.postCookie = function (newCookie) {
    return $http.post(cookieURL, newCookie)
      .then( function ( response ) {
          console.log("cookie POST successful: " + JSON.stringify(newCookie) );
      });

  };

  });

// Object:{
// $$hashKey: "003", cookie: "Great Butter Cookie", createdAt: "2016-09-07T18:23:30.034Z", message: "Test"
// }
