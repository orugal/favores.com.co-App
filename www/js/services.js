var html5   = {};
var dbsize  = 1024 * 1024; //1MB
html5.db = null;
html5.db = openDatabase("favores", "1.0", "favores.com.co", dbsize);

/*html5.db.transaction(function(tx){
	tx.executeSql("DROP TABLE notifi", []);
});*/

html5.db.transaction(function(tx){
    tx.executeSql("CREATE TABLE IF NOT EXISTS notifi(id INTEGER PRIMARY KEY, idSolicitud INTEGER, nueva INTEGER, mensaje TEXT)", []);
});

angular.module('app.services', [])

.factory('funciones', ['$interval', '$log','$state','$ionicPopup', function($interval, $log,$state,$ionicPopup) {
	var paquete = {
		urlAPi:"http://www.favores.com.co/api/index.php",
		urlWeb:"http://www.favores.com.co/",
		//urlAPi:"http://localhost/favores.com.co/api/index.php",
		//urlWeb:"http://localhost/favores.com.co/",
		testeo:function()
		{	
			//alert("vamos a ver");
			html5.db.transaction(function(tx){
			    p = 0;
			    //alert("paso 1")
			   tx.executeSql("SELECT * FROM notifi WHERE id != ? ORDER BY id DESC",[p],function(ts,rs){
			        if(rs.rows.item(0).nueva == 1)
			        {
			        	if(rs.rows.item(0).mensaje != null)
			        	{
			        		alert(rs.rows.item(0).mensaje)
			        		var ultimoId   =  rs.rows.item(0).id;
					        var solicitud   =  rs.rows.item(0).idSolicitud;
					        //alert(ultimoId+" En el controlador.");
					        html5.db.transaction(function(tx){
					           tx.executeSql("UPDATE notifi set nueva = ? WHERE id=?",[0,ultimoId],html5.onSuccess,html5.onError);
					        });
					        $state.go('detalleSolicitud', {solicitud: solicitud})
			        	}
			        	else
			        	{
			        		var ultimoId   =  rs.rows.item(0).id;
					        var solicitud   =  rs.rows.item(0).idSolicitud;
					        //alert(ultimoId+" En el controlador.");
					        html5.db.transaction(function(tx){
					           tx.executeSql("UPDATE notifi set nueva = ? WHERE id=?",[0,ultimoId],html5.onSuccess,html5.onError);
					        });
					        $state.go('detalleSolicitud', {solicitud: solicitud})
			        	}
			        }
			   }, html5.onError);
			});

			setTimeout(function(){
				paquete.testeo();
			},1000);
		},
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
		},
		log:function() {
		    alert(hayNotificacion);
		 }

	}


	/*var messageQueue = [];

  function log() {
    if (messageQueue.length) {
      $log.log('batchLog messages: ', messageQueue);
      messageQueue = [];
    }
  }

  // start periodic checking
  $interval(log, 50000);

  return function(message) {
    messageQueue.push(message);
  }*/


// start periodic checking
	$interval(paquete.testeo(), 1000);

	return paquete;

}])

.service('testeo', ['$interval', '$log', function($interval, $log) {

	var pquetote = 
	{
		testeo:function()
		{	
			//alert("sddasdsad");
			if(hayNotificacion != 0)
			{
				//alert("nueva notificacion");
				/*paquete.popAlert("Prueba","Mensaje",function(){

				},ionicPopup);*/
			}
		}
	}

	$interval(pquetote.testeo(), 2000);

}]);