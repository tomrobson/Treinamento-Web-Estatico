describe('PerfisListarController', function(){
    var PessoaTeste;
    var $location, HackatonStefaniniService, $scope, $rootScope, $q;
    var perfils = {
        id: 1,
        nome: "ADMIN",
        descricao: "Usuario Admin",
        dataHoraInclusao: "2020-03-09 11:33:39.502821",
        dataHoraAlteracao: ""
    }
    var index = {
        currentPage: 1,
        ultimoIndex: 0,
        listaPerfil: [
            {
                id: 1,
                nome: "ADMIN",
                descricao: "Usuario Admin",
                dataHoraInclusao: "2020-03-09 11:33:39.502821",
                dataHoraAlteracao: ""
            },
            {
                id: 2,
                nome: "ADMIN",
                descricao: "Usuario Admin",
                dataHoraInclusao: "2020-03-09 11:33:39.502821",
                dataHoraAlteracao: ""
            },
            {
                id: 3,
                nome: "ADMIN",
                descricao: "Usuario Admin",
                dataHoraInclusao: "2020-03-09 11:33:39.502821",
                dataHoraAlteracao: ""
            },
            {
                id: 4,
                nome: "ADMIN",
                descricao: "Usuario Admin",
                dataHoraInclusao: "2020-03-09 11:33:39.502821",
                dataHoraAlteracao: ""
            },
            {
                id: 5,
                nome: "ADMIN",
                descricao: "Usuario Admin",
                dataHoraInclusao: "2020-03-09 11:33:39.502821",
                dataHoraAlteracao: ""
            },
            {
                id: 6,
                nome: "ADMIN",
                descricao: "Usuario Admin",
                dataHoraInclusao: "2020-03-09 11:33:39.502821",
                dataHoraAlteracao: ""
            }
        ]
    };

    var url = "http://localhost:8080/treinamento/api/perfils/";

    beforeEach(angular.mock.module('hackaton-stefanini'));

    beforeEach(inject(function(_$rootScope_, _$location_, _HackatonStefaniniService_,_$controller_, _$httpBackend_, _$q_){
        $scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        $controller = _$controller_('PerfilListarController', {$scope: $scope});
        $location = _$location_;
        HackatonStefaniniService = _HackatonStefaniniService_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Serviço de Perfil Listar Controller exite?', function () {
        expect($controller).toBeDefined();
    });

    describe('Perfil Listar Controller', function () {
        var id = 1, id1, resultado;

        beforeEach(function () {
            spyOn($controller, 'init').and.callThrough();
            spyOn($controller, 'remover').and.callThrough();
        });

        it('Verificando ser a função init', function () {
            resultado = {};
            $httpBackend.whenGET(url).respond(200, $httpBackend.when(perfils));

            expect($controller.init).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.init().then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.init).toHaveBeenCalledWith();
            //expect(resultado).toEqual(perfils);
        });

        it('Testando metodo avancarPaginanacao', function () {
            resultado = {};

            $controller.avancarPaginanacao(index).then(function (resultado) {
                expect(resultado.currentPage).toEqual(2);
                expect(resultado.ultimoIndex).toEqual(1);
            });
        });

        it('Testando metodo retrocederPaginanacao', function () {
            resultado = {};
            index.currentPage = 2;
            index.ultimoIndex = 1;

            $controller.retrocederPaginanacao(index).then(function (resultado) {
                expect(resultado.currentPage).toEqual(1);
                expect(resultado.ultimoIndex).toEqual(0);
            });
        });

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
            
        });

        it('Testando metodo remover', function () {
            resultado = {};
            var id = {
                id: perfils.id,
                acao: ""
            }
            $httpBackend.whenDELETE(url + perfils.id).respond(200, $q.when(perfils));

            expect($controller.remover).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.remover(id).then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.remover).toHaveBeenCalledWith(id);
            expect(resultado).toEqual(perfils);
        });

        it('Testando metodo retornarTelaListagem e retorna para listarPerfis', function () {
            var url = $controller.retornarTelaListagem();
            var resultado = $location.url(url);

            expect(resultado).toBe('/listarPerfis');
        });
    });

})