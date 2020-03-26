describe('PerfilIncluirAlterarController', function(){
    var PessoaTeste;
    var $location, HackatonStefaniniService, $scope, $controller, $q;
    var url = "http://localhost:8080/treinamento/api/perfils/";
    var perfils = {
        id: 1,
        nome: "ADMIN",
        descricao: "Usuario Admin",
        dataHoraInclusao: "2020-03-09 11:33:39.502821",
        dataHoraAlteracao: "",
        acao: ""
    }
    var error = {
        'id': undefined
    }

    beforeEach(angular.mock.module('hackaton-stefanini'));

    beforeEach(inject(function(_$rootScope_, _$location_, _HackatonStefaniniService_,_$controller_, _$httpBackend_, _$q_){
        $scope = _$rootScope_.$new();
        $controller = _$controller_('PerfilIncluirAlterarController', {$scope: $scope});
        $location = _$location_;
        HackatonStefaniniService = _HackatonStefaniniService_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Serviço de Perfil Incluir Alterar Controller existi?', function () {
        expect($controller).toBeDefined();
    });

    describe('Testando metodos de Perfil Incluir Alterar', function () {
        var resultado;

        beforeEach(function () {
            spyOn($controller, 'incluir').and.callThrough();
            spyOn($controller, 'remover').and.callThrough();
            spyOn($controller, 'recuperarObjetoPorIDURL').and.callThrough();
            spyOn($controller, 'listar').and.callThrough();
            spyOn($controller, 'salvar').and.callThrough();
            spyOn($controller, 'alterar').and.callThrough();
            spyOn($controller, 'excluir').and.callThrough();
        });
        
        it('Testando iniciar metodo init', function () {
            //expect($controller.init).toBeUndefined();
        });

        it('Testando metodo cancelar e retorna para listar', function () {
            var url = $controller.cancelar();
            var resultado = $location.url(url);

            expect(resultado).toBe('/listarPerfis');
        });

        it('Testando metodo incluir com acao Cadastrar retorna o obj', function () {
            resultado = {};
            perfils.acao = 'Cadastrar';
            $httpBackend.whenPOST(url).respond(200, $q.when(perfils));

            expect($controller.incluir).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.incluir(perfils).then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.incluir).toHaveBeenCalledWith(perfils);
            expect(resultado.id).toEqual(perfils.id);
            expect(resultado.nome).toEqual(perfils.nome);
            expect(resultado.descricao).toEqual(perfils.descricao);
            expect(resultado.dataHoraAlteracao).toEqual("");
            perfils.acao = "";
        });

        it('Testando metodo incluir com acao Editar retorna o obj', function () {
            resultado = {};
            perfils.acao = 'Editar';
            $httpBackend.whenPUT(url).respond(200, $q.when(perfils));

            expect($controller.incluir).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.incluir(perfils).then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.incluir).toHaveBeenCalledWith(perfils);
            expect(resultado.id).toEqual(perfils.id);
            expect(resultado.nome).toEqual(perfils.nome);
            expect(resultado.descricao).toEqual(perfils.descricao);
            perfils.acao = "";
        });

        it('Testando metodo remover', function () {
            resultado = {};
            $httpBackend.whenDELETE(url + perfils.id).respond(200, $q.when(perfils));

            expect($controller.remover).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.remover(perfils).then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.remover).toHaveBeenCalledWith(perfils);
            expect(resultado).toEqual(perfils);
        });

        it('Retorna uma objeto por um Id válito', function () {
            resultado = {};

            $httpBackend.whenGET(url + perfils.id).respond(200, $q.when(perfils));
            
            expect($controller.recuperarObjetoPorIDURL).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.recuperarObjetoPorIDURL(perfils.id, url).then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.recuperarObjetoPorIDURL).toHaveBeenCalledWith(perfils.id, url);
            expect(resultado).toEqual(perfils);

        });

        it('Retorna uma objeto por um Id inválito', function () {
            resultado = {};
            var id = 1000;

            $httpBackend.whenGET(url + id).respond(200, $q.when(error));
            
            expect($controller.recuperarObjetoPorIDURL).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.recuperarObjetoPorIDURL(id, url).then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.recuperarObjetoPorIDURL).toHaveBeenCalledWith(id, url);
            expect(resultado).toEqual(error);
        });

        it('Testando metodo listar, retorna uma lista', function () {
            resultado = {};
            $httpBackend.whenGET(url).respond(200, $q.when(perfils));

            expect($controller.listar).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.listar(url).then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.listar).toHaveBeenCalledWith(url);
            expect(resultado).toEqual(perfils); 
        });

        it('Testando metodo salvar, retorna obj de perfil', function () {
            resultado = {};
            $httpBackend.whenPOST(url).respond(200, $q.when(perfils));

            expect($controller.salvar).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.salvar(url, perfils).then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.salvar).toHaveBeenCalledWith(url, perfils);
            expect(resultado).toEqual(perfils);
        });

        it('Testando metodo alterar, retorna obj de perfil', function () {
            resultado = {};
            $httpBackend.whenPUT(url).respond(200, $q.when(perfils));

            expect($controller.alterar).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.alterar(url, perfils).then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.alterar).toHaveBeenCalledWith(url, perfils);
            expect(resultado.id).toEqual(perfils.id);
            expect(resultado.nome).toEqual(perfils.nome);
            expect(resultado.descricao).toEqual(perfils.descricao);
        });

        it('Testando metodo excluir, retorna obj de perfil', function () {
            resultado = {};
            $httpBackend.whenDELETE(url).respond(200, $q.when(perfils));

            expect($controller.excluir).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.excluir(url, perfils).then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.excluir).toHaveBeenCalledWith(url, perfils);
            expect(resultado).toEqual(perfils);
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