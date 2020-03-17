angular.module("hackaton-stefanini").controller("PerfilListarController", PerfilListarController);
PerfilListarController.$inject = ["$rootScope", "$scope", "$location",
    "$q", '$filter', '$routeParams', 'HackatonStefaniniService'];

function PerfilListarController($rootScope, $scope, $location,
    $q, $filter, $routeParams, HackatonStefaniniService) {
    vm = this;

    vm.qdePorPagina = 5;
    vm.ultimoIndex = 0;
    vm.contador = 0;

    vm.url = "http://localhost:8080/treinamento/api/perfils/";

    vm.init = function () {
        HackatonStefaniniService.listar(vm.url).then(
            function (responsePerfil) {
                if (responsePerfil.data !== undefined) 
                    vm.listarPerfis = responsePerfil.data;

                vm.listaPerfilMostrar = [];
                var max = vm.listarPerfis.length > vm.qdePorPagina ? vm.qdePorPagina : vm.listarPerfis.length;

                vm.qdePaginacao = new Array(vm.listarPerfis.length % vm.qdePorPagina === 0 ? vm.listarPerfis.length / vm.qdePorPagina : parseInt(vm.listarPerfis.length / vm.qdePorPagina) + 1);
                vm.currentPage = 1;
                for (var count = 0; count < max; count++) {
                    vm.listaPerfilMostrar.push(vm.listarPerfis[count]);
                    vm.ultimoIndex++;
                }

                vm.listaPerfilMostrar.sort(function (a, b) {
                    return a.id - b.id;
                });
            }
        );
    };

    vm.atualizarPaginanacao = function (index) {

        if (index >= vm.currentPage)
            vm.avancarPaginanacao(index);
        else
            vm.retrocederPaginanacao(index);
    };

    vm.avancarPaginanacao = function (index) {
        vm.listaPerfilMostrar = [];
        vm.currentPage++;

        var idx = angular.copy(vm.ultimoIndex);
        var cont = vm.listarPerfis.length - vm.qdePorPagina;
        for (var count = cont > vm.qdePorPagina ? vm.qdePorPagina : cont; count > 0; count--) {
            vm.listaPerfilMostrar.push(vm.listarPerfis[idx++]);
            vm.ultimoIndex++;
            vm.contador++;
        }

        vm.listaPerfilMostrar.sort(function (a, b) {
            return a.id - b.id;
        });
    };

    vm.retrocederPaginanacao = function (index) {
        
        vm.listaPerfilMostrar = [];

        vm.currentPage--;
        var idx = vm.contador - 1;
        vm.ultimoIndex = idx + 1;
        for (var count = vm.qdePorPagina; count > 0; count--) {
            vm.listaPerfilMostrar.push(vm.listarPerfis[idx--]);
            vm.contador--;
        }
        vm.listaPerfilMostrar.sort(function (a, b) {
            return a.id - b.id;
        });
    };

    vm.editar = function (id) {
        if (id !== undefined)
            $location.path("EditarPerfis/" + id);
        else
            $location.path("cadastrarPerfis");
    }

    vm.remover = function (id) {
        var liberaExclusao = true;

        angular.forEach(vm.listarPerfis, function (value, key) {
            if (value.id === id)
                liberaExclusao = false;
        });

        if (liberaExclusao)
            HackatonStefaniniService.excluir(vm.url + id).then(
                function (response) {
                    vm.init();
                }
            );
        else {
            alert("Perfil com Pessoa vinculado, exclusão não permitida");
        }
    }

    vm.retornarTelaListagem = function () {
        $location.path("listarPerfis");
    }
}