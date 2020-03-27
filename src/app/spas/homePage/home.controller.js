angular.module("hackaton-stefanini").controller("HomeController", HomeController);
HomeController.$inject = ["$rootScope", "$scope", "$location",
    "$q", '$filter', '$routeParams', 'HackatonStefaniniService'];

function HomeController($rootScope, $scope, $location,
    $q, $filter, $routeParams, HackatonStefaniniService) {
    vm = this;
    vm.ola = "Olá Mundo!!!";

}
