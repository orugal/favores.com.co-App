// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services','ionic-timepicker'])

.config(function($ionicConfigProvider,ionicTimePickerProvider){
  var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 24,
      step: 5,
      setLabel: 'DEFINIR',
      closeLabel: 'CERRAR'
    };
    ionicTimePickerProvider.configTimePicker(timePickerObj);
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


    //proceso notificaciones
    function init() 
    {
        // alert("asdasdasd");
        var pushNotification = window.plugins.pushNotification;

        if (device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
            pushNotification.register(function(result) {                    
                // console.log('Status: ' + result);
            }, function(result) {
                // alert('Error handler ' + result);
            }, {
                "senderID": "428579349203", /* Google developers project number */
                "ecb" : "onNotificationGCM", /* Function name to handle notifications */
                launchApplicationOnPush: true
            });
        } else {
            // alert('Your device platform is not Android!!!');
        }    
    }

    var tokengooglecloud;
        function onNotificationGCM(e) {
            switch (e.event) {
                case 'registered':
                    if (e.regid.length > 0) {
                        var registrationId = e.regid; //GCM Registration ID
                        tokengooglecloud = registrationId;
                        alert(tokengooglecloud);
                    }
                    break;

                case 'message':
                    if (e.foreground) {                                                    
                        //mensajesPush(e);
                    } else if (e.coldstart) {
                        // alert('COLDSTART MSG:' + JSON.stringify(e));
                    } else {
                        // alert('BACKGROUND:' + JSON.stringify(e));
                    }
                    break;

                case 'error':
                    alert("error");
                    break;

                default:
                    // handle default
                    break;
            }
        }     
        document.addEventListener('deviceready', init, true);



  });
})