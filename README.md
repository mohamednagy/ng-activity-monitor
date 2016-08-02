# ng-activiy-monitor

A service for angular 1.x for monitoring users' Dom activities and detect the ***idle*** state, it fires a couple of events like `idle`, `warning`, `domTouched`, ..etc
# Installing
#### bower

``` 
bower install ng-activity-monitor
```

# Using
Include the ngMonitor module
```
var app = angular.module('demo', ['ngMonitor']);
```
set the configurations
```
app.config(function(ngMonitorProvider){
    // the user will be set as idle if he spent this period without any activities
    ngMonitorProvider.idle = 1800; 
    // warn the user when he when he approached the idle state
    ngMonitorProvider.warning = 60;
});
```
Catching events
```
// start monitor
ngMonitor.start();
$rootScope.$on('warning', function(){
    // handle the warning state
});
$rootScope.$on('idle', function(){
    // handle the idle state
});
```
ng-activity-monitor  comes with some DOM events
```
['mousemove','keydown','DOMMouseScroll','mousewheel','mousedown','touchstart']
```
You can set your custom events
```
ngMonitorProvider.events = ['click', 'mouseover'];
