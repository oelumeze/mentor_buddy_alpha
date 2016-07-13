angular.module('app.services', ['firebase'])

.service('emailInput', function(){

	var emailAddress = '';
	function setUserEmailAddress(myEmailAddress){
		emailAddress = myEmailAddress;
	}

	function getUserEmailAddress(){
		return emailAddress;
	}

	return{
		get : getUserEmailAddress,
		set : setUserEmailAddress
	}
})



//Using The service to create all our firebase CRUD operations
.service('Mentors', function($firebase, store, $state){

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
});

