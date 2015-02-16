var app = angular.module('watbalance', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/templates/home.html',
			controller: 'HomeCtrl'
		})
		.state('balance', {
			url: '/balance/{number}',
			templateUrl: '/templates/balance.html',
			controller: 'BalanceCtrl'
		});

		$urlRouterProvider.otherwise('home');
	}]);

app.controller('HomeCtrl', [
	'$scope',
	'$location',
	function($scope, $location) {
		$scope.fetchBalance = function() {
			// TODO sanitize?
			$location.path('/balance/' + $scope.number);

			$scope.number = '';
			$scope.pin = '';
		}
	}]);

app.controller('BalanceCtrl', [
	'$scope',
	function($scope) {
		// Balance controller
	}]);