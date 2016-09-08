angular.module('silentCloud1651').controller('WatchCtrl',function($scope, $rootScope, $http, $mdToast, settings, $stateParams, $sce, $window, $interval){

    $scope.stream = null;
    $scope.title = 'Loading ';
    $scope.streamSrc = $sce.trustAsResourceUrl('http://player.twitch.tv/?channel='+ $stateParams.id);

    var loadStream = function() {
        $rootScope.busy = true;
        $http.jsonp(settings.streamsBaseUrl + '/streams/'+$stateParams.id+'?callback=JSON_CALLBACK' )
            .then(
                function(response) {
                    $scope.stream = response.data.stream;
                }, function() {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('An error occurs to watch stream')
                            .position('bottom right')
                            .hideDelay(3000)
                    );
                }
            ).finally( function() {
                $rootScope.busy = false;
            });
    };


    $interval( loadStream, 5000 );
    loadStream();

    $scope.close = function() {
        $window.history.back();
    };

});
