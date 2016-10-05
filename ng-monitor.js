angular.module('ngMonitor', []).provider('ngMonitor', function(){
  this.idle = 20; // senconds
  this.warning = 5; // senconds
  this.interval = 1; // senconds
  this.timeout = 5; //seconds
  this.events = ['mousemove','keydown','DOMMouseScroll','mousewheel','mousedown','touchstart'];

  this.$get = function($rootScope, $window, $interval, cookies){
    var _this = this;
    var _intervalPromise = null;
    var _time = Math.trunc(new Date().getTime() / 1000);
    $cookies.put('ngMonitorExpiryTime', parseInt(_time) + parseInt(_this.idle));
    return {
      check: function(){
        var expiryTime = cookies.get('ngMonitorExpiryTime');
        var currentTime = Math.trunc(new Date().getTime() / 1000);
        var warning = parseInt(expiryTime) - parseInt(_this.warning);
        var timeout = parseInt(expiryTime) + parseInt(_this.timeout);

        if(warning == currentTime){
          $rootScope.$broadcast('warning');
        }
        if(expiryTime == currentTime){
          $rootScope.$broadcast('idle');
        }
        if(timeout == currentTime){
          $rootScope.$broadcast('timeout');
        }
      },

      watchDom: function(){
        angular.element($window).on(_this.events.join(' '), this.resetMonitor);
      },

      resetMonitor: function(){
        _time = Math.trunc(new Date().getTime() / 1000);
        cookies.put('ngMonitorExpiryTime', parseInt(_time) + parseInt(_this.idle));
        $rootScope.$broadcast('domTouched');
      },

      stop: function(){
        console.log('stop');
        $interval.cancel(_intervalPromise);
      },

      start: function(){
        cookies.put('ngMonitorExpiryTime', (parseInt(_time) + parseInt(_this.idle)));
        this.watchDom();
        _intervalPromise = $interval(this.check, _this.interval * 1000);
      }

    };
  };
}).service('cookies', function(){
  this.put = function(name, value, expires){
    var d = new Date();
    expires = expires || 999999;
    d.setTime(d.getTime() + (expires*24*60*60*1000));
    expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
  };

  this.get = function(name){
    var name = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return null;
  };
});
