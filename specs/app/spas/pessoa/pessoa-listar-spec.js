describe('PessoaListarController', function(){
    var PessoaTeste;
    var $location, HackatonStefaniniService, $controller, $httpBackend, $scope, $q;
    var pessoa = {
        id: 1,
        nome: "JOAO",
        email: "joao.teste@gmail.com",
        dataNascimento: "25-08-1995",
        enderecos: [null],
        perfils: [null],
        situacao: true
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
    };
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
    }
    var index = {
        currentPage: 1,
        ultimoIndex: 0,
        listaPessoas: [
            {
                id: 1,
                nome: "JOAO",
                email: "joao.teste@gmail.com",
                dataNascimento: "25-08-1995",
                enderecos: [null],
                perfils: [null],
                situacao: true
            },
            {
                id: 2,
                nome: "JOAO",
                email: "joao.teste@gmail.com",
                dataNascimento: "25-08-1995",
                enderecos: [null],
                perfils: [null],
                situacao: true
            },
            {
                id: 3,
                nome: "JOAO",
                email: "joao.teste@gmail.com",
                dataNascimento: "25-08-1995",
                enderecos: [null],
                perfils: [null],
                situacao: true
            },
            {
                id: 4,
                nome: "JOAO",
                email: "joao.teste@gmail.com",
                dataNascimento: "25-08-1995",
                enderecos: [null],
                perfils: [null],
                situacao: true
            },
            {
                id: 5,
                nome: "JOAO",
                email: "joao.teste@gmail.com",
                dataNascimento: "25-08-1995",
                enderecos: [null],
                perfils: [null],
                situacao: true
            },
            {
                id: 6,
                nome: "JOAO",
                email: "joao.teste@gmail.com",
                dataNascimento: "25-08-1995",
                enderecos: [null],
                perfils: [null],
                situacao: true
            }
        ]
    };

    var url = "http://localhost:8080/treinamento/api/pessoas/";
    var urlEndereco = "http://localhost:8080/treinamento/api/enderecos/";

    beforeEach(angular.mock.module('hackaton-stefanini'));

    beforeEach(inject(function(_$rootScope_, _$location_, _HackatonStefaniniService_,_$controller_, _$httpBackend_, _$q_){
        $scope = _$rootScope_.$new();
        $controller = _$controller_('PessoaListarController', {$scope: $scope});
        $location = _$location_;
        HackatonStefaniniService = _HackatonStefaniniService_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Serviço Pessoa Listar Controller existi?', function () {
        expect($controller).toBeDefined();
    });

    describe('Pessoa listar', function () {
        var resultado, id;

        beforeEach(function () {
            spyOn($controller, 'init').and.callThrough();
            spyOn($controller, 'remover').and.callThrough();
            spyOn($controller, 'editar').and.callThrough();
        });
        
        it('Testando metodo init', function () {
            resultado = {};
            $httpBackend.whenGET(url).respond(200, $q.when(obj));

            expect($controller.init).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.init().then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.init).toHaveBeenCalledWith();
            expect(resultado).toEqual(obj);
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

        it('Testando metodo editar retorna para pagina de cadastrar', function () {
            var url = $controller.editar(id);
            resultado = $location.url(url);

            expect(resultado).toBe('/cadastrarPessoa');
        });

        it('Testando metodo editar retorna para pagina de editar', function () {
            id = 1;
            var url = $controller.editar(id);
            resultado = $location.url(url);

            expect(resultado).toBe('/EditarPessoas/' + id);
        });

        it('Testando metodo remover retorna obj', function () {
            resultado = {};
            var id = {
                id: pessoa.id,
                acao: ""
            }
            $httpBackend.whenDELETE(url + id.id).respond(200, $q.when(pessoa));

            expect($controller.remover).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            $controller.remover(id).then(function (res) {
                resultado = res;
            });

            $httpBackend.flush();

            expect($controller.remover).toHaveBeenCalledWith(id);
            expect(resultado).toEqual(pessoa);
        });

        it('Testando metodo retornarTelaListagem retorna link listarPessoas', function () {
            var url = $controller.retornarTelaListagem('listarPessoas');
            resultado = $location.url(url);

            expect(resultado).toBe('/listarPessoas');
        });
        
    });
});