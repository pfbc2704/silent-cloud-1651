angular.module('silentCloud1651').controller('ResultsCtrl',function($scope, $rootScope, $state, $stateParams, $http, $mdToast, settings){

    $rootScope.busy = true;
    $scope.streams = [];
    $scope.next = true;
    var nextUrl = nextUrl || (settings.streamsBaseUrl + '/search/streams?q=' + $stateParams.text + '&limit=20');

    var loadStreams = function() {
        $http.jsonp(nextUrl + '&callback=JSON_CALLBACK')
            .then(
                function (response) {
                    $scope.streams = $scope.streams.concat(response.data.streams);
                    nextUrl = response.data._links.next;
                    $scope.next = nextUrl != null;
                }, function () {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('An error occurs...')
                            .position('bottom right')
                            .hideDelay(3000)
                    );
                }
            ).finally(function () {
            $scope.resultQ = $scope.searchQ;
            $rootScope.busy = false;
        });
    }
    loadStreams();


    $scope.watch = function(stream) {
        $state.go('stream', {id: stream.channel.name});
    };

    $scope.loadMore = loadStreams;

    $scope.isBusy = function() {
        return $rootScope.busy;
    };

});
