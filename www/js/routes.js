angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.sERVICIOS', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/sERVICIOS.html',
        controller: 'sERVICIOSCtrl'
      }
    }
  })

  /*.state('nuevaSolicitud', {
    url: '/page2',
    templateUrl: 'templates/favor.html',
    controller: 'nuevaSolicitud'
  })*/

.state('menu.solicitud', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/favor.html',
        controller: 'nuevaSolicitud'
      }
    }
  })


  .state('misolicitudes', {
    url: '/page3',
    templateUrl: 'templates/mISSOLICITUDES.html',
    controller: 'missolicitudes'
  })

  .state('menu.eDITARINFORMACIN', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/eDITARINFORMACIN.html',
        controller: 'eDITARINFORMACINCtrl'
      }
    }
  })

  .state('menu.cONTACTENOS', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cONTACTENOS.html',
        controller: 'cONTACTENOSCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('inicio', {
    url: '/page5',
    templateUrl: 'templates/inicio.html',
    controller: 'inicioCtrl'
  })
  .state('registro', {
    url: '/page10',
    templateUrl: 'templates/registro.html',
    controller: 'registroCtrl'
  })
  .state('olvidoClave', {
    url: '/pageClave',
    templateUrl: 'templates/olvidoClave.html',
    controller: 'olvidoClave'
  })

  .state('login', {
    url: '/page4',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('detalleServicio', {
    url: '/page8/:idServicio',
    templateUrl: 'templates/nUESTROSSERVICIOS.html',
    controller: 'detalleServicio'
  })

  .state('detalleSolicitud', {
    url: '/descSol/:solicitud',
    templateUrl: 'templates/descSol.html',
    controller: 'descSolCtrl'
  })

  /*.state('menu.login', {
    url: '/page4',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })*/

  /*.state('menu.inicio', {
    url: '/page5',
    views: {
      'side-menu21': {
        templateUrl: 'templates/inicio.html',
        controller: 'inicioCtrl'
      }
    }
  })*/

  /*.state('menu.registro', {
    url: '/page10',
    views: {
      'side-menu21': {
        templateUrl: 'templates/registro.html',
        controller: 'registroCtrl'
      }
    }
  })*/

  .state('menu.notificaciones', {
    url: '/noti',
    views: {
      'side-menu21': {
        templateUrl: 'templates/notificaciones.html',
        controller: 'notificacionesCtrl'
      }
    }
  })

 /* .state('menu.descSol', {
    url: '/descSol',
    views: {
      'side-menu21': {
        templateUrl: 'templates/descSol.html',
        controller: 'descSolCtrl'
      }
    }
  })*/

  .state('menu.favor', {
    url: '/favor',
    views: {
      'side-menu21': {
        templateUrl: 'templates/favor.html',
        controller: 'favorCtrl'
      }
    }
  })

  /*.state('menu.nUESTROSSERVICIOS', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/nUESTROSSERVICIOS.html',
        controller: 'nUESTROSSERVICIOSCtrl'
      }
    }
  })*/
//localStorage.clear()
//valido la sessión, si la hay envió al home de la app, si no la hay envio al inicio
var session = localStorage["id_usuario"];
if(session != undefined)
{
  $urlRouterProvider.otherwise('/side-menu21/page2')
}
else
{
  $urlRouterProvider.otherwise('/page5')
}



  

});