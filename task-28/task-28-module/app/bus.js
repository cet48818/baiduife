import * as Plane from './plane';
import * as Command from './command';

// 不能接收json, 只能接收二进制数据
var successRate = 0.9;

var init = function(params) {
    _busHandler(function() {
        Plane.init(params);
    });
};

var emit = function(params) {
    _busHandler(function() {
        Plane.receiveCommand(params);
    });
};

var monitor = function(params) {
    _busHandler(function() {
        Command.updateMonitor(params);
    });
}

var _busHandler = function(callback) {
    var rate = Math.random();
    if (rate < successRate) {
        setTimeout(function() {
            var message = '指令成功';
            console.log(message);
            callback();
        }, 300);
    } else {
        var message = '指令丢包';
        console.warn(message);
        _busHandler(callback);
    }
}

export  {
    init,
    emit,
    monitor
}