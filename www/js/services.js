angular.module('app.services', [])

.factory('funciones', [function()
{
	var paquete = {
		urlAPi:"http://www.wannabe.com.co/favores.com.co/api/index.php",
		urlWeb:"http://www.wannabe.com.co/favores.com.co/",
		//urlAPi:"http://192.168.1.10/favores.com.co/api/index.php",
		//urlWeb:"http://192.168.1.10/favores.com.co/",
		validaSesion:function()
		{
			var salida  = false;
			var session = localStorage.getItem("id_usuario");
			if(session != undefined)
			{
				salida = true;
			}
			else
			{
				salida =false;
			}
			return salida;
		},
		consultaApi:function(url,parametros,callback,mostrar,ionicLoading,ionicPopup)
		{
		    //la variable callback es una funcion que esta creada, esto es para que el ajax responda a esta función y ud haga lo que quiera dentro de ella y no tener que hacer nada dentro del succes del ajax y que esta función quede como standar
		    $.ajax({									
		          url: url,
		          data: parametros,
		          type: "POST",
		          dataType: "json",
		          beforeSend:function(request)
		          {
		             if(mostrar)
		             {
		             	//alert("farez prieto")
		             	ionicLoading.show({
			              template: 'Un momento por favor...'
			              });
		             }
		          },
		          success:function(data)
		          {
		          	if(mostrar)
		            {
			          	ionicLoading.hide();
			          	callback(data);
			        }
			        else
			        {
			        	callback(data);
			        }
		          },
		          error:function(e) 
		          {
		              ionicLoading.hide();
		              paquete.popAlert("ERROR DE CONEXIÓN","No se ha podido realizar el proceso, probablemente sea su conexión a internet. Intente de nuevo más tarde",function(){
		              },ionicPopup);
		          }
		    });
		},
		popAlert:function(titulo,mensaje,callback,ionicPopup)
		{
			var alertPopup = ionicPopup.alert({
		      title: titulo,
		      template: "<center>"+mensaje+"</center>"
		    });

		   alertPopup.then(function(res) {
		     callback()
		   });
		},
		popConfirm:function(titulo,mensaje,callback,ionicPopup)
		{
			var confirmPopup = ionicPopup.confirm({
		     title: titulo,
		      template: "<center>"+mensaje+"</center>"
		   });

		   confirmPopup.then(function(res) {
		     if(res) {
		       callback()
		     } else {
		       return false
		     }
		   });
		},
        validaMail:function(mail)
		{
			var salida  = false;
			var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
		    // Se utiliza la funcion test() nativa de JavaScript
		    if (regex.test(mail.trim())) 
		    {
		        salida  = true;
		    }
		    else 
		    {
		        salida  = false;
		    }
		    return salida;
		}

	}

	return paquete;

}])

.service('BlankService', [function(){

}]);