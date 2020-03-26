describe('PessoaIncluirAlterarController', function(){
    var PessoaTeste;
    var $location, HackatonStefaniniService, $scope, $q, $httpBackend;
    var pessoa = {
        id: 1,
        nome: "JOAO",
        email: "joao.teste@gmail.com",
        dataNascimento: "25-08-1995",
        enderecos: [null],
        perfils: [null],
        situacao: true
    }
    var perfils = {
        id: 1,
        nome: "ADMIN",
        descricao: "Usuario Admin",
        dataHoraInclusao: "2020-03-09 11:33:39.502821",
        dataHoraAlteracao: ""
    }
    var enderecos = {
        id: 1,
        idPessoa: 1,
        cep: "12345678",
        uf: "DF",
        localidade: "Brasilia",
        bairro: "Riacho",
        logradouro: "Rua 25",
        complemento: "Rua"
    }
    var obj = {
        id: 1,
        nome: "Teste",
        email: "teste.teste@gmail.com",
        dataNascimento: "1995-05-1995",
        enderecos: [
            {
                id: 1,
                idPessoa: 1,
                cep: "12345678",
                uf: "DF",
                localidade: "Brasilia",
                bairro: "Riacho",
                logradouro: "Rua 25",
                complemento: "Rua"
            }
        ],
        perfils: [
            {
                id: 1,
                nome: "ADMIN",
                descricao: "Usuario Admin",
                dataHoraInclusao: "2020-03-09 11:33:39.502821",
                dataHoraAlteracao: ""
            }
        ],
        situacao: true,
        acao: ""
    }
    var error = {
        'id': undefined
    }

    var url = "http://localhost:8080/treinamento/api/pessoas/";
    var urlPerfil = "http://localhost:8080/treinamento/api/perfils/";
    var urlEndereco = "http://localhost:8080/treinamento/api/enderecos/";

    beforeEach(angular.mock.module('hackaton-stefanini'));

    beforeEach(inject(function(_$rootScope_,_$location_, _HackatonStefaniniService_,_$controller_, _$httpBackend_, _$q_){
        $scope = _$rootScope_.$new();
        $controller = _$controller_('PessoaIncluirAlterarController', {$scope: $scope});
        $location = _$location_;
        HackatonStefaniniService = _HackatonStefaniniService_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Serviço Pessoa Incluir Alterar Controller existi?', function () {
        expect($controller).toBeDefined();
    });

    describe('Pessoa Incluir Alterar', function () {
        var resultado;

        beforeEach(function () {
            spyOn($controller, 'recuperarObjetoPorIDURL').and.callThrough();
            spyOn($controller, 'init').and.callThrough();
            spyOn($controller, 'incluir').and.callThrough();
            spyOn($controller, 'remover').and.callThrough();
            spyOn($controller, 'listar').and.callThrough();
            spyOn($controller, 'salvar').and.callThrough();
            spyOn($controller, 'alterar').and.callThrough();
            spyOn($controller, 'excluir').and.callThrough();
        });

        it('Testando metodo init e retornando obj pessoa', function () {
            //resultado = {};
            //$httpBackend.whenGET(urlPerfil).respond(200, $q.when(perfils));

            //expect($controller.init).not.toHaveBeenCalled();
            //expect(resultado).toEqual({});

            //$controller.init(urlPerfil).then(function (res) {
            //    resultado = res;
            //});

            //$httpBackend.flush();

            //expect($controller.init).toHaveBeenCalledWith(urlPerfil);
            //expect(resultado).toEqual(perfils);
        });

        it('Testando metodo cancelar e retorna para listar', function () {
            var url = $controller.cancelar();
            var resultado = $location.url(url);

            expect(resultado).toBe('/listarPessoas');
        });

        it('Testando metodo abrirModal com endereco vazio e retorna Modal vazia', function () {
            
        });

        it('Testando metodo incluir com acao Cadastrar retorna o obj', function () {
            resultado = {};
            obj.acao = 'Cadastrar';
            $httpBackend.whenPOST(url).respond(200, $q.when(obj));

            expect($controller.incluir).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.incluir(obj).then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.incluir).toHaveBeenCalledWith(obj);
            expect(resultado).toEqual(obj);
        });

        it('Testando metodo incluir com acao Editar retorna o obj', function () {
            resultado = {};
            obj.acao = 'Editar';
            $httpBackend.whenPUT(url).respond(200, $q.when(obj));

            expect($controller.incluir).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.incluir(obj).then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.incluir).toHaveBeenCalledWith(obj);
            expect(resultado).toEqual(obj);
        });

        it('Testando metodo remover', function () {
            //resultado = {};
            //var tipo = "ENDERECO";
            //$httpBackend.whenDELETE(url).respond(200, $q.when(obj));

            //expect($controller.remover).not.toHaveBeenCalled();
            //expect(resultado).toEqual({});

            //$controller.remover(obj, tipo).then(function (res) {
            //    resultado = res;
            //});

            //$httpBackend.flush();

            //expect($controller.remover).toHaveBeenCalledWith(obj, tipo);
            //expect(resultado).toEqual(obj);
        });

        it('Retorna uma objeto por um Id valido', function () {
            var id = 1;
            resultado = {};

            $httpBackend.whenGET(url + id).respond(200, $q.when(pessoa));
            
            expect($controller.recuperarObjetoPorIDURL).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.recuperarObjetoPorIDURL(id, url).then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.recuperarObjetoPorIDURL).toHaveBeenCalledWith(id, url);
            expect(resultado.id).toBe(pessoa.id);
            expect(resultado.nome).toBe(pessoa.nome);
            expect(resultado.email).toBe(pessoa.email);
            expect(resultado.dataNascimento).toBe(pessoa.dataNascimento);
            expect(resultado.situacao).toBe(pessoa.situacao); 

        });

        it('Retorna objeto quando o Id for Invalido', function () {
            var id = null;
            resultado = {};

            $httpBackend.whenGET(url + id).respond(200, $q.when(error));

            expect($controller.recuperarObjetoPorIDURL).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.recuperarObjetoPorIDURL(id, url).then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.recuperarObjetoPorIDURL).toHaveBeenCalledWith(id, url);
            expect(resultado.id).toBeUndefined();

        });

        it('Testando metodo listar, retorna uma lista', function () {
            resultado = {};
            $httpBackend.whenGET(url).respond(200, $q.when(pessoa));

            expect($controller.listar).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.listar(url).then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.listar).toHaveBeenCalledWith(url);
            expect(resultado.id).toBe(pessoa.id);
            expect(resultado.nome).toBe(pessoa.nome);
            expect(resultado.email).toBe(pessoa.email);
            expect(resultado.dataNascimento).toBe(pessoa.dataNascimento);
            expect(resultado.situacao).toBe(pessoa.situacao); 
        });

        it('Testando metodo salvar, retorna obj de pessoa', function () {
            resultado = {};
            $httpBackend.whenPOST(url).respond(200, $q.when(pessoa));

            expect($controller.salvar).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.salvar(url, pessoa).then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.salvar).toHaveBeenCalledWith(url, pessoa);
            expect(resultado.id).toBe(pessoa.id);
            expect(resultado.nome).toBe(pessoa.nome);
            expect(resultado.email).toBe(pessoa.email);
            expect(resultado.dataNascimento).toBe(pessoa.dataNascimento);
            expect(resultado.situacao).toBe(pessoa.situacao); 
        });

        it('Testando metodo alterar, retorna obj de pessoa', function () {
            resultado = {};
            $httpBackend.whenPUT(url).respond(200, $q.when(pessoa));

            expect($controller.alterar).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.alterar(url, pessoa).then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.alterar).toHaveBeenCalledWith(url, pessoa);
            expect(resultado.id).toBe(pessoa.id);
            expect(resultado.nome).toBe(pessoa.nome);
            expect(resultado.email).toBe(pessoa.email);
            expect(resultado.dataNascimento).toBe(pessoa.dataNascimento);
            expect(resultado.situacao).toBe(pessoa.situacao);
        });

        it('Testando metodo excluir, retorna obj de pessoa', function () {
            resultado = {};
            $httpBackend.whenDELETE(url).respond(200, $q.when(pessoa));

            expect($controller.excluir).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.excluir(url, pessoa).then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.excluir).toHaveBeenCalledWith(url, pessoa);
            expect(resultado.id).toBe(pessoa.id);
            expect(resultado.nome).toBe(pessoa.nome);
            expect(resultado.email).toBe(pessoa.email);
            expect(resultado.dataNascimento).toBe(pessoa.dataNascimento);
            expect(resultado.situacao).toBe(pessoa.situacao);
        });

        it('Formatar data para Tela', function () {
            var data = "1995-08-25";
            
            var dataTela = $controller.formataDataTela(data);
            
            expect(dataTela).toBe("25/08/1995");
        });

        it('Formatar data para Java', function () {
            var data = "25/08/1995";

            var dataJava = $controller.formataDataJava(data);

            expect(dataJava).toBe("1995-08-25");
        });

    });

});