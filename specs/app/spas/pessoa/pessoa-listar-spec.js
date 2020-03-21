describe('PessoaListarController', function(){
    var PessoaTeste;
    var $location, HackatonStefaniniService, $controller, $httpBackend, $scope;

    var url = "http://localhost:8080/treinamento/api/pessoas/";

    beforeEach(angular.mock.module('hackaton-stefanini'));

    beforeEach(inject(function(_$rootScope_, _$location_, _HackatonStefaniniService_,_$controller_, _$httpBackend_){
        $scope = _$rootScope_.$new();
        $controller = _$controller_('PessoaListarController', {$scope: $scope});
        $location = _$location_;
        HackatonStefaniniService = _HackatonStefaniniService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Serviço Pessoa Listar Controller existi?', function () {
        expect($controller).toBeDefined();
    });

    describe('Pessoa listar', function () {
        
        
    });
});