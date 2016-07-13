angular.module('app.routes', ['ui.router'])

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
        loginState: 'login' // This is the name of the state where you'll show the login, which is defined above...
      });

  


  

});

