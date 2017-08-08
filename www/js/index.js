/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 /*setTimeout(function(){
    alert(angular.element(document.getElementById('page3')).scope())
},2000)*/

var pushNotification = null;
var rutaApi = "http://www.wannabe.com.co/GCM/GCM.php"; 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        $("#formLogin").submit(app.login);
    },
    acomodaTamano:function()
    {
        var total       = $(document).height();
        var altoCabeza = $("#cabeza").height(); 
        var altoPie    = $("#footer").height();
        //chat
        var tamanoChat = (parseInt(total) - parseInt(altoCabeza) - parseInt(altoPie) );
        //pongo el nuevo total
        //alert(total + " - " +tamanoChat);
        $("#chat").css("height",tamanoChat+"px");
        $("#chat").css("margin-top",altoCabeza+"px");
        $("#chat").css("padding-top",(altoCabeza - 10)+"px");
        $("#chat").css("margin-bottom",altoPie+"px" );
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function()
    {
        document.addEventListener('deviceready', app.deviceReady, false);
        document.addEventListener("throttledresize", function() { alert("throttledresize fired.");app.acomodaTamano();}, false);
        document.addEventListener("orientationchange", function() { alert("orientationchange fired.") }, false);
    },
    login:function(){
      alert("sdsdsd");  
    },
    deviceReady: function() 
    {
        //valida session
       /* if(localStorage["chat"] == undefined)
        {
            //debo redireccionarlo al login
            document.location = "index.html";
        }
        else
        {
            $("#envioMensaje").click(function(){
                app.sendMsg();
            });

            if($("#textMsg").val() == "")
            {
                $("#envioMensaje").addClass("disabled")
            }

            $("#textMsg").keyup(function(){
                if($("#textMsg").val() == "")
                {
                    $("#envioMensaje").addClass("disabled")
                }
                else
                {   
                    $("#envioMensaje").removeClass("disabled");
                }
            });
            $("#nombreU").html("<strong>"+localStorage["nombre"]+"</strong>");
            app.acomodaTamano();
        }*/
        /*if(localStorage["reg"] != undefined || localStorage["reg"] != "")
        {*/
            app.notificationProcess();
        /*}*/
        

       // navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    },
    sendMsg:function()
    {
        var mensaje = $("#textMsg").val();
        $("#textMsg").val("");
        var parametros = "usuario="+localStorage["chat"]+"&idReg="+localStorage["reg"]+"&mensaje="+mensaje+"&accion=3";
        app.consultaApi(rutaApi,parametros,function(json){
            if(json.continuar ==1)
            {
                $("#textMsg").val("");
            }
            else
            {
               $("#textMsg").val("");
            }
        });
    },
    consultaApi:function(ruta,parametros,callback)
    {
        $.ajax({
            url: ruta,
            data: parametros,
            type: "POST",
            dataType: "json",
            beforeSend:function()
            {
                
                
            },
            success:function(data)
            {
                callback(data);
            },
            error:function(e) 
            {

            }
        });
    },
    notificationProcess:function()
    {
        //alert(localStorage["reg"]);
       // $("#app-status-ul").append('<li>deviceready event received</li>');  
           /* document.addEventListener("backbutton", function(e)
            {
                alert("here 3");
                $("#app-status-ul").append('<li>backbutton event received</li>');
                if($("#home").length > 0 )
                {
                    e.preventDefault();
                    pushNotification.unregister(successHandler, errorHandler);
                    navigator.app.exitApp();
                }
                else
                {
                    navigator.app.backHistory();
                }
            }, false);*/
        
        pushNotification = window.plugins.pushNotification;
        //alert("here 2 "+pushNotification);
         //$("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
        if (device.platform == 'android' || device.platform == 'Android' )
        {
            pushNotification.register(
                app.successHandler,
                app.errorHandler, {
                    "senderID":"959494203963",
                    "ecb":"app.onNotificationGCM"
                });
            //420713918271
        }
        else
        {
            pushNotification.register(
                app.tokenHandler,
                app.errorHandler, {
                    "badge":"true",
                    "sound":"true",
                    "alert":"true",
                    "ecb":"app.onNotificationAPN"
                });
        }

    },
    onNotificationAPN:function(event) 
    {
            if (event.alert)
            {
                //navigator.notification.alert(event.alert);
                //detalleSolicitud({solicitud:1});
                //window.location = "index.html"

                html5.db.transaction(function(tx){
                   tx.executeSql("INSERT INTO notifi(idSolicitud) VALUES(?)",[1],html5.onSuccess,html5.onError);
                });
            }

            if ( event.sound )
            {
                var snd = new Media(event.sound);
                snd.play();
            }

            if ( event.badge )
            {
                pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
            }
    },
    onNotificationGCM:function(e) 
    {
        //$("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');

        switch( e.event )
        {
        case 'registered':
            if ( e.regid.length > 0 )
            {
                //alert(e.regid);
                //registro en session mi código
                /*if(localStorage["reg"] == undefined)
                {*/
                    localStorage["reg"] = e.regid;
                /*}*/
                /*var parametros = "usuario="+localStorage["chat"]+"&idReg="+e.regid+"&accion=2";
                app.consultaApi(rutaApi,parametros,function(json){
                    if(json.continuar ==1)
                    {
                        alert(json.mensaje);
                    }
                    else
                    {
                        alert(json.mensaje);
                    }
                });*/
                //console.log("regID = " + e.regid);
            }
        break;

        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if (e.foreground)
            {
                //alert("Cuando estoy en la app");
                hayNotificacion = 1;
                //alert(e.payload.message);
                 //proceso el mensaje para saber la solicitud
                var mensaje          = e.payload.message;
                var splitPoDosPuntos = e.payload.message.split(":");
                //ahora hago split por la coma que lleva el mensaje
                var splitPorComa     = splitPoDosPuntos[1].split(",");
                var solicitud        = splitPorComa[0].trim()

                html5.db.transaction(function(tx){
                   tx.executeSql("INSERT INTO notifi(idSolicitud,nueva,mensaje) VALUES(?,?,?)",[solicitud,1,mensaje],html5.onSuccess,html5.onError);
                });


                 html5.db.transaction(function(tx){
                        p = 0;
                        //alert("paso 1")
                       tx.executeSql("SELECT * FROM notifi WHERE id != ? ORDER BY id DESC",[p],function(ts,rs){
                            ultimoId   =  rs.rows.item(0).idSolicitud;
                            //alert(ultimoId);
                       }, html5.onError);
                    });

                //angular.element(document.getElementById('page3')).scope().myfunction('getSolicitudes');
                //angular.element(document.getElementById('missolicitudes')).scope().getSolicitudes();
                //$("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
                // if the notification contains a soundname, play it.
                //var my_media = new Media("res/"+e.soundname);
                //my_media.play();
            }
            else
            {  // otherwise we were launched because the user touched a notification in the notification tray.
                if(e.coldstart)
                {
                    //alert("coldstart");
                    //alert(e.payload.message)
                    //angular.element(document.getElementById('page3')).scope().myfunction('getSolicitudes');
                    hayNotificacion = 1;
                    
                    var splitPoDosPuntos = e.payload.message.split(":");
                    //ahora hago split por la coma que lleva el mensaje
                    var splitPorComa     = splitPoDosPuntos[1].split(",");
                    var solicitud        = splitPorComa[0].trim()

                    html5.db.transaction(function(tx){
                       tx.executeSql("INSERT INTO notifi(idSolicitud,nueva) VALUES(?,?)",[solicitud,1],html5.onSuccess,html5.onError);
                    });


                     html5.db.transaction(function(tx){
                        p = 0;
                        //alert("paso 2")
                       tx.executeSql("SELECT * FROM notifi WHERE id != ? ORDER BY id DESC",[p],function(ts,rs){
                            ultimoId   =  rs.rows.item(0).idSolicitud;
                            //alert(ultimoId);
                       }, html5.onError);
                    });
                }
                else//al darle click en la notificación desde la ventana del celular con la pantalla encendida
                {
                    //alert("otra");
                   // alert(e.payload.message)
                    //angular.element(document.getElementById('page3')).scope().myfunction('getSolicitudes');
                    hayNotificacion = 1;

                    var mensaje          = e.payload.message;
                    var splitPoDosPuntos = e.payload.message.split(":");
                    //ahora hago split por la coma que lleva el mensaje
                    var splitPorComa     = splitPoDosPuntos[1].split(",");
                    var solicitud        = splitPorComa[0].trim()

                    html5.db.transaction(function(tx){
                       tx.executeSql("INSERT INTO notifi(idSolicitud,nueva,mensaje) VALUES(?,?,?)",[solicitud,1,mensaje],html5.onSuccess,html5.onError);
                    });

                     html5.db.transaction(function(tx){
                        p = 0;
                        //alert("paso 3")
                       tx.executeSql("SELECT * FROM notifi WHERE id != ? ORDER BY id DESC",[p],function(ts,rs){
                            ultimoId   =  rs.rows.item(0).idSolicitud;
                            //alert(ultimoId);
                       }, html5.onError);
                    });
                }
            }
            //app.buildChat(e.payload);
            /*$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
            $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');*/


        break;

        case 'error':
            $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
        break;

        default:
            $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
        break;
      }
    },
    tokenHandler:function(result) 
    {
        // Your iOS push server needs to know the token before it can push to this device
        // here is where you might want to send it the token for later use.
        alert('device token = ' + result);
    },
    successHandler:function(result) 
    {
        //alert('result = ' + result);
    },
    errorHandler:function(error) 
    {
        //alert('error = ' + error);
    },
    scanCode:function()
    {
        cordova.plugins.barcodeScanner.scan(
              function (result) 
              {
                  alert("here")
                  $("#nombre").val(result.text);
                  navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
                  /*alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);*/
              }, 
              function (error) {
                  alert("Scanning failed: " + error);
              }
       );   
    },
    onSuccess:function(position) 
    {
        /*alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');*/
        $("#lat").val(position.coords.latitude);
        $("#lon").val(position.coords.longitude);
    },
    onError:function(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

};

app.initialize();