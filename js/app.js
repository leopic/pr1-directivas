angular.module('proyectoUno', [])
    /**
     * Uso:
     * <p hola-mundo><p>.
     */
    .directive('holaMundo', function() {
        return {
            // La directiva solo puede usarse como atributo
            restrict: 'A',
            // Va a remplazar el contenido del elemento que lo contiene
            replace: true,
            // Usará el siguiente HTML como contenido
            template: '<p class="alert alert-info">Hola Mundo</p>'
        }
    })
    /**
     * Uso:
     * <tarjeta-de-usuario></tarjeta-de-usuario>
     */
    .directive('tarjetaDeUsuario', function() {
        return {
            // La directiva está restringida a elementos
            restrict: 'E',
            // Se anidará dentro del elemento que la incluye
            replace: false,
            // Usará el siguiente HTML
            template:
                '<p><strong>Nombre</strong> {{usuario.nombre}} {{usuario.apellido}}. </p>' +
                '<p><strong>Edad</strong> {{usuario.edad}}. </p>'
        }
    })
    /**
     * Uso:
     * <tarjeta-version-dos></tarjeta-version-dos>
     */
    .directive('tarjetaVersionDos', function() {
        return {
            restrict: 'E',
            replace: false,
            // Usará el siguiente HTML
            templateUrl: 'html/directiva-version-dos.html'
        }
    })
    /**
     * Uso:
     * <tarjeta-version-tres></tarjeta-version-tres>
     */
    .directive('tarjetaVersionTres', function() {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'html/directiva-version-tres.html',
            // Crea un scope aislado donde se hace un enlace de una via desde el controlador hacia la directiva
            scope: {
                nombre: '@',
                apellido: '@',
                edad: '@',
                id: '@'
            }
        }
    })
    /**
     * Uso:
     * <input-doble></input-doble>
     */
    .directive('inputDoble', function() {
        /**
         * Función ejecutada cuando se `compila` el HTML.
         *
         * @param scope         de la directiva
         * @param elemento      sobre el que estamos trabajando
         * @param atributos     del elemento
         */
        var link = function(scope, elemento, atributos) {
            scope.$watch('objetoComplejo', function(valorActual, valorAnterior) {
                var hayNuevoValor = valorActual && valorActual.indexOf(':') !== -1;

                if (hayNuevoValor) {
                    var valores = valorActual.split(':'),
                        llave = valores[0],
                        valor = valores[1],
                        objeto = {};

                    objeto[llave] = valor;
                    scope.objeto = objeto;
                } else {
                    scope.objeto = null;
                }
            });
        };

        return {
            link: link,
            restrict: 'E',
            replace: false,
            templateUrl: 'html/input-doble.html',
            /**
             * Cree dos valores para el scope de la directiva, ambos se comunican en ambas direcciones con el
             * controlador que la contiene.
             */
            scope: {
                objetoComplejo: '=',
                objeto: '='
            }
        }
    })
    .controller('ProyectoUnoController',
        ['$scope', function ($scope) {
            $scope.init = function() {
                var fecha = (new Date()).valueOf();

                $scope.usuario = {
                    id: fecha,
                    nombre: 'Leo',
                    apellido: 'Picado',
                    edad: 30,
                    genero: 'Masculino'
                };
            };

            $scope.init();
        }])
;
