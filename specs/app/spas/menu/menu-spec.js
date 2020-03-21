describe('MenuController', function(){
    var PessoaTeste;
    var $location, HackatonStefaniniService, $scope, $httpBackend;

    beforeEach(angular.mock.module('hackaton-stefanini'));

    beforeEach(inject(function(_$rootScope_, _$location_, _HackatonStefaniniService_,_$controller_, _$httpBackend_){
        $scope = _$rootScope_.$new();
        $controller = _$controller_('MenuController', {$scope: $scope});
        $location = _$location_;
        HackatonStefaniniService = _HackatonStefaniniService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Serviço MenuController exite?', function () {
        expect($controller).toBeDefined();
    });

    describe('Testando Rotar do MenuController', function () {
        var baseUrl = "http://localhost:8300/#!"

        it('Devera retornar rota de CadastrarPessoas', function () {
            var url = $controller.chamarPagina('cadastrarPessoa');
            var resultado = $location.url(url);

            expect(baseUrl + resultado).toBe('http://localhost:8300/#!/cadastrarPessoa');
        });

        it('Devera retornar rota de EditarPessoa', function () {
            var url = $controller.chamarPagina('EditarPessoa');
            var resultado = $location.url(url);

            expect(baseUrl + resultado).toBe('http://localhost:8300/#!/EditarPessoas');
        });

        it('Devera retornar rota de listarPessoas', function () {
            var url = $controller.chamarPagina('listarPessoa');
            var resultado = $location.url(url);

            expect(baseUrl + resultado).toBe('http://localhost:8300/#!/listarPessoas');
        });

        it('Devera retornar rota de cadastrarPerfis', function () {
            var url = $controller.chamarPagina('cadastrarPerfis');
            var resultado = $location.url(url);

            expect(baseUrl + resultado).toBe('http://localhost:8300/#!/cadastrarPerfis');
        });

        it('Devera retornar rota de listarPerfis', function () {
            var url = $controller.chamarPagina('listarPerfis');
            var resultado = $location.url(url);

            expect(baseUrl + resultado).toBe('http://localhost:8300/#!/listarPerfis');
        });

        it('Devera retornar rota de home', function () {
            var url = $controller.chamarPagina('home');
            var resultado = $location.url(url);

            expect(baseUrl + resultado).toBe('http://localhost:8300/#!/');
        });

        it('Devera retornar rota para o home', function () {
            var url = $controller.chamarPagina('qualquerUrl');
            var resultado = $location.url(url);

            expect(baseUrl + resultado).toBe('http://localhost:8300/#!/');
        });
    });
    
})