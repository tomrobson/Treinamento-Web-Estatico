describe('PerfilIncluirAlterarController', function(){
    var PessoaTeste;
    var $location, HackatonStefaniniService, $scope, $controller;

    beforeEach(angular.mock.module('hackaton-stefanini'));

    beforeEach(inject(function(_$rootScope_, _$location_, _HackatonStefaniniService_,_$controller_, _$httpBackend_){
        $scope = _$rootScope_.$new();
        $controller = _$controller_('PerfilIncluirAlterarController', {$scope: $scope});
        $location = _$location_;
        HackatonStefaniniService = _HackatonStefaniniService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Serviço de Perfil Incluir Alterar Controller existi?', function () {
        expect($controller).toBeDefined();
    });

    describe('Testando metodos de Perfil Incluir Alterar', function () {
        
        it('Testando iniciar metodo init', function () {
            //expect($controller.init).toBeUndefined();
        });

        it('Testando criar data para salvar na persistencia', function () {
            var data = new Date($controller.criarData());
            data =  data.toLocaleDateString();

            var compara = new Date();
            compara = compara.toLocaleDateString();

            expect(data).toBe(compara);
        });

        it('Testando exibir data no formulario', function () {
            var data = new Date();
            data = $controller.exibirData(data.toJSON());

            var compara = new Date();
            compara = compara.toLocaleDateString();

            expect(data).toBe(compara);
        });
        
    });

})