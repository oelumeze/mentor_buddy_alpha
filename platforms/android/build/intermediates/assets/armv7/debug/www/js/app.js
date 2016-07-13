// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ui.router',
  'app.controllers', 
  'app.services', 'app.directives',
  'auth0',
  'angular-storage',
  'angular-jwt',
  'firebase'])



.run(function($ionicPlatform, $rootScope, auth, store, jwtHelper, $location) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  //This hooks all auth events
  auth.hookEvents();

  //This next event gets triggered when the URL is changed
  var refreshingToken = null;
  $rootScope.$on('$locationChangeStart', function(){
    var token = store.get('token');
    var refreshToken = store.get('refreshToken');
    if(token){
      if(!jwtHelper.isTokenExpired(token)){
        if(!auth.isAuthenticated){
          auth.authenticate(store.get('profile'), token);
        }
      } else{
        if(refreshToken){
          if(refreshingToken === null){
            refreshingToken = auth.refreshIdToken(refreshToken).then(function(idToken){
              store.set('token', idToken);
              auth.authenticate(store.get('profile'), idToken);
            }).finally(function(){
              refreshingToken = null;
            });
          }
          return refreshingToken;
        }else{
          $location.path('login')
        }
      }
    }
  });

})



.config(function($stateProvider, $urlRouterProvider, $httpProvider,
  authProvider, $locationProvider, jwtInterceptorProvider) {

  $urlRouterProvider.otherwise('/login')

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.timeline', {
    url: '/timeline',
    views: {
      'tab1': {
        templateUrl: 'templates/timeline.html',
        controller: 'timelineCtrl'
      }
    }
  })

  .state('tabsController.mentorConnect', {
    url: '/mentorConnect',
    views: {
      'tab5': {
        templateUrl: 'templates/mentorConnect.html',
        controller: 'mentorConnectCtrl'
      }
    }
  })

  .state('tabsController.profile', {
    url: '/userprofile',
    views: {
      'tab4': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })

  .state('tabsController.notifications', {
    url: '/notifications',
    views: {
      'tab3': {
        templateUrl: 'templates/notifications.html',
        controller: 'notificationsCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('tabsController.mentors', {
    url: '/mentors',
    views: {
      'tab2': {
        templateUrl: 'templates/mentors.html',
        controller: 'mentorsCtrl'
      }
    }
  })


  authProvider.init({
        domain: 'mentorapp.auth0.com',
        clientID: 'JZvO4rnG4kWIfdepZ7kagHdAuUvpBDRZ',
        callbackURL: location.href,
        loginState: 'login' // This is the name of the state where you'll show the login, which is defined above...
      });

  
  
  

})
  .run(function(auth) {
    // This hooks all auth events to check everything as soon as the app starts
    auth.hookEvents();
  });





