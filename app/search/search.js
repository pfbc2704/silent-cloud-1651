angular.module('silentCloud1651').controller('SearchCtrl',function($scope, $rootScope, settings, $http, $mdToast, $state, $stateParams){

    $scope.title = 'Twitch streams';
    $scope.searchQ = $stateParams.text || '';
    $scope.resultQ = $stateParams.text || '';

    $scope.search = function() {
        if($scope.searchQ.length == 0) return;
        $scope.resultQ = $scope.searchQ;
        $state.go('search.results', {'text': $scope.searchQ});
    };

    $scope.reset = function() {
        $scope.searchQ = '';
        document.getElementById('searchQ').focus();
    };

});
