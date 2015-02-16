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
		});

		$urlRouterProvider.otherwise('home');
	}]);

app.controller('HomeCtrl', [
	'$scope',
	function($scope) {
		// home controller
	}]);