describe('HomeController', function(){
    var PessoaTeste;
    var $location, HackatonStefaniniService, $scope, $controller;

    beforeEach(angular.mock.module('hackaton-stefanini'));

    beforeEach(inject(function(_$rootScope_, _$location_, _HackatonStefaniniService_,_$controller_, _$httpBackend_){
        $scope = _$rootScope_.$new();
        $controller = _$controller_('HomeController', {$scope: $scope});
        $location = _$location_;
        HackatonStefaniniService = _HackatonStefaniniService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Serviço HomeController exite?', function () {
        expect($controller).toBeDefined();
    });

})