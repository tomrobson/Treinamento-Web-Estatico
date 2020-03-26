angular.module("hackaton-stefanini").controller("PerfilIncluirAlterarController", PerfilIncluirAlterarController);
PerfilIncluirAlterarController.$inject = [
    "$rootScope",
    "$scope",
    "$location",
    "$q",
    "$filter",
    "$routeParams",
    "HackatonStefaniniService"];

function PerfilIncluirAlterarController(
    $rootScope,
    $scope,
    $location,
    $q,
    $filter,
    $routeParams,
    HackatonStefaniniService) {

    /**Atributos da Tela */
    vm = this;

    vm.perfil = {
        id: null,
        nome: "",
        descricao: "",
        dataHoraInclusao: "",
        dataHoraAlteracao: ""
    };

    vm.data = {
        dataHoraInclusao: "",
        dataHoraAlteracao: ""
    }

    vm.url = "http://localhost:8080/treinamento/api/perfils/";

    /**Metodos de Inicializacao */
    vm.init = function() {
        vm.tituloTela = "Cadastrar Perfil";
        vm.acao = "Cadastrar";

        vm.listar(vm.url).then(
            function (response) {
                if (response !== undefined) {
                    vm.perfil = response;

                    if ($routeParams.id) {
                        vm.tituloTela = "Editar Perfil";
                        vm.acao = "Editar";

                        vm.recuperarObjetoPorIDURL($routeParams.id, vm.url).then(
                            function (perfilRetorno) {
                                if (perfilRetorno !== undefined) {
                                    vm.data.dataHoraInclusao = perfilRetorno.dataHoraInclusao;
                                    var date = new Date(vm.data.dataHoraInclusao);

                                    vm.perfil = perfilRetorno;
                                    vm.perfil.dataHoraInclusao = vm.exibirData(date);
                                    vm.perfil.dataHoraAlteracao = vm.exibirData(vm.criarData());
                                }
                            }
                        );
                    }
                }
            }
        );
    };

    /**Metodos de Tela */
    vm.cancelar = function() {
        vm.retornarTelaListagem();
    };

    vm.retornarTelaListagem = function() {
        $location.path("listarPerfis");
    };

    vm.incluir = function(obj) {
        if (obj !== undefined){
            vm.acao = obj.acao;
            vm.perfil = obj;
        }
        var deferred = $q.defer();

        if (vm.acao == "Cadastrar") {
            vm.perfil.dataHoraInclusao = vm.criarData();

            var objetoDados = angular.copy(vm.perfil);
            vm.salvar(vm.url, objetoDados).then(
                function (perfilRetorno) {
                    deferred.resolve(perfilRetorno);
                    vm.retornarTelaListagem();
                });
        } else if (vm.acao == "Editar") {
            vm.perfil.dataHoraInclusao = vm.data.dataHoraInclusao;
            vm.perfil.dataHoraAlteracao = vm.criarData();

            var objetoDados = angular.copy(vm.perfil);
            vm.alterar(vm.url, objetoDados).then(
                function (perfilRetorno) {
                    deferred.resolve(perfilRetorno);
                    vm.retornarTelaListagem();
                });
        }
        return deferred.promise;
    };

    vm.remover = function (objeto) {
        var urlPerfil = vm.url + objeto.id;
        var deferred = $q.defer();
        
        vm.excluir(urlPerfil).then(
            function (objetoRetorno) {
                deferred.resolve(objetoRetorno);
                vm.retornarTelaListagem();
            });
        return deferred.promise;
    };

    /**Metodos de servico */
    vm.recuperarObjetoPorIDURL = function (id, url) {
        var deferred = $q.defer();
        HackatonStefaniniService.listarId(url + id).then(
            function (response) {
                if (response.data !== undefined) 
                    deferred.resolve(response.data);
                else
                    deferred.resolve(vm.perfil);
            }
        );
        return deferred.promise;
    };

    vm.listar = function (url) {
        var deferred = $q.defer();
        HackatonStefaniniService.listar(url).then(
            function (response) {
                if (response.data !== undefined) {
                    deferred.resolve(response.data);
                }
            }
        );
        return deferred.promise;
    };

    vm.salvar = function (url, objeto) {
        var deferred = $q.defer();
        var obj = JSON.stringify(objeto);
        HackatonStefaniniService.incluir(url, obj).then(
            function (response) {
                if (response.status == 200)
                    deferred.resolve(response.data);
            }
        );
        return deferred.promise;
    };

    vm.alterar = function (url, objeto) {
        var deferred = $q.defer();
        var obj = JSON.stringify(objeto);
        HackatonStefaniniService.alterar(url, obj).then(
            function (response) {
                if (response.status == 200)
                    deferred.resolve(response.data);
            }
        );
        return deferred.promise;
    };

    vm.excluir = function (url, objeto) {
        var deferred = $q.defer();
        HackatonStefaniniService.excluir(url).then(
            function (response) {
                if (response.status == 200)
                    deferred.resolve(response.data);
            }
        );
        return deferred.promise;
    };

    /**Metodos Auxiliares */
    vm.criarData = function () {
        var data = new Date();
        data = data.toJSON();

        return data;
    }

    vm.exibirData = function (date) {
		var data = new Date(date);
        data = data.toLocaleDateString();

	    return data;
	};
}