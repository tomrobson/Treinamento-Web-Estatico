describe('PerfisListarController', function(){
    var PessoaTeste;
    var $location, HackatonStefaniniService, $scope;
    var url = "http://localhost:8080/treinamento/api/perfils/";

    beforeEach(angular.mock.module('hackaton-stefanini'));

    beforeEach(inject(function(_$rootScope_, _$location_, _HackatonStefaniniService_,_$controller_, _$httpBackend_){
        $scope = _$rootScope_.$new();
        $controller = _$controller_('PerfilListarController', {$scope: $scope});
        $location = _$location_;
        HackatonStefaniniService = _HackatonStefaniniService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Serviço de Perfil Listar Controller exite?', function () {
        expect($controller).toBeDefined();
    });

    describe('Perfil Listar Controller', function () {
        it('Verificando ser a inicialização do init', function () {
            var resultado;
            var perfil = {
                'id': 1,
                'nome': "ADMIN",
                'descricao': "PERFIL DE ADMINISTRADOR",
                'dataHoraInclusao': "2020-03-09 11:33:39.502821",
                'dataHoraAlteracao': null
            }
            
            //$httpBackend.whenGET(url).respond(200, $httpBackend.when(perfil));

            //expect($controller.init).not.toHaveBeenCalled();
            //expect(resultado).toEqual({});

            //$controller.listar(url).then(function (res) {
                //resultado = res;
            //});

            //$httpBackend.plush();

            //expect($controller.init).toHaveBeenCalledWith(url);
            //expect(resultado.id).toBe(1);
            //expect(resultado.nome).toBe('ADMIN');
            //expect(resultado.descricao).toBe('PERFIL DE ADMINISTRADOR');
            //expect(resultado.dataHoraInclusao).toBe('2020-03-09 11:33:39.502821');
            //expect(resultado.dataHoraInclusao).toBe(null);
        });

        var id = 1, id1;

        it('Testando metodo editar com id válido', function () {
            var url = $controller.editar(id);

            var resultado = $location.url(url);

            expect(resultado).toBe('/EditarPerfis/' + id);
        });

        it('Testando metodo editar com id inválido', function () {
            var url1 = $controller.editar(id1);

            var resultado1 = $location.url(url1);

            expect(resultado1).toBe('/cadastrarPerfis');
        });

        it('Testando metodo remover perfil com vinculo, devera retornar mensagem de vinculo', function () {
            expect($controller.remover(id1)).toBeUndefined();
        });
    });

})