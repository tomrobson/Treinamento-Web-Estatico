describe('Conjunto de testes - Hudson', function(){
    var ServiceTeste, PessoaTeste;

    beforeEach(angular.mock.module('hackaton-stefanini'));

    beforeEach(inject(function(HackatonStefaniniService){
        ServiceTeste = HackatonStefaniniService;
    }))

    describe('Testando serviços', function () {
        it('A service existe?', function(){
            expect(ServiceTeste).toBeDefined();
        })
    
        it('Testando o Listar', function(){
            expect(ServiceTeste.listar()).toBeDefined();
        })
    
        it('Testando o Listar por ID', function () {
            expect(ServiceTeste.listarId()).toBeDefined();
        })
    
        it('Testando o Excluir', function(){
            expect(ServiceTeste.excluir()).toBeDefined();
        })
    
        it('Testando o Alterar', function () {
            expect(ServiceTeste.alterar()).toBeDefined();
        })
    
        it('Testando o Incluir', function() {
            expect(ServiceTeste.Incluir()).toBeDefined();
        })
    })
    
    describe('Testando persistencia dos serviços', function () {
        var urlPessoa = "http://localhost:8080/treinamento/api/pessoas/";
        var pessoa = {
            id: 1,
            nome: "JOAO",
            email: "joaom.dev@hotmail.com",
            dataNascimento: "1995-08-25",
            situacao: true
        }

        it('Testando procura por Id', function () {
            var resultado;
            
            $httpBackend.whenGET(urlPessoa + pessoa.id).respond(200, $httpBackend.when(pessoa));

            expect(ServiceTeste.listar).not.toHaveBeenCalled();
            expect(resultado).toEqual({});

            ServiceTeste.listar(urlPessoa + pessoa.id).then(function (res) {
                resultado = res;
            });

            $httpBackend.plush();

            expect(ServiceTeste.listar).toHaveBeenCalledWith(urlPessoa + pessoa.id);
            expect(resultado.id).toEqual(1);
            expect(resultado.email).toEqual('joaom.dev@hotmail.com');
            expect(resultado.dataNascimento).toEqual('1995-08-25');
            expect(resultado.situacao).toEqual(true);
        })
    })

})