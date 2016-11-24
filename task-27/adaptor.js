var Adaptor = (function() {
    var buildPlaneCommand = function(index, value) {
        // 一个2字节(16位)的二进制数, 前8位是飞船编码, 后8位是飞船型号和能量型号
        // var buf = new ArrayBuffer(3); // 生成一个3字节(共12位)的ArrayBuffer对象
        // var typedArray = new Uint8Array(buf); // 生成8位无符号整数的typedArray视图
        // typedArray[0] = parseInt(planeStr, 2); // 将二进制字符串转换为十进制数字, 赋值
        // typedArray[1] = parseInt(engineStr, 2);
        // typedArray[3] = parseInt(powerStr, 2);
        var planeStr = Number(index);
        var engineStr = Number(value.engine);
        var powerStr = Number(value.power);
        var typedArray = new Uint8Array([planeStr, engineStr, powerStr]);
        Bus.init(typedArray);
    };

    var receiveInitOrder = function(params) {
        // 飞船上转译init命令的模块
        var speedArr = [30, 50, 70];
        var powerArr = [5, 7, 9];
        var powerTypeArr = [2, 3, 4];
        var data = {
            index: params[0],
            speed: speedArr[params[1]],
            power: powerArr[params[1]],
            powerType: powerTypeArr[params[2]]
        }
        return data;
    };

    var handleCommand = function(index, command) {
        // 将指挥官的命令转换成二进制数组传给bus
        var num;
        switch (command) {
            case 'takeoff': num = 0;
                break;
            case 'stop': num = 1;
                break;
            case 'destroy': num = 2;
                break;
        }
        var typedArray = new Uint8Array([index, num]);
        Bus.emit(typedArray);
    };

    var receiveHandleCommand = function(command) {
        // 帮助飞行器解析收到的二进制命令
        var index = command[0];
        switch (command[1]) {
            case 0: Plane.takeoff(index);
                break;
            case 1: Plane.stop(index);
                break;
            case 2: Plane.destroy(index);
                break;
        }
    };
    
    // var toBinStr = function(num) {
    //     // 十进制数字转二进制字符串
    //     var str = Number(num).toString(2);
    //     // if (str.length < 4) { // 补位
    //     //     str = str.padStart(4, '0');
    //     // }
    //     return str;
    // };

    // var binStr = function(...numbers) {
    //     // 拼二进制字符串
    //     var str = '';
    //     numbers.forEach(function(item) {
    //         str += item;
    //     })
    //     return str;
    // };
    

    return {
        buildCommand: buildPlaneCommand,
        handleCommand: handleCommand,
        receiveInitOrder: receiveInitOrder,
        receiveHandleCommand: receiveHandleCommand
    }
}());