angular.module('app.controllers', [])
  
.controller('timelineCtrl', function($scope) {

})
   
.controller('mentorConnectCtrl', function($scope, fbUrl, $firebaseObject) {
	
})
   
.controller('profileCtrl', function($scope,emailInput, fbUrl, $firebaseArray) {
	//Retreive the user's information from firebase
	var getUserEmail = emailInput.get()
	var seriesRef = new Firebase(fbUrl);
	var seriesCollection = $firebaseArray(seriesRef);
	seriesCollection.$ref().orderByChild('EmailAddress').equalTo(getUserEmail).once("value", function(profileSnapShot){
		if(profileSnapShot.val()){
			profileSnapShot.forEach(function(profileDataSnapShot){
				$scope.industry = profileDataSnapShot.val().Industry;
				$scope.imageUrl = profileDataSnapShot.val().UserImage;
				$scope.fullname = profileDataSnapShot.val().FirstName +' '+ profileDataSnapShot.val().LastName;
				$scope.occupation = profileDataSnapShot.val().Occupation;
				$scope.location = profileDataSnapShot.val().Location;
			})
		}
	})
})
   
.controller('notificationsCtrl', function($scope) {

})
 
.controller('loginCtrl', function($scope, store, $state, $location, auth, fbUrl, $firebaseArray, emailInput) {	
	$scope.signUpWithLinkedIn = function() {
		// body...
		auth.signin({
			authParams : {
				scope: 'openid offline_access',
				device : 'Mobile device'
			}
		},function(profile, token, accessToken, state, refreshToken){
			//success
			store.set('profile', profile);
			store.set('token', token);
			store.set('refreshToken', refreshToken);
			var ref = new Firebase(fbUrl);
			var list = $firebaseArray(ref);
			list.$add({
				EmailAddress : auth.profile.email,
				FirstName : auth.profile.given_name,
				LastName : auth.profile.family_name,
				UserImage : auth.profile.picture,
				Occupation : auth.profile.headline,
				Industry : auth.profile.industry,
				Location : auth.profile.location.name,
				Password : '123456'
			}).then(function(snapShot){
				//redirect the user to the dashboard page
			})
		},	function(){
			//error
		}
		)
	},

	$scope.login = function(emailAddress,password){
		//console.log(emailAddress);
		//console.log(password);
		emailAddress;
		password;
		var seriesRef = new Firebase(fbUrl);
		var seriesCollection = $firebaseArray(seriesRef);
		//console.log(emailAddress);
		   seriesCollection.$ref().orderByChild('EmailAddress').equalTo(emailAddress).once("value", function(dataSnapshot){
		       if(!dataSnapshot.val()){
		       		//console.log('Not Found' +emailAddress);
		       }
		       else{
		       		dataSnapshot.forEach(function(childSnapShot){
		       			//console.log(childSnapShot.val().Password);
		       			if(childSnapShot.val().Password == password){
		       				//console.log("Password match");
		       				emailInput.set(childSnapShot.val().EmailAddress);
		       				$state.go('tabsController.profile');
		       			}
		       			else{
		       				//console.log("Password does not match");
		       				alert("Password Does Not Match");
		       			}
		       			emailInput.set(childSnapShot.val().EmailAddress);
		       			//console.log(emailInput.get());''
		       		})
		       		//console.log('Found');
		       }
		   });
		
		 };
})
   
.controller('mentorsCtrl', function($scope, fbUrl, $firebaseArray, emailInput, ConnectionsFactory, AcceptedFactory, SingleFactory) {
	//retrieve all members of the mentors node
	var mentorRef = new Firebase(fbUrl);
	var mentorsArray = $firebaseArray(mentorRef);
	var connectionsArray =  new ConnectionsFactory();
	mentorsArray.$loaded().then(function(){
		connectionsArray.$loaded().then(function(){
		console.log(connectionsArray);	
		$scope.mentors = mentorsArray;
		for(var i =0; i < mentorsArray.length; i++){
			for(var j =0; j < connectionsArray.length; j++){
				
				$scope.addConnect = function(mentors){
						var connectionsRef = new ConnectionsFactory();
						connectionsRef.$add({
							'AddedBy' : emailInput.get(),
							'ConnectionId' : mentors.$id,
							'ConnectionLastName' : mentors.LastName,
							'ConnectionFirstName' : mentors.FirstName,
							'ConnectionJob' : mentors.Occupation,
							'ConnectionAvatar' : mentors.UserImage
						}).then(function(snapShot){
							//console.log('Connection Added' +snapShot.key());
							//$scope.disabled = 'true';
						})
				}		
		}
	}
		
	})
		})

	//to check only your accepted connections
	$scope.Accepted = function(){
		//console.log('Accepted');
		var acceptedFactory = new AcceptedFactory();
		var acceptedConnections = acceptedFactory.findAcceptedConnections(emailInput.get());
		acceptedConnections.then(function(data){
			$scope.mentors = data;
			angular.forEach(data, function(value, key){
				$scope.mentors[key]['lastName'] = data[key].ConnectionFirstName;
				$scope.mentors[key]['firstName'] = data[key].ConnectionLastName;
				$scope.mentors[key]['occupation'] = data[key].ConnectionJob;
				$scope.mentors[key]['avatar'] = data[key].ConnectionAvatar;
				console.log(data[key].ConnectionId);
				$scope.disabled = 'true';
			})
					});
	}


})
 