# ng-activiy-monitor

A service for angular 1.x for monitoring users' Dom activities and detect the ***idle*** state, it fires a couple of events like `idle`, `warning`, `domTouched`, ..etc
# Installing
#### bower

``` 
bower install ng-activity-monitor
```
## Configrations
`ngMonitorProvider.idle = 20`:  a specifc time in seconds the use must exceed to consider him idle
`ngMonitorProvider.warning = 10`:  a specfic time to warn the user when he approached the idle state
`ngMonitorProvider.timeout = 10`:  a specific period after the user being idle

ng-activity-monitor  comes with some DOM events
```
['mousemove','keydown','DOMMouseScroll','mousewheel','mousedown','touchstart']
```
You can set your custom events
```
ngMonitorProvider.events = ['click', 'mouseover'];
```

## Events
`idle`: fired when the user spent the idle time without any activities

`warning`: fired when the user approched the idle state

`timeout`: fired when the user exceeds the idle state by a configured time

# Using
####Include the ngMonitor module
```
var app = angular.module('demo', ['ngMonitor']);
```
set the configurations
```
app.config(function(ngMonitorProvider){
    ngMonitorProvider.idle = 1800; 
    ngMonitorProvider.warning = 60;
    ngMonitorProvider.timeout = 10;
});
```
####starting monitor
```
app.run(function(ngMonitor)){
    // start monitor
    ngMonitor.start();
});
```
####Catching events
```
$rootScope.$on('warning', function(){
    // handle the warning state
});

$rootScope.$on('idle', function(){
    // handle the idle state
});
```

