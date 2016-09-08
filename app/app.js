angular.module('silentCloud1651', ['ui.router', 'ngAnimate', 'ngMaterial']);

angular.module('silentCloud1651').constant('settings', {
    streamsBaseUrl: 'https://api.twitch.tv/kraken'
});

angular.module('silentCloud1651').config(function($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });

    $stateProvider
        .state('search',{
            url: '/search',
            views: {
                'main@': {
                    templateUrl: 'search/search.html',
                    controller: 'SearchCtrl'
                }
            }

        })
        .state('search.results',{
            url: '/:text',
            views: {
                'results@search': {
                    templateUrl: 'search/results.html',
                    controller: 'ResultsCtrl'
                }
            }

        })
        .state('stream', {
            url: '/stream/:id',
            views: {
                'details@': {
                    templateUrl: 'watch/watch.html',
                    controller: 'WatchCtrl'
                }
            }
        });

    $urlRouterProvider.otherwise('/search');

    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('deep-purple');

    $mdThemingProvider.theme('readonly', 'default')
        .backgroundPalette('blue-grey')
        .primaryPalette('deep-purple')
        .accentPalette('red');

    $mdThemingProvider.theme('dark', 'default')
        .primaryPalette('blue-grey')
        .accentPalette('deep-purple')
        .dark();

});



angular.module('silentCloud1651').run(function($rootScope) {

    $rootScope.title = '';
    $rootScope.busy = false;
    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
