angular.module('ngMonitor', []).provider('ngMonitor', function(){
  this.idle = 20; // senconds
  this.timeout = 5; // senconds
  this.interval = 1; // senconds
  this.events = ['mousemove','keydown','DOMMouseScroll','mousewheel','mousedown','touchstart'];

  this.$get = function($rootScope, $window, $interval, $cookies){
    var _this = this;
    var _intervalPromise = null;
    var _time = Math.trunc(new Date().getTime() / 1000);
    $cookies.put('ngMonitorExpiryTime', _time);
    return {
      check: function(){
        var expiryTime = $cookies.get('ngMonitorExpiryTime');
        var currentTime = Math.trunc(new Date().getTime() / 1000);
        var timeout = expiryTime - (_this.timeout);
        if(timeout == currentTime){
          $rootScope.$broadcast('timeout');
        }
        if(expiryTime == currentTime){
          $rootScope.$broadcast('idle');
        }
      },

      watchDom: function(){
        angular.element($window).on(_this.events.join(' '), this.resetMonitor);
      },

      resetMonitor: function(){
        _time = Math.trunc(new Date().getTime() / 1000);
        $cookies.put('ngMonitorExpiryTime', _time + _this.idle);
        $rootScope.$broadcast('domTouched');
        console.log('reset timer');
      },

      stop: function(){
        $interval.cancel(_intervalPromise);
      },

      start: function(){
        this.watchDom();
        _intervalPromise = $interval(this.check, _this.interval * 1000);
      }

    };
  };
});
