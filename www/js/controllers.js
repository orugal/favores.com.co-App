var $ =jQuery.noConflict();
var hayNotificacion = 0;
angular.module('app.controllers', [])
  
.controller('inicioCtrl', ['$scope', '$stateParams','$ionicLoading','funciones','$ionicPopup','$ionicLoading','$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicLoading,funciones,$ionicPopup,$ionicLoading,$location) 
{
	$scope.mostrarMenu = 0;

}])
   
.controller('registroCtrl',function ($scope, $http, $q, $stateParams,$state,$ionicLoading,funciones,$ionicPopup,$ionicLoading,$location) 
{
	$scope.mostrarMenu = 0;
	$scope.initRegistro = function()
	{
		/*var parametros = "accion=0";
		funciones.consultaApi(funciones.urlAPi,parametros,function(json){
			//realizo la validació
			if(json.continuar == 1)
			{
				funciones.popAlert("REGITRO DE USUARIO",json.mensaje,function(){
					
				},$ionicPopup);
			}
			else
			{
				funciones.popAlert("ERROR DE REGISTRO",json.mensaje,function(){

				},$ionicPopup);
			}
		},true,$ionicLoading)*/
	}

	$scope.enviaRegistro = function()
	{
		//alert("Alerta!!");
		var tituloPop	=	"COMPLETE LA INFORMACIÓN";
		//declaro las variables del registro
		$scope.nombre 		=  $("#nombre").val();
		$scope.correo 		=  $("#email").val();
		$scope.celular 		=  $("#celular").val();
		$scope.ciudad 		=  $("#ciudad").val();
		$scope.clave 		=  $("#clave").val();
		$scope.rclave 		=  $("#rclave").val();
		$scope.terminos 	=  $("#terminos:checked").val();
		
		//inicio con la validación de 
		if($scope.nombre == "" || $scope.nombre == undefined)
		{
			funciones.popAlert(tituloPop,"Debe escribir su nombre",function(){},$ionicPopup);
		}
		else if($scope.correo == undefined || $scope.correo == "")
		{
			funciones.popAlert(tituloPop,"Debe escribir un correo electrónico válido",function(){},$ionicPopup);
		}
		else if($scope.correo != "" && !funciones.validaMail($scope.correo))
		{
			funciones.popAlert(tituloPop,"El correo electrónico que ingreso no es válido, por favor verifique",function(){},$ionicPopup);
		}
		else if($scope.celular == undefined || $scope.celular == "")
		{
			funciones.popAlert(tituloPop,"Debe un número de celular de contacto",function(){},$ionicPopup);
		}
		else if($scope.celular != "" && isNaN($scope.celular))
		{
			funciones.popAlert(tituloPop,"El campo celular sólo puede contener números",function(){},$ionicPopup);
		}
		else if($scope.ciudad == undefined || $scope.ciudad == "")
		{
			funciones.popAlert(tituloPop,"Debe seleccionar la ciudad de residencia",function(){},$ionicPopup);
		}
		else if($scope.clave == undefined || $scope.clave == "")
		{
			funciones.popAlert(tituloPop,"Por favor ingrese una contraseña para su cuenta",function(){},$ionicPopup);
		}
		else if($scope.rclave == undefined || $scope.rclave == "")
		{
			funciones.popAlert(tituloPop,"Por favor repita la contraseña que acaba de ingresar",function(){},$ionicPopup);
		}
		else if($scope.rclave != "" && $scope.rclave != $scope.clave)
		{
			funciones.popAlert(tituloPop,"Las contraseñas no coinciden, por favor verifique",function(){},$ionicPopup);
		}
		else if(!$('#terminos').prop('checked'))
		{
			funciones.popAlert(tituloPop,"Debe aceptar los términos y condiciones",function(){},$ionicPopup);
		}
		else
		{
			//primedo realizo una confirmación
			funciones.popConfirm("PROCESODE REGISTRO","Está a punto de crear un usuario para la aplicación Favores.com.co, desea confinuar",function(){
				//procdeo a consular ajax para hacer la inserción del usuario nuevo
				var parametros = $("#formRegistro").serialize()+"&accion=1";
				funciones.consultaApi(funciones.urlAPi,parametros,function(json){
					//realizo la validació
					if(json.continuar == 1)
					{
						funciones.popAlert("REGISTRO DE USUARIO",json.mensaje,function(){
							$state.go('login');
						},$ionicPopup);
					}
					else
					{
						funciones.popAlert("ERROR DE REGISTRO",json.mensaje,function(){

						},$ionicPopup);
					}
				},true,$ionicLoading)
				
			},$ionicPopup,$ionicPopup)

		}
	}
})


.controller('olvidoClave',function ($scope, $http, $q, $stateParams,$state,$ionicLoading,funciones,$ionicPopup,$ionicLoading,$location) 
{
	$scope.mostrarMenu = 0;
	$scope.initRecordar = function()
	{

	}
	$scope.recordarClave = function()
	{
		//valido campos
		$scope.email = $("#email").val();
		if($scope.email == undefined || $scope.email == "")
		{
			funciones.popAlert("Complete los campos","Debe escribir el correo electrónico con el que se registró.",function(){},$ionicPopup);
		}
		else if($scope.email != "" && !funciones.validaMail($scope.email))
		{
			funciones.popAlert("Complete los campos","El correo electrónico no es correcto, por favor verifique.",function(){},$ionicPopup);
		}
		else
		{
			funciones.popConfirm("CONFIRMACIÓN","Está a punto de hacer una solicitud de cambio de contraseña, desea confinuar",function(){
				//procdeo a consular ajax para hacer la inserción del usuario nuevo
				var parametros = $("#formRecordar").serialize()+"&accion=11";
				funciones.consultaApi(funciones.urlAPi,parametros,function(json){
					//realizo la validació
					if(json.continuar == 1)
					{
						funciones.popAlert("RECORDAR CLAVE",json.mensaje,function(){
							//debo enrutar al inicio de la app y levantar la sessión
						},$ionicPopup);
					}
					else
					{
						funciones.popAlert("RECORDAR CLAVE",json.mensaje,function(){

						},$ionicPopup);
					}
				},true,$ionicLoading,$ionicPopup)
			},$ionicPopup);

			
		}
	}
})
//controlador del login
.controller('loginCtrl',function ($scope,$http, $q, $stateParams,$state,$ionicLoading,funciones,$ionicPopup,$ionicLoading,$location) 
{
	//alert("Alerta!!");
	$scope.validaLogin = function()
	{
	 	$scope.username 	= $("#username").val();
		$scope.contrasena 	= $("#contrasena").val();
		var tituloPop	=	"COMPLETE LA INFORMACIÓN";

		//inicio con la validación de 
		if($scope.username == undefined || $scope.username == "")
		{
			funciones.popAlert(tituloPop,"Debe escribir su nombre de usuario",function(){},$ionicPopup);
		}
		else if($scope.contrasena == undefined || $scope.contrasena == "")
		{
			funciones.popAlert(tituloPop,"Debe escribir su contraseña de acceso",function(){},$ionicPopup);
		}
		else
		{
			//procdeo a consular ajax para hacer la inserción del usuario nuevo
			var parametros = $("#formLogin").serialize()+"&codigoCelular="+localStorage["reg"]+"&accion=2";
			funciones.consultaApi(funciones.urlAPi,parametros,function(json){
				//realizo la validació
				if(json.continuar == 1)
				{
					funciones.popAlert("REGISTRO DE USUARIO",json.mensaje,function(){
						//debo enrutar al inicio de la app y levantar la sessión
						localStorage["id_usuario"] = json.datos.idusuario;
						$state.go('menu.sERVICIOS');
					},$ionicPopup);
				}
				else
				{
					funciones.popAlert("ERROR DE REGISTRO",json.mensaje,function(){

					},$ionicPopup);
				}
			},true,$ionicLoading,$ionicPopup)
		}
	}

})
  
.controller('sERVICIOSCtrl', function ($scope,$http, $q, $stateParams,$state,$ionicLoading,funciones,$ionicPopup,$ionicLoading,$location,testeo){

	$scope.mostrarMenu = 1;
	$scope.listaServicios = [];

	$scope.initServicios = function()
	{
		$scope.getServicios();
		testeo.testeo()
	}
	$scope.refreshServicios = function()
	{
		$scope.getServicios();
		$scope.$broadcast('scroll.refreshComplete');
	}
	$scope.getServicios = function()
	{
		var parametros = "&accion=3";
		funciones.consultaApi(funciones.urlAPi,parametros,function(json){
			//realizo la validació
			if(json.continuar == 1)
			{
				$scope.listaServicios  = json.datos;
			}
		},false,$ionicLoading,$ionicPopup)
	}
})


.controller('detalleServicio', function ($scope,$http, $q, $stateParams,$state,$ionicLoading,$ionicHistory,funciones,$ionicPopup,$ionicLoading,$location) 
{
	$scope.dataServicio = [];
	$scope.myGoBack = function() 
	{
	    $ionicHistory.goBack();
	};


	var parametros = "&accion=3&idServicio="+$stateParams.idServicio;
	funciones.consultaApi(funciones.urlAPi,parametros,function(json){
		//realizo la validació
		if(json.continuar == 1)
		{
			$scope.dataServicio  = json.datos;
			$scope.contenidoPanel  = json.datos[0].resumen+"<br><br>"+json.datos[0].contenido
		}
	},true,$ionicLoading,$ionicPopup)
	
	//alert("dkfhsdkfjdhskf");
})
   
.controller('nuevaSolicitud', function ($scope,$http, $q, $stateParams,$state,$ionicLoading,$ionicHistory,funciones,$ionicPopup,$ionicLoading,$location,ionicTimePicker,testeo) 
{

	$scope.listaServicios = [];
	$scope.volver = function() 
	{
	//	$scope.compileAngularElement("#page8");
	    $ionicHistory.goBack();
	}

	$scope.initSolicitudN = function()
	{
		$scope.getServicios();
		testeo.testeo();

	}

	$scope.openTimePicker1 = function (caja) {
      var ipObj1 = {
        callback: function (val) {
          if (typeof (val) === 'undefined') {
            console.log('Time not selected');
          } else {
            var selectedTime = new Date(val * 1000);
            //console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
            var min = (selectedTime.getUTCMinutes() == 0)?"00":selectedTime.getUTCMinutes();
            $(caja).val(selectedTime.getUTCHours()+":"+min);
          }
        },
        inputTime: 50400,
        format: 24,
        setLabel: 'DEFINIR',
        closeLabel: 'CERRAR'
      };
      ionicTimePicker.openTimePicker(ipObj1);
    }

	$scope.getServicios = function()
	{
		var parametros = "&accion=3";
		funciones.consultaApi(funciones.urlAPi,parametros,function(json){
			//realizo la validació
			if(json.continuar == 1)
			{
				$scope.listaServicios  = json.datos;
			}
		},true,$ionicLoading,$ionicPopup)
	}

	$scope.poneFormulario = function(id)
	{
		var idSel	=	$("#servicio").find(':selected').val();
		var dataSel	=	$("#servicio").find(':selected').data('form')
		var ejemplo	=	$("#servicio").find(':selected').data('ejemplo')
		//habilito el formulario necesario
		$(".forms").hide();
		$("#ejemplo").html("");
		$("#ejemplo").html("Ej: "+ejemplo);
		$("#form"+dataSel).fadeIn();
		$("#formCaja").val(dataSel);
	}


	$scope.compileAngularElement = function(elSelector) 
	{
	    var elSelector = (typeof elSelector == 'string') ? elSelector : null ;  
	        // The new element to be added
	    if (elSelector != null ) {
	        var $div = $( elSelector );

	            // The parent of the new element
	            var $target = $("[ng-app]");

	          angular.element($target).injector().invoke(['$compile', function ($compile) {
	                    var $scope = angular.element($target).scope();
	                    $compile($div)($scope);
	                    // Finally, refresh the watch expressions in the new element
	                    $scope.$apply();
	                }]);
	        }
    }

	$scope.saveSolicitud = function()
	{
		//alert("Asdasdsad")
		var servicio 		= 	$("#servicio").val();
		var form 			= 	$("#formCaja").val();
		
		var formCompleto 	=	false;
		var tituloPop		=	"Formulario solicitud";
		var session 		= localStorage["id_usuario"];

		//valido el formulario para saber que validaciones debo hacer
		if(form == 1)//formulario sencillo
		{
			//alert("dfksdhfkjhk")
			var tipoFavor		=	$("#servicio").val();
			var fecha			=	$("#fecha").val();
			var hora			=	$("#hora").val();
			var direccion1 	 	= 	$("#direccion1").val();
			var persona1  		= 	$("#persona1").val();
			var telefono1  		= 	$("#telefono1").val();
			var contenidoFavor	=	$("#contenidoFavor").val();
			
			//valido campos
			if(tipoFavor == "")
			{
				funciones.popAlert("Formulario de solicitud","Seleccione el tipo de favor",function(){},$ionicPopup);
			}
			else if(fecha == "")
			{
				funciones.popAlert("Formulario de solicitud","Seleccione la fecha del favor",function(){},$ionicPopup);
			}
			else if(hora == "")
			{
				funciones.popAlert("Formulario de solicitud","Seleccione la hora del favor",function(){},$ionicPopup);
			}
			else if(direccion1 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba la dirección de origen.",function(){},$ionicPopup);
			}
			else if(persona1 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba el nombre del contacto con el que debemos comunicarnos.",function(){},$ionicPopup);
			}
			else if(telefono1 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba un número de teléfono de contacto.",function(){},$ionicPopup);
			}
			else if(contenidoFavor == "")
			{
				funciones.popAlert("Formulario de solicitud","Especifique con detalles el favor que desea que relicemos",function(){},$ionicPopup);
			}
			else
			{
				formCompleto 	=	true;
				var parametros = "form="+form+"&accion=6&fecha="+fecha+"&hora="+hora+"&direccion1="+direccion1+"&persona1="+persona1+"&telefono1="+telefono1+"&texto="+contenidoFavor+"&usuario="+session+"&servicio="+servicio;
			}
		}
		else if(form == 2)//solo datos de origen
		{
			var fecha			=	$("#fecha2").val();
			var hora			=	$("#hora2").val();
			var contenidoFavor	=	$("#contenidoFavor2").val();
			var direccion1 	 	= 	$("#direccion1").val();
			var persona1  		= 	$("#persona1").val();
			var telefono1  		= 	$("#telefono1").val();

			if(fecha == "")
			{
				funciones.popAlert("Formulario de solicitud","Seleccione la fecha del favor",function(){},$ionicPopup);
			}
			else if(hora == "")
			{
				funciones.popAlert("Formulario de solicitud","Seleccione la hora del favor",function(){},$ionicPopup);
			}
			else if(direccion1 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba la dirección de origen.",function(){},$ionicPopup);
			}
			else if(persona1 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba el nombre del contacto con el que debemos comunicarnos.",function(){},$ionicPopup);
			}
			else if(telefono1 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba un número de teléfono de contacto.",function(){},$ionicPopup);
			}
			else if(contenidoFavor == "")
			{
				funciones.popAlert("Formulario de solicitud","Especifique con detalles del favor que desea que relicemos",function(){},$ionicPopup);
			}
			else
			{
				formCompleto 	=	true;
				var parametros = "form="+form+"&accion=6&fecha="+fecha+"&hora="+hora+"&texto="+contenidoFavor+"&usuario="+session+"&servicio="+servicio+"&direccion1="+direccion1+"&persona1="+persona1+"&telefono1="+telefono1;
			}
		}
		else if(form == 3)//solo datos de destino
		{
			var fecha			=	$("#fecha3").val();
			var hora			=	$("#hora3").val();
			var contenidoFavor	=	$("#contenidoFavor3").val();
			var direccion2 	 	= 	$("#direccion2").val();
			var persona2  		= 	$("#persona2").val();
			var telefono2  		= 	$("#telefono2").val();

			if(fecha == "")
			{
				funciones.popAlert("Formulario de solicitud","Seleccione la fecha del favor",function(){},$ionicPopup);
			}
			else if(hora == "")
			{
				funciones.popAlert("Formulario de solicitud","Seleccione la hora del favor",function(){},$ionicPopup);
			}
			else if(direccion2 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba la dirección de destino.",function(){},$ionicPopup);
			}
			else if(persona2 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba el nombre del contacto con el que debemos comunicarnos.",function(){},$ionicPopup);
			}
			else if(telefono2 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba un número de teléfono de contacto.",function(){},$ionicPopup);
			}
			else if(contenidoFavor == "")
			{
				funciones.popAlert("Formulario de solicitud","Especifique con detalles del favor que desea que relicemos",function(){},$ionicPopup);
			}
			else
			{
				formCompleto 	=	true;
				var parametros = "form="+form+"&accion=6&fecha="+fecha+"&hora="+hora+"&texto="+contenidoFavor+"&usuario="+session+"&servicio="+servicio+"&direccion2="+direccion2+"&persona2="+persona2+"&telefono2="+telefono2;
			}

		}
		else if(form == 4)//datos de origen y destino
		{
			var fecha			=	$("#fecha4").val();
			var hora			=	$("#hora4").val();
			var direccion1 	 	= 	$("#direccion14").val();
			var persona1  		= 	$("#persona14").val();
			var telefono1  		= 	$("#telefono14").val();
			var direccion2 	 	= 	$("#direccion24").val();
			var persona2  		= 	$("#persona24").val();
			var telefono2  		= 	$("#telefono24").val();
			var contenidoFavor	=	$("#contenidoFavor4").val();

			if(fecha == "")
			{
				funciones.popAlert("Formulario de solicitud","Seleccione la fecha del favor",function(){},$ionicPopup);
			}
			else if(hora == "")
			{
				funciones.popAlert("Formulario de solicitud","Seleccione la hora del favor",function(){},$ionicPopup);
			}
			else if(direccion1 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba la dirección de origen.",function(){},$ionicPopup);
			}
			else if(persona1 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba el nombre del contacto con el que debemos comunicarnos.",function(){},$ionicPopup);
			}
			else if(telefono1 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba un número de teléfono de contacto.",function(){},$ionicPopup);
			}
			else if(direccion2 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba la dirección de destino.",function(){},$ionicPopup);
			}
			else if(persona2 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba el nombre del contacto con el que debemos comunicarnos.",function(){},$ionicPopup);
			}
			else if(telefono2 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba un número de teléfono de contacto.",function(){},$ionicPopup);
			}
			else if(contenidoFavor == "")
			{
				funciones.popAlert("Formulario de solicitud","Especifique con detalles del favor que desea que relicemos",function(){},$ionicPopup);
			}
			else
			{
				formCompleto 	=	true;
				var parametros = "form="+form+"&accion=6&fecha="+fecha+"&hora="+hora+"&texto="+contenidoFavor+"&usuario="+session+"&servicio="+servicio+"&direccion1="+direccion1+"&persona1="+persona1+"&telefono1="+telefono1+"&direccion2="+direccion2+"&persona2="+persona2+"&telefono2="+telefono2;
			}
		}


		//valido si el formulario está completo para el envio
		if(formCompleto)
		{

			funciones.popConfirm("CONFIRMACIÓN","Está a punto de enviar una solicitud con la información ingresada, desea confinuar",function(){
					funciones.consultaApi(funciones.urlAPi,parametros,function(json){
						//realizo la validació
						if(json.continuar == 1)
						{
							funciones.popAlert("SOLICITUD EXITOSA",json.mensaje,function(){
								$("#fecha").val("");
								$("#hora").val("");
								$("#direccion1").val("");
								$("#persona1").val("");
								$("#telefono1").val("");
								$("#contenidoFavor").val("");
								$state.go('misolicitudes');
							},$ionicPopup);
						}
						else
						{
							funciones.popAlert("ERROR DE SOLICITUD",json.mensaje,function(){},$ionicPopup);
						}
					},true,$ionicLoading,$ionicPopup)
			},$ionicPopup);

			
		}
	}

})
   
.controller('missolicitudes', function ($scope,$http, $q, $stateParams,$state,$ionicLoading,$ionicHistory,funciones,$ionicPopup,$ionicLoading,$location,testeo) 
{

	$scope.listaSolicitudes = [];

	var session = localStorage["id_usuario"];
	$scope.initSolicitudes = function()
	{
		$scope.getSolicitudes();
		testeo.testeo()
	}
	$scope.refreshSolicitudes = function()
	{
		$scope.getSolicitudes();
		$scope.$broadcast('scroll.refreshComplete');
	}
	$scope.getSolicitudes = function()
	{
		var parametros = "&accion=5&usuario="+session;
		funciones.consultaApi(funciones.urlAPi,parametros,function(json){
			//realizo la validació
			if(json.continuar == 1)
			{
				$scope.listaSolicitudes  = json.datos;
			}
		},true,$ionicLoading,$ionicPopup)
	}

	$scope.$on('$viewContentLoading', 
		function(event, viewConfig){ 
			//alert("refrescando vista")
		    scope.getSolicitudes();
	});

})


.controller('descSolCtrl', function ($scope,$http, $q, $stateParams,$state,$ionicLoading,$ionicHistory,funciones,$ionicPopup,$ionicLoading,$location,testeo) 
{
	$scope.dataSolicitud = [];
	$scope.transacciones  = [];
	var session = localStorage["id_usuario"];
	$scope.myGoBack = function() 
	{
	    $ionicHistory.goBack();
	};

	$scope.initDetalleSolicitud = function()
	{
		$scope.getInfoSolicitud();
		testeo.testeo()
	}

	$scope.refreshSolicitudes = function()
	{
		$scope.getInfoSolicitud();
		$scope.$broadcast('scroll.refreshComplete');
	}

	$scope.getInfoSolicitud = function()
	{
		var parametros = "accion=5&idSolicitud="+$stateParams.solicitud+"&usuario="+session;
		funciones.consultaApi(funciones.urlAPi,parametros,function(json){
			//realizo la validació
			if(json.continuar == 1)
			{
				$scope.dataSolicitud  = json.datos[0];
				$scope.getTransacciones();
				//ahora debo traer las transacciones de las solicitudes
			}
		},true,$ionicLoading,$ionicPopup)
	}
	$scope.getTransacciones= function()
	{
		var parametros = "accion=12&idSolicitud="+$stateParams.solicitud+"&usuario="+session;
		funciones.consultaApi(funciones.urlAPi,parametros,function(json){
			//realizo la validació
			if(json.continuar == 1)
			{
				//alert(json.datos[0].nombres);
				$scope.transacciones = json;
				$scope.$digest();
			}
			else
			{
				$scope.transacciones = [];
				$scope.$digest();
			}
		},true,$ionicLoading,$ionicPopup)
	}
	$scope.enviaPregunta = function(estado,solicitud)
	{
		var pregunta = $("#pregunta").val();
		if(pregunta == "")
		{
			funciones.popAlert("ATENCIÓN","Debe escribir primero una pregunta.",function(){},$ionicPopup);
		}
		else
		{
			funciones.popConfirm("CONFIRMACIÓN","Está a punto de enviar una pregunta al usuario prestador del servicio, desea confinuar",function(){
				var parametros = "accion=8&idSolicitud="+solicitud+"&estado="+estado+"&pregunta="+pregunta+"&usuario="+session;
				funciones.consultaApi(funciones.urlAPi,parametros,function(json){
					//realizo la validació
					if(json.continuar == 1)
					{
						funciones.popAlert("ATENCIÓN",json.mensaje,function(){
							$("#pregunta").val("");
							$scope.getTransacciones();
						},$ionicPopup);
					}
					else
					{
						funciones.popAlert("ATENCIÓN",json.mensaje,function(){
							$("#pregunta").val("");
						},$ionicPopup);
					}
				},true,$ionicLoading,$ionicPopup)

			},$ionicPopup);
		}
	}
	$scope.resultadoUsuario	= function(solicitud,estado)
	{
		var mensaje		=	(estado==6)?"Esta seguro que desea rechazar el servicio?":"Está a punto de aprobar el servicio, desea continuar?";

		funciones.popConfirm("CONFIRMACIÓN",mensaje,function(){

			var parametros = "accion=9&idSolicitud="+solicitud+"&estado="+estado+"&usuario="+session;
				funciones.consultaApi(funciones.urlAPi,parametros,function(json){
					//realizo la validació
					if(json.continuar == 1)
					{
						funciones.popAlert("ATENCIÓN",json.mensaje,function(){
							//alert("jjdfhdsjkfdhskj")
							//$state.go('detalleSolicitud', {solicitud: solicitud})
							//location.reload()
							$scope.getInfoSolicitud();
						},$ionicPopup);
					}
					else
					{
						funciones.popAlert("ATENCIÓN",json.mensaje,function(){
							//alert("jjdfhdsjkfdhskj")
							//$state.go('detalleSolicitud', {solicitud: solicitud})
							//location.reload()
							$scope.getInfoSolicitud();
						},$ionicPopup);
					}
				},true,$ionicLoading,$ionicPopup)

		},$ionicPopup);
	}

	

})


   
.controller('eDITARINFORMACINCtrl',function ($scope,$http, $q, $stateParams,$state,$ionicLoading,$ionicHistory,funciones,$ionicPopup,$ionicLoading,$location,testeo) 
{
	$scope.dataUsuario = [];
	$scope.nombres = "";
	$scope.email = "";
	$scope.celular = "";
	$scope.ciudad = "";
	var tituloPop = "VERIFIQUE EL FORMULARIO"
	var session = localStorage["id_usuario"];
	$scope.initDataUsuario = function()
	{
		$scope.consultaDataUsuario();
		testeo.testeo()
	}
	$scope.consultaDataUsuario = function()
	{
		var parametros = "accion=13&usuario="+session;
		funciones.consultaApi(funciones.urlAPi,parametros,function(json){
			//realizo la validación
			if(json.continuar == 1)
			{
				//alert(json.datos)
				$scope.nombres		=	json.datos.nombres;
				$scope.email		=	json.datos.email;
				$scope.celular		=	json.datos.celular;
				$scope.ciudad		=	json.datos.ciudad;
				$scope.digest()
			}
			else
			{
				$scope.nombres		=	"";
				$scope.email		=	"";
				$scope.celular		=	"";
				$scope.ciudad		=	"";;
				$scope.digest()
			}
		},true,$ionicLoading,$ionicPopup)
	}
	$scope.cambioClave = function()
	{
		$scope.clave  = $("#clave").val();
		$scope.nclave = $("#nclave").val();
		$scope.rclave = $("#rclave").val();
		//valido campos
		if($scope.clave == "" || $scope.clave == undefined)
		{
			funciones.popAlert(tituloPop,"Debe escribir su clave actual",function(){},$ionicPopup);
		}
		else if($scope.nclave == "" || $scope.nclave == undefined)
		{
			funciones.popAlert(tituloPop,"Debe escribir su nueva actual",function(){},$ionicPopup);
		}
		else if($scope.rclave == "" || $scope.rclave == undefined)
		{
			funciones.popAlert(tituloPop,"Debe repetir su nueva clave",function(){},$ionicPopup);
		}
		else if($scope.rclave != "" && $scope.rclave != $scope.nclave)
		{
			funciones.popAlert(tituloPop,"Las contraseñas no coinciden, por favor verifique",function(){},$ionicPopup);
		}
		else
		{
			funciones.popConfirm("CONFIRMACIÓN","Estáa punto de cambiar su clave de acceso a la aplicación, desea continuar?",function(){
				var parametros = $("#formCambioClave").serialize()+"&accion=15&usuario="+session;
					funciones.consultaApi(funciones.urlAPi,parametros,function(json){
						//realizo la validació
						if(json.continuar == 1)
						{
							funciones.popAlert("ATENCIÓN",json.mensaje,function(){
								$("#clave").val("");
								$("#nclave").val("");
								$("#rclave").val("");
							},$ionicPopup);
						}
						else
						{
							funciones.popAlert("ATENCIÓN",json.mensaje,function(){
								$("#clave").val("");
								$("#nclave").val("");
								$("#rclave").val("");
							},$ionicPopup);
						}
					},true,$ionicLoading,$ionicPopup)

			},$ionicPopup);

		}
	}

	
	$scope.actualizaDataUsuario = function()
	{
		var tituloPop	=	"COMPLETE LA INFORMACIÓN";
		//declaro las variables del registro
		$scope.nombres 		=  $("#nombres").val();
		$scope.correo 		=  $("#email").val();
		$scope.celular 		=  $("#celular").val();
		$scope.ciudad 		=  $("#ciudad").val();
		
		//inicio con la validación de 
		if($scope.nombres == "" || $scope.nombres == undefined)
		{
			funciones.popAlert(tituloPop,"Debe escribir su nombre",function(){},$ionicPopup);
		}
		else if($scope.correo == undefined || $scope.correo == "")
		{
			funciones.popAlert(tituloPop,"Debe escribir un correo electrónico válido",function(){},$ionicPopup);
		}
		else if($scope.correo != "" && !funciones.validaMail($scope.correo))
		{
			funciones.popAlert(tituloPop,"El correo electrónico que ingreso no es válido, por favor verifique",function(){},$ionicPopup);
		}
		else if($scope.celular == undefined || $scope.celular == "")
		{
			funciones.popAlert(tituloPop,"Debe un número de celular de contacto",function(){},$ionicPopup);
		}
		else if($scope.celular != "" && isNaN($scope.celular))
		{
			funciones.popAlert(tituloPop,"El campo celular sólo puede contener números",function(){},$ionicPopup);
		}
		else if($scope.ciudad == undefined || $scope.ciudad == "")
		{
			funciones.popAlert(tituloPop,"Debe seleccionar la ciudad de residencia",function(){},$ionicPopup);
		}
		else
		{
			funciones.popConfirm("CONFIRMACIÓN","Está a punto de actualizar su información de contacto, tenga en cuenta que al cambiar datos como el correo electrónico alterará su inicio de sesión, desea continuar?",function(){

				var parametros = $("#formDataPersona").serialize()+"&accion=14&usuario="+session;
					funciones.consultaApi(funciones.urlAPi,parametros,function(json){
						//realizo la validació
						if(json.continuar == 1)
						{
							funciones.popAlert("ATENCIÓN",json.mensaje,function(){
							},$ionicPopup);
						}
						else
						{
							funciones.popAlert("ATENCIÓN",json.mensaje,function(){
								//$("#pregunta").val("");
								//$state.go();
							},$ionicPopup);
						}
					},true,$ionicLoading,$ionicPopup)

			},$ionicPopup);
		}
	}

})
   
.controller('cONTACTENOSCtrl', function ($scope,$http, $q, $stateParams,$state,$ionicLoading,$ionicHistory,funciones,$ionicPopup,$ionicLoading,$location) 
{

	$scope.mensaje = function()
	{
		var nombre 	=	$("#nombre").val()
		var email 	=	$("#email").val()
		var telefono 	=	$("#telefono").val()
		var mensaje 	=	$("#mensaje").val()

		//realizo validaciones
		if(nombre == "")
		{
			funciones.popAlert("Complete los campos","Debe escribir el nombre de la persona.",function(){},$ionicPopup);
		}
		else if(email == "")
		{
			funciones.popAlert("Complete los campos","Debe escribir un correo electrónico.",function(){},$ionicPopup);
		}
		else if(email != "" && !funciones.validaMail(email))
		{
			funciones.popAlert("Complete los campos","El correo electrónico no es correcto, por favor verifique.",function(){},$ionicPopup);
		}
		else if(telefono == "")
		{
			funciones.popAlert("Complete los campos","Debe escribir un teléfono de contacto.",function(){},$ionicPopup);
		}
		else if(mensaje == "")
		{
			funciones.popAlert("Complete los campos","Debe escribir un mensaje para enviar.",function(){},$ionicPopup);
		}
		else
		{
			funciones.popConfirm("CONFIRMACIÓN","Está a punto de enviar un mensaje de contacto, desea continuar?",function(){

				var parametros = $("#formContacto").serialize()+"&accion=10";
					funciones.consultaApi(funciones.urlAPi,parametros,function(json){
						//realizo la validació
						if(json.continuar == 1)
						{
							funciones.popAlert("ATENCIÓN",json.mensaje,function(){
								$("#nombre").val("");
								$("#email").val("");
								$("#telefono").val("");
								$("#mensaje").val("");
							},$ionicPopup);
						}
						else
						{
							funciones.popAlert("ATENCIÓN",json.mensaje,function(){
								//$("#pregunta").val("");
								//$state.go();
							},$ionicPopup);
						}
					},true,$ionicLoading,$ionicPopup)

			},$ionicPopup);
		}
	}

})
   
.controller('menuCtrl',function ($scope,$http, $q, $stateParams,$state,$ionicLoading,funciones,$ionicPopup,$ionicLoading,$location) 
{
	$scope.mostrarMenu = 0;
	$scope.dataUsuario = []
	
	var session = localStorage["id_usuario"];
	

	$scope.initMenu = function()
	{
		if(session == undefined)
		{
		 	$state.go('inicio');
		}
		else
		{
			//alert(session)
			//alert("hay sesion");
		}
		$scope.consultaInfoUsuario();
	}
	$scope.cerrarSession = function()
	{
		funciones.popConfirm("CERRAR SESIÓN","Está seguro que quiere salir de la aplicación, dejará de recibir notificaciones, desea confinuar",function(){
			localStorage.clear();
			$state.go('inicio');
		},$ionicPopup);
	}

	$scope.consultaInfoUsuario = function()
	{
		var parametros = "accion=4&idusuario="+session;
		funciones.consultaApi(funciones.urlAPi,parametros,function(json){
			//realizo la validació
			if(json.continuar == 1)
			{
				$scope.dataUsuario  = json.datos;
				$scope.$digest();
			}
		},true,$ionicLoading,$ionicPopup)
	}

})
.controller('favorCtrl', function ($scope,$http, $q, $stateParams,$state,$ionicLoading,funciones,$ionicPopup,$ionicLoading,$location) 
{

	$scope.initFavor = function()
	{
		alert("llega")
	}
	$scope.poneFormulario = function()
	{
		alert("jsdkjsadk");
	}

})
   

   
.controller('notificacionesCtrl', ['$scope', '$stateParams','$ionicLoading','funciones', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   

 