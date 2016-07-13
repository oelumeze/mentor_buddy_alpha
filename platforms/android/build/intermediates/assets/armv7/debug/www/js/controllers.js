angular.module('app.controllers', [])
  
.controller('timelineCtrl', function($scope) {

})
   
.controller('mentorConnectCtrl', function($scope) {

})
   
.controller('profileCtrl', function() {

	//Retreive the user's information from linkedIn
	//$scope.fullname = auth.profile.name;
	//$scope.imageUrl = auth.profile.picture;
})
   
.controller('notificationsCtrl', function($scope) {

})
 

.controller('loginCtrl', function($scope, store, $state, $location, auth, Mentors) {

	$scope.signUpWithLinkedIn = function() {
		// body...
		auth.signin({
			authParams : {

				scope: 'openid offline_access',
				device : 'Mobile device'
			}

		},function(profile, token, accessToken, state, refreshToken){
			//success
			store.set('profilej', profile);
			store.set('token', token);
			store.set('refreshToken', refreshToken);
			//$location.path('/userprofile');
			Mentors.add({
				//the JSON tree of my firebase database
				email : auth.profile.email,
				otherInfo :
				{
					name : auth.profile.name	
				}
			});
			$state.go('tabsController.profile');

		},	function(){

			//error
		}

		)
	},

	$scope.login = function(){

		/*Mentors.add({
			//the JSON tree of my firebase database
			email : "o.elumeze@yahoo.com",
			otherInfo :
			{
				name : "Ogo Elumeze"	
			}
		});*/
		console.log("aaaad");
		//$state.go('tabsController.profile');
	}
	
})
   
.controller('mentorsCtrl', function($scope) {

})
 