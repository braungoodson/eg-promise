angular
	.module('app',[])
	.service('BoxService',['$q','$interval',function($q,$interval){
		return {
			getBoxs: function (boxs) {
				var deferred = $q.defer();
				var interval = $interval(function(){
					deferred.notify({volume:Math.random()*(boxs--)});
					if (!boxs) {
						$interval.cancel(interval);
						deferred.resolve('No more boxs.');
					}
				},1000);
				return deferred.promise;
			}
		};
	}])
	.controller('BoxsController',[
		'$scope',
		'BoxService',
		function BoxsController ($scope,BoxService) {
			$scope.boxs = [];
			BoxService
				.getBoxs(10)
				.then(function HandleResolution (resolution) {
					console.log(resolution);
				},function HandleError (error) {
					console.log(error);
				},function HandleBoxs (box) {
					console.log(box);
					$scope.boxs.push(box);
				})
			;
		}
	])
;
