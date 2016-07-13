String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};
(function(angular) {
angular.module('app.services', ['firebase'])
.value('fbUrl', 'https://blistering-inferno-3394.firebaseio.com/mentors')
.value('ConnectionsUrl', 'https://blistering-inferno-3394.firebaseio.com/connections')

.service('emailInput', function(){

	var emailAddress = '';
	function setUserEmailAddress(myEmailAddress){
		emailAddress = myEmailAddress;
		sessionStorage.setItem(emailAddress, emailAddress)
	}
	function getUserEmailAddress(){

		return sessionStorage.getItem(emailAddress);
	}
	return{
		get : getUserEmailAddress,
		set : setUserEmailAddress
	}
})

.factory('loginFactory', function(fbUrl, loginAccessFactory){
	return function(){
		var firebaseRef = new Firebase(fbUrl);
		return new loginAccessFactory(firebaseRef);
	};
})

.factory('ConnectionsFactory', function(ConnectionsUrl, $firebaseArray){
	return function(){
		var firebaseRef = new Firebase(ConnectionsUrl);
		return $firebaseArray(firebaseRef);
	}
})

.factory('AcceptedFactory', function(ConnectionsUrl, AcceptedConnFactory){
	return function(){
		var firebaseRef = new Firebase(ConnectionsUrl);
		return new AcceptedConnFactory(firebaseRef);
	}
})

.factory('AcceptedConnFactory', function($firebaseArray, $q, $firebase){
	return $firebaseArray.$extend({
		findAcceptedConnections:function(emailAddress){
			var deferred = $q.defer();
			this.$ref().orderByChild("AddedBy").equalTo(emailAddress).once("value", function(dataSnapshot){
				//dataSnapshot.val();
				if(dataSnapshot.val()){
					deferred.resolve(dataSnapshot.val());
				}
			});
			return deferred.promise;
		}
	});
})

.factory('SingleFactory', function(ConnectionsUrl, SingleValueFactory){
	return function(){
		var firebaseRef = new Firebase(ConnectionsUrl);
		return new SingleValueFactory(firebaseRef);
	}
})

.factory('SingleValueFactory', function($firebaseArray, $firebase){
	return $firebaseArray.$extend({
		returnId:function(emailAddress){
			var connectionId = '';
			this.$ref().orderByChild('AddedBy').equalTo(emailAddress).once("value", function(dataSnapshot){
				
			})
			return connectionId;
		}
	})
})




.factory('loginAccessFactory', function($firebaseArray, $q, $firebase){
  return $firebaseArray.$extend({
    findUserByEmail:function(seriesName){
      var deferred = $q.defer();
      if (seriesName == '') {
        deferred.reject("seriesName is empty.");
      }
     	this.$ref().orderByChild("email").equalTo(seriesName).once("value", function(dataSnapshot){
        if(dataSnapshot.val()){
          deferred.resolve(dataSnapshot.val());
        } else {
          deferred.reject("Not found.");
        }
      });
      return deferred.promise;
    }
  });
});

//Using The service to create all our firebase CRUD operations
/*.service('Mentors', function($firebase, store, $state){

	var token = 'kgU7de4dXpEmdzD0uLzwyfLBBn19jzRfzC9OKh7G';
	var MentorsRef = new Firebase("https://blistering-inferno-3394.firebaseio.com/mentors");
	//var obj = $firebaseObject(MentorsRef);
	MentorsRef.authWithCustomToken(token, function(error, auth) {
	  if (error) {
	    // There was an error logging in, redirect the user to login page
	    $state.go('login');
	  }
	});
	var MentorSync = $firebase(MentorsRef);
	var mentors = MentorSync.$asArray();  //These object will call all API reference to sync data to firebase

	//To add a new user data to firebase
	this.add = function(mentor) {
	  mentors.$add(mentor);
	};

	//To get a user's record in firebase
	this.get = function(id){
		return mentors.$getRecords(id);
	};
});*/
})(window.angular);
