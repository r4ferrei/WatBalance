var app = angular.module('watbalance', ['ui.router']);

app.controller('FetchController', [
	'$scope',
	'table_json',
	function($scope, table_json) {
		$scope.table_json = table_json;
		console.log($scope.table_json);
	}
]);