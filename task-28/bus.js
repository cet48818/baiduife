var Bus = (function() {
    // 不能接收json, 只能接收二进制数据
    var successRate = 0.9;

    // var init = function(params) {
    //     // 创建飞船命令
    //     var rate = Math.random();
    //     if (rate < successRate) {
    //         setTimeout(function() {
    //             var message = '飞船'  + 'init指令成功';
    //             // console.log(message);
    //             // logMessage.outputMes(message);
    //             // 传给飞船部门的init模块
    //             Plane.init(params);
    //         }, 300);
    //     } else {
    //         var message = '飞船' + 'init指令丢包';
    //         console.warn(message);
    //         // logMessage.outputMes(message, 'alertMes');
    //         init(params);
    //     }
    // };

    // var emit = function(params) {
    //     // 起飞/停止/自毁命令
    //     var rate = Math.random();
    //     if (rate < successRate) {
    //         setTimeout(function() {
    //             // 传给飞船的接收模块
    //             var message = '飞船' + '指令成功';
    //             console.log(message);
    //             // logMessage.outputMes(message);
    //             Plane.receiveCommand(params);
    //         }, 300);
    //     } else {
    //         var message = '飞船' + '指令丢包';
    //         console.warn(message);
    //         // logMessage.outputMes(message, 'alertMes');
    //         emit(params);
    //     }
    // };


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
    
    return {
        init: init,
        emit: emit,
        monitor: monitor
    }
}());