describe('PessoaIncluirAlterarController', function(){
    var PessoaTeste;
    var $location, HackatonStefaniniService, $scope, $q, $httpBackend;
    var pessoa = {
        id: null,
        nome: "JOAO",
        email: "joao.teste@gmail.com",
        dataNascimento: "25-08-1995",
        enderecos: [null],
        perfils: [null],
        situacao: true
    }
    var enderecoDefault = {
        'id': null,
        'idPessoa': null,
        'cep': "",
        'uf': "",
        'localidade': "",
        'bairro': "",
        'logradouro': "",
        'complemento': ""
    };
    var error = {
        'id': undefined
    }

    var url = "http://localhost:8080/treinamento/api/pessoas/";

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
        var resultado, resultado1;

        beforeEach(function () {
            resultado = {}, resultado1 = {};

            spyOn($controller, 'recuperarObjetoPorIDURL').and.callThrough();
        });

        it('Formatar data para Tela', function () {
            var data = "1995-08-25";
            
            var dataTela = $controller.formataDataTela(data);
            
            expect(dataTela).toBe("25-08-1995");
        });

        it('Formatar data para Java', function () {
            var data = "25-08-1995";

            var dataJava = $controller.formataDataJava(data);

            expect(dataJava).toBe("1995-08-25");
        });

        describe('Incluir Pessoa', function () {
            //var obj = pessoa;
            //var acao = "Cadastrar";

            it('Retorna um objeto ao salvar um objeto', function () {
                //var resultado = $controller.incluir(obj, acao);

                //obj.id = resultado.id;
                //obj.dataNascimento = "1995-08-25";

                //expect(resultado).toBe(obj);
            });
        });

        it('Retorna uma objeto por um Id valido', function () {
            //$httpBackend.whenGET(url + pessoa.id).respond(200, $q.when(pessoa));
            
            //expect($controller.recuperarObjetoPorIDURL).not.toHaveBeenCalled();
            //expect(resultado).toEqual({});

            //$controller.recuperarObjetoPorIDURL(pessoa.id, url).then(function (res) {
            //    resultado = res;
            //});

            //$httpBackend.flush();

            //expect($controller.recuperarObjetoPorIDURL).toHaveBeenCalledWith(pessoa.id, url);
            //expect(resultado.id).toBe(pessoa.id);
            //expect(resultado.nome).toBe(pessoa.nome);
            //expect(resultado.email).toBe(pessoa.email);
            //expect(resultado.dataNascimento).toBe(pessoa.dataNascimento);
            //expect(resultado.situacao).toBe(pessoa.situacao); 

        });

        it('Retorna objeto quando o Id for Invalido', function () {
            var id = 1000;

            $httpBackend.whenGET(url + id).respond(200, $q.when(error));

            expect($controller.recuperarObjetoPorIDURL).not.toHaveBeenCalled();
            expect(resultado1).toEqual({});

            $controller.recuperarObjetoPorIDURL(id, url).then(function (res) {
                resultado1 = res;
            });

            $httpBackend.flush();

            expect($controller.recuperarObjetoPorIDURL).toHaveBeenCalledWith(id, url);
            expect(resultado1.id).toBeUndefined();

        });

    });

});